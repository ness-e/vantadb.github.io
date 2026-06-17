import * as THREE from "three/webgpu";
import EventEmitter from "./Utils/EventEmitter.js";

import Debug from "./Utils/Debug.js";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Renderer from "./Renderer.js";
import Worlds from "./Worlds.js";
import Resources from "./Utils/Resources.js";

import sources from "./Sources.js";
import State from "./State.js";
import PostProcess from "./Utils/PostProcess.js";

import { isMobile } from "@experience/Utils/Helpers/Global/isMobile";

export default class Experience extends EventEmitter {
  static _instance = null;

  appLoaded = false;
  firstRender = false;

  static getInstance() {
    return Experience._instance || new Experience();
  }

  constructor(_canvas) {
    super();
    // Singleton
    if (Experience._instance) {
      return Experience._instance;
    }
    Experience._instance = this;

    // Global access
    window.experience = this;

    // Html Elements
    this.html = {};
    this.html.preloader = document.getElementById("preloader");
    this.html.playButton = document.getElementById("play-button");

    this.isMobile = isMobile.any();

    // Options
    this.canvas = _canvas;
    //THREE.ColorManagement.enabled = false

    if (!this.canvas) {
      console.warn("Missing 'Canvas' property");
      return;
    }

    this.init();
  }

  init() {
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.renderer = new Renderer();
    this.state = new State();

    this.resources = new Resources(sources);

    this.mainCamera = undefined;
    this.mainScene = undefined;

    if (this.state.postprocessing) {
      this.postProcess = new PostProcess(this.renderer.instance);
    }

    // Wait for resources
    this.resources.on("ready", () => {
      setTimeout(() => {
        window.preloader.hidePreloader();
        // window.preloader.showPlayButton(() => {
        //     // start media playing
        // })
      }, 1000);

      this.time.reset();

      this.worlds = new Worlds();

      //this.sound.createSounds();

      this.postInit();
      this.setListeners();
      this.animationPipeline();

      this.trigger("classesReady");
      window.dispatchEvent(new CustomEvent("3d-app:classes-ready"));

      this.appLoaded = true;
    });

    // FPS-based quality auto-adjust
    this._frameCount = 0;
    this._lastFpsCheck = performance.now();
    this._qualityReduced = false;
  }

  animationPipeline() {
    this.worlds?.animationPipeline();
  }

  postInit() {
    this.renderer.postInit();
    this.postProcess?.postInit();
    this.worlds?.postInit();
    this.debug?.postInit();
  }

  resize() {
    this.worlds.resize();
    this.renderer.resize();
    this.postProcess?.resize();
    this.debug?.resize();
    this.state?.resize();
  }

  async render() {
    if (this.state.postprocessing) {
      return this.postProcess.update(this.time.delta);
    } else {
      return this.renderer.update(this.time.delta);
    }
    //console.log( 'UP' )
  }

  async update() {
    this.worlds.update(this.time.delta);

    this.render();

    if (this.debug.active) {
      this.debug.update(this.time.delta);
    }

    await this.postUpdate(this.time.delta);

    this.debug?.stats?.update();

    this._frameCount++;
    const now = performance.now();
    const elapsed = now - this._lastFpsCheck;
    if (elapsed >= 1000 && !this._qualityReduced) {
      const fps = this._frameCount / (elapsed / 1000);
      this._frameCount = 0;
      this._lastFpsCheck = now;
      if (fps < 30) this._reduceQuality();
    }
  }

  _reduceQuality() {
    this._qualityReduced = true;
    const bh = this.worlds?.mainWorld?.blackHole;
    if (!bh) return;
    bh.uniforms.iterations.value = this.isMobile ? 32 : 96;
    bh.uniforms.stepSize.value = this.isMobile ? 0.024 : 0.01;
  }

  _fireReady() {
    this.trigger("ready");
    window.dispatchEvent(new CustomEvent("3d-app:ready"));

    // Animate camera to hero position after full load
    const cam = this.worlds?.mainWorld?.camera;
    if (cam) {
      cam.animateCameraPosition(
        { x: -3.0881, y: 0.1231, z: 1.4445 },
        { x: -1.0, y: 0.0, z: 0.0 },
      );
    }

    this.firstRender = "done";
  }

  async postUpdate(deltaTime) {
    if (this.firstRender === true) {
      window.dispatchEvent(new CustomEvent("app:first-render"));

      // Dispatch event
      this._fireReady();
    }

    // Once Await First Stable Render
    if (this.resources.loadedAll && this.appLoaded && this.firstRender === false) {
      await this.render();
      this.firstRender = true;
    }

    this.worlds.postUpdate(deltaTime);
  }

  setListeners() {
    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    this.renderer.instance.setAnimationLoop(async () => this.update());
  }

  destroy() {
    this.sizes?.off("resize");
    this.time?.off("tick");

    const targetScene = this.scene || this.mainScene;
    if (targetScene) {
      targetScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();

          for (const key in child.material) {
            const value = child.material[key];

            if (value && typeof value.dispose === "function") {
              value.dispose();
            }
          }
        }
      });
    }

    if (this.renderer) {
      if (this.camera?.controls) this.camera.controls.dispose();
      if (this.renderer.instance) this.renderer.instance.dispose();
    }

    if (this.debug?.active && this.debug.ui) this.debug.ui.destroy();

    window.experience = null;
    Experience._instance = null;
  }
}
