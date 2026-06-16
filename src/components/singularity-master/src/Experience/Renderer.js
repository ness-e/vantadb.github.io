import * as THREE from "three/webgpu";
import Experience from "./Experience.js";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;

    this.setInstance();
  }

  postInit() {
    this.camera = this.experience.mainCamera.instance;
    this.scene = this.experience.mainScene;
  }

  setInstance() {
    this.instance = new THREE.WebGPURenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      stencil: false,
      depth: true,
      useLegacyLights: false,
      physicallyCorrectLights: true,
      forceWebGL: false,
    });

    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio * this.sizes.renderScale, 2));
    this.instance.setClearColor("#010101", 1);
    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 1.2;
  }

  update() {
    this.instance.renderAsync(this.scene, this.camera);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio * this.sizes.renderScale, 2));
  }
}
