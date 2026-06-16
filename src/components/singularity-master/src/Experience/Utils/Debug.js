import * as THREE from "three/webgpu";
import * as Helpers from "@experience/Utils/Helpers.js";
import Stats from "stats.js";
import { Pane } from "tweakpane";
import Experience from "@experience/Experience.js";

import {
  output,
  mrt,
  vec4,
  uv,
  convertToTexture,
  screenUV,
  Fn,
  cameraWorldMatrix,
  getScreenPosition,
  cameraProjectionMatrix,
  vec3,
  screenCoordinate,
  cameraPosition,
  viewportCoordinate,
  viewportUV,
  vec2,
  assign,
  float,
} from "three/tsl";

export default class Debug {
  experience = Experience.getInstance();
  sizes = this.experience.sizes;

  constructor() {
    this.active = false;

    if (this.active) {
      // Create debug panel container — centered, floating over the canvas
      this._panelContainer = document.createElement("div");
      this._panelContainer.id = "debug-panel";
      this._applyPanelStyles(this._panelContainer);
      document.body.appendChild(this._panelContainer);

      this.panel = new Pane({
        title: "⚙️ Scene Controls",
        container: this._panelContainer,
        expanded: true,
      });

      // Stats.js — FPS counter, top-right corner
      this.stats = new Stats();
      this.stats.showPanel(0);
      Object.assign(this.stats.dom.style, {
        position: "fixed",
        top: "0px",
        right: "0px",
        left: "auto",
        zIndex: "100001",
        opacity: "0.85",
      });
      document.body.appendChild(this.stats.dom);

      // ── Toggle button — show/hide all debug panels ─────────────
      this._createToggleButton();
    }
  }

  _createToggleButton() {
    const existing = document.getElementById("debug-toggle-btn");
    if (existing) existing.remove();

    const btn = document.createElement("button");
    btn.id = "debug-toggle-btn";
    btn.title = "Toggle debug panels (T)";
    btn.innerHTML = "⚙";
    document.body.appendChild(btn);

    this._panelsVisible = true;

    const toggle = () => {
      this._panelsVisible = !this._panelsVisible;
      const panels = [
        document.getElementById("debug-panel"),
        document.getElementById("custom-hero-panel"),
      ];
      panels.forEach((p) => {
        if (!p) return;
        p.style.transition = "opacity 200ms ease, transform 200ms ease";
        p.style.opacity = this._panelsVisible ? "1" : "0";
        p.style.pointerEvents = this._panelsVisible ? "auto" : "none";
        p.style.transform = this._panelsVisible
          ? p.style.transform.replace(" scale(0.95)", "")
          : (p.style.transform || "") + " scale(0.95)";
      });
      btn.classList.toggle("panels-hidden", !this._panelsVisible);
    };

    btn.addEventListener("click", toggle);

    // Keyboard shortcut: T key
    document.addEventListener("keydown", (e) => {
      if (e.key === "t" || e.key === "T") {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
        toggle();
      }
    });
  }

  _applyPanelStyles(el) {
    Object.assign(el.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: "100000",
      width: "320px",
      maxHeight: "80vh",
      overflowY: "auto",
      borderRadius: "12px",
      boxShadow: "0 24px 64px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06)",
      background: "rgba(10, 10, 18, 0.92)",
      backdropFilter: "blur(20px)",
      scrollbarWidth: "thin",
    });
  }

  postInit() {
    this.scene = experience.scene;
    //this.camera = this.experience.camera.instance
  }

  createDebugNode(node, world) {
    this.debugNode = node;
    this.world = world;
    this.scene = world.scene;
    this.camera = world.camera.instance;

    const material = new THREE.SpriteNodeMaterial({
      // depthWrite: false,
      depthTest: false,
      // //blending: THREE.NoBlending
      toneMapped: false,
    });

    if (node.isNode) {
      material.colorNode = Fn(() => {
        // const _uv = uv().flipY().toVar()
        // _uv.y.mulAssign( this.sizes.aspectRatio )
        //
        // return convertToTexture( node ).sample( _uv  )
        //return convertToTexture( node )
        //
        return node;
      })();
    }

    // material.mrtNode = mrt({
    //     output
    // });

    //material.colorNode = vec4(1, 1, 1, 1);
    // material.fragmentNode = Fn(() =>
    // {
    //     return texture( this.resources.items.displacementTexture, uv() )
    // })()

    const sprite = (this.sprite = new THREE.Sprite(material));
    sprite.center.set(0.0, 0.0);
    sprite.renderOrder = 10000;

    this.scene.add(sprite);

    this._updateSprite();
  }

  _updateSprite() {
    if (!this.debugNode) return;

    const position = Helpers.projectNDCTo3D(-1, -1, this.camera, 10);
    this.sprite.position.copy(position);
  }

  resize() {
    this._updateSprite();
  }

  update(deltaTime) {
    if (this.debugNode) {
      this._updateSprite();
    }
  }
}
