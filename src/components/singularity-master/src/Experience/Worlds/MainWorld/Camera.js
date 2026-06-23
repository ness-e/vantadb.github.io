import * as THREE from "three/webgpu";
import Experience from "@experience/Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor(parameters = {}) {
    this.experience = new Experience();
    this.renderer = this.experience.renderer.instance;
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.canvas = this.experience.canvas;
    this.scene = parameters.world.scene;
    this.cursorEnabled = false;

    this.lerpVector = new THREE.Vector3();

    this.setInstance();
    this.setControls();

    this._animateTargetPos = null;
    this._animateTargetTarget = null;
    this._animating = false;
    this._animProgress = 0;
  }

  setInstance() {
    //const FOV = this.experience.isMobile ? 35 : 25
    this.instance = new THREE.PerspectiveCamera(
      50,
      this.sizes.width / this.sizes.height,
      0.1,
      2000,
    );
    this.defaultCameraPosition = new THREE.Vector3(0.234467, 0.109675, 0.744738);

    this.instance.position.copy(this.defaultCameraPosition);
    this.instance.lookAt(new THREE.Vector3(0, 0, 0));

    this.lerpVector.copy(this.instance.position);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.minDistance = 0;
    this.controls.maxDistance = 1000;
    this.controls.enabled = true;

    // Hero setup: push black hole to the right by targeting a point to the left
    this.controls.target = new THREE.Vector3(-1.0, 0, 0);

    // Hero setup: allow interaction (scroll solo para página, no para zoom)
    this.controls.enableZoom = false;
    this.controls.enablePan = true;

    // Transform controls removed for production
  }

  _setListeners() {
    // Removed transform controls listeners
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  animateCameraPosition(pos, target) {
    this._animateTargetPos = new THREE.Vector3(pos.x, pos.y, pos.z);
    this._animateTargetTarget = new THREE.Vector3(target.x, target.y, target.z);
    this._animState = "wait";
    this._animTimer = 0;
    this._animProgress = 0;
  }

  update() {
    if (this._animState === "wait") {
      this._animTimer += this.time.delta;
      if (this._animTimer >= 2) {
        this._animState = "move";
        this._animProgress = 0;
      }
    } else if (this._animState === "move") {
      this._animProgress += this.time.delta * 0.25;
      if (this._animProgress >= 1) {
        this._animProgress = 1;
        this._animState = "done";
        this.instance.position.copy(this._animateTargetPos);
        this.controls.target.copy(this._animateTargetTarget);
      }
      const t = 1 - Math.pow(1 - this._animProgress, 3);
      this.instance.position.lerpVectors(this.defaultCameraPosition, this._animateTargetPos, t);
      this.controls.target.lerpVectors(new THREE.Vector3(-1, 0, 0), this._animateTargetTarget, t);
    }

    this.controls?.update();

    this.instance.updateMatrixWorld();
  }
}
