import * as THREE from "three/webgpu";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import EventEmitter from "./EventEmitter.js";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;
    this.loadedAll = false;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.EXRLoader = new EXRLoader();
  }

  startLoading() {
    for (const source of this.sources) {
      switch (source.type) {
        case "texture":
          this.loaders.textureLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;

        case "exrTexture":
          this.loaders.EXRLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;
      }
    }

    if (this.sources.length === 0) {
      setTimeout(() => {
        this.loadedAll = true;
        this.trigger("ready");
      });
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.loadedAll = true;
      this.trigger("ready");
    }
  }
}
