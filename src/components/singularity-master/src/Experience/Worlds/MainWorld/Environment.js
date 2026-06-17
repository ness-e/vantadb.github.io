import * as THREE from "three/webgpu";
import Experience from "@experience/Experience.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { normalWorld, uniform, texture, uv, equirectUV, Fn, vec4, float, time, fract, min, max, step, smoothstep, mix, abs, length, positionWorldDirection } from "three/tsl";

export default class Environment {
  constructor(parameters = {}) {
    this.experience = new Experience();
    this.state = this.experience.state;
    this.world = parameters.world;
    this.scene = this.world.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.renderer = this.experience.renderer.instance;
    this.uniforms = this.state.uniforms.mainScene.environment;

    this.scene.colorSpace = THREE.SRGBColorSpace;

    // this.setAmbientLight()
    // this.setDirectionalLight()
    this.setEnvironmentMap();
    //this.setBackground()

    this._setDebug();
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight("#ffffff", 0.3);
    this.scene.add(this.ambientLight);
  }

  setDirectionalLight() {
    const SHADOW_MAP_WIDTH = 1024;
    const SHADOW_MAP_HEIGHT = 1024;

    const directionalLight = (this.directionalLight = new THREE.DirectionalLight("#ffffff", 2));

    // // add shadows
    // directionalLight.castShadow = true;
    // directionalLight.shadow.radius = 2
    // // directionalLight.shadow.camera.top = 2000;
    // directionalLight.shadow.camera.bottom = -3;
    // directionalLight.shadow.camera.left = -3;
    // // directionalLight.shadow.camera.right = 2000;
    // directionalLight.shadow.camera.near = 3;
    // directionalLight.shadow.camera.far = 10;
    // directionalLight.shadow.bias = -0.001;
    //
    // directionalLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    // directionalLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
    //
    // directionalLight.shadow.camera.updateProjectionMatrix();

    directionalLight.position.set(0, 5, 5);
    this.scene.add(directionalLight);

    // const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
    // this.scene.add(directionalLightCameraHelper)
  }

  setEnvironmentMap() {
    // const environment = new RoomEnvironment( this.renderer );
    // const pmremGenerator = new THREE.PMREMGenerator( this.renderer );
    //
    // pmremGenerator.fromSceneAsync( environment ).then( ( envMap ) => {
    //
    //     const env = envMap.texture;
    //
    //     this.scene.background = env;
    //     this.scene.environment = env;
    //     this.scene.backgroundBlurriness = 0.5;
    //
    //     // Free memory
    //     pmremGenerator.dispose();
    // } ).catch( ( error ) => {
    //     console.error( "Error Generating environment:", error );
    // } );

    // //environment.dispose();

    // //set background transparent
    this.resources.items.starsTexture.mapping = THREE.EquirectangularReflectionMapping;
    this.resources.items.starsTexture.colorSpace = THREE.SRGBColorSpace;
    this.resources.items.starsTexture.needsUpdate = true;

    // Función compartida: fondo (estrellas + grilla) parametrizado por UV
    const bgFn = Fn(([uv]) => {
      const stars = texture(this.resources.items.starsTexture, uv).mul(
        this.state.uniforms.mainScene.environment.backgroundIntensity,
      );

      const gridUV = uv.mul(12);
      const animX = time.mul(0.003);
      const animY = time.mul(0.002);
      const gx = fract(gridUV.x.add(animX));
      const gy = fract(gridUV.y.add(animY));
      const gxD = min(gx, float(1).sub(gx));
      const gyD = min(gy, float(1).sub(gy));

      const lineWidth = float(0.008);
      const primaryX = float(1).sub(smoothstep(float(0), lineWidth, gxD));
      const primaryY = float(1).sub(smoothstep(float(0), lineWidth, gyD));
      const primary = max(primaryX, primaryY).mul(0.35);

      const gxH = fract(gridUV.x.add(animX).add(0.5));
      const gyH = fract(gridUV.y.add(animY).add(0.5));
      const gxHD = min(gxH, float(1).sub(gxH));
      const gyHD = min(gyH, float(1).sub(gyH));
      const secondaryX = float(1).sub(smoothstep(float(0), float(0.005), gxHD));
      const secondaryY = float(1).sub(smoothstep(float(0), float(0.005), gyHD));
      const secondary = max(secondaryX, secondaryY).mul(0.25);

      const gridAlpha = max(primary, secondary);
      const gridColor = vec4(0.4, 0.7, 1.0, 1.0);

      return mix(stars, gridColor, gridAlpha);
    });

    // Background de escena con dirección de vista
    this.scene.backgroundNode = bgFn(equirectUV());

    // Exponer función para que BlackHole la use con dirección curveada
    this.scene.userData.bgFn = bgFn;
  }

  setBackground() {
    //this.scene.background = this.resources.items.gradientTexture
    //this.scene.fog = new THREE.Fog( this.uniforms.fogColor.value, this.uniforms.fogNear.value, this.uniforms.fogFar.value );

    const colorNode = normalWorld.y.mix(this.uniforms.topColor, this.uniforms.bottomColor);
    this.scene.backgroundNode = colorNode;
    this.scene.environmentNode = colorNode;
  }

  _setDebug() {
    if (this.debug.active) {
      const mainSceneFolder = this.world.debugFolder.addFolder({
        title: "Environment",
        expanded: false,
      });

      mainSceneFolder.addBinding(this.uniforms.topColor, "value", {
        label: "Top Color",
        color: { type: "float" },
      });

      mainSceneFolder.addBinding(this.uniforms.bottomColor, "value", {
        label: "Bottom Color",
        color: { type: "float" },
      });

      // mainSceneFolder.addBinding( this.uniforms.fogColor, 'value', {
      //     label: 'Fog Color',
      //     color: { type: 'float' },
      // } ).on( 'change', () => {
      //     this.scene.fog.color = this.uniforms.fogColor.value
      // } )
      //
      // mainSceneFolder.addBinding( this.uniforms.fogNear, 'value', {
      //     label: 'Fog Near',
      //     min: 0,
      //     max: 100,
      //     step: 0.01
      // } ).on( 'change', () => {
      //     this.scene.fog.near = this.uniforms.fogNear.value
      // } )
      //
      // mainSceneFolder.addBinding( this.uniforms.fogFar, 'value', {
      //     label: 'Fog Far',
      //     min: 0,
      //     max: 100,
      //     step: 0.01
      // } ).on( 'change', () => {
      //     this.scene.fog.far = this.uniforms.fogFar.value
      // } )
    }
  }
}
