import * as THREE from 'three/webgpu'
import Experience from '@experience/Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import gsap from "gsap";

export default class Camera
{
    constructor( parameters = {} )
    {
        this.experience = new Experience()
        this.renderer = this.experience.renderer.instance
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.canvas = this.experience.canvas
        this.timeline = this.experience.timeline
        this.scene = parameters.world.scene
        this.cursorEnabled = false

        this.lerpVector = new THREE.Vector3();

        this.setInstance()
        this.setControls()
    }

    setInstance()
    {
        //const FOV = this.experience.isMobile ? 35 : 25
        this.instance = new THREE.PerspectiveCamera(50, this.sizes.width / this.sizes.height, 0.1, 2000)
        this.defaultCameraPosition = new THREE.Vector3(1, 0.5, 3);

        this.instance.position.copy(this.defaultCameraPosition)
        this.instance.lookAt(new THREE.Vector3(-1, 0, 0));

        this.lerpVector.copy(this.instance.position);
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.minDistance = 0;
        this.controls.maxDistance = 1000;
        this.controls.enabled = true;
        
        // Hero setup: push black hole to the right by targeting a point to the left
        this.controls.target = new THREE.Vector3(-1.0, 0, 0);
        
        // Hero setup: allow interaction
        this.controls.enableZoom = true;
        this.controls.enablePan = true;

        // Transform controls removed for production
    }

    _setListeners() {
        // Removed transform controls listeners
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls?.update()

        this.instance.updateMatrixWorld() // To be used in projection
    }

    animateCameraPosition() {

    }
}
