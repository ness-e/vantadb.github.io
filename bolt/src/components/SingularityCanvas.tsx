/**
 * SingularityCanvas — VantaDB hero background
 *
 * Faithfully ported from MisterPrada/singularity (MIT)
 * https://github.com/MisterPrada/singularity
 *
 * Adapted for Three.js r184+ API:
 *   - RenderPipeline (replaces deprecated PostProcessing)
 *   - renderPipeline.render() (replaces deprecated renderAsync)
 *   - Selective bloom via MRT emissive pass
 *   - scene.backgroundNode equirectangular star panorama
 *   - BlackHole.js 128-step TSL ray-marcher
 *   - Textures loaded from original repo (procedural fallback)
 */
import { useEffect, useRef } from 'react';

// @ts-ignore
import * as THREE from 'three/webgpu';

import {
  vec3, vec4, float,
  uniform, Fn, Loop,
  mix, step, abs, max, normalize, sub,
  positionGeometry, positionWorld, faceDirection,
  cameraPosition, modelWorldMatrix,
  equirectUV, time,
  // @ts-ignore
  texture as textureTSL,
  // @ts-ignore
  remapClamp,
  color as colorTSL,
  // @ts-ignore
  pass, mrt, output, emissive,
} from 'three/tsl';

// @ts-ignore
import { bloom } from 'three/addons/tsl/display/BloomNode.js';

import {
  rotateAxis, whiteNoise2D, lengthSqrt,
  smoothRange, linearToSrgb, srgbToLinear, vecToFac, ColorRamp3_BSpline,
} from '../singularity/tsl-utils';

// ─────────────────────────────────────────────────────────────────────────────
// Texture helpers
// ─────────────────────────────────────────────────────────────────────────────

function loadTextureWithFallback(
  loader: THREE.TextureLoader,
  url: string,
  fallback: () => THREE.DataTexture,
): Promise<THREE.Texture | THREE.DataTexture> {
  return new Promise((resolve) => {
    loader.load(url, resolve, undefined, () => resolve(fallback()));
  });
}

function hash2D(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}
function valueNoise(x: number, y: number) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  return (
    hash2D(ix, iy)     * (1 - ux) * (1 - uy) +
    hash2D(ix + 1, iy) * ux * (1 - uy) +
    hash2D(ix, iy + 1) * (1 - ux) * uy +
    hash2D(ix + 1, iy + 1) * ux * uy
  );
}
function fbm(x: number, y: number, octs: number) {
  let v = 0, a = 0.5, f = 1;
  for (let i = 0; i < octs; i++) { v += a * valueNoise(x * f, y * f); a *= 0.5; f *= 2; }
  return v;
}

function makeFallbackNoiseTexture(): THREE.DataTexture {
  const S = 512;
  const px = new Uint8Array(S * S * 4);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const i = (y * S + x) * 4;
    px[i]     = Math.floor(fbm(x / 128, y / 128, 6) * 255);
    px[i + 1] = Math.floor(fbm(x / 64 + 43.7, y / 64 + 17.3, 5) * 255);
    px[i + 2] = Math.floor(fbm(x / 32 + 87.1, y / 32 + 31.9, 4) * 255);
    px[i + 3] = 255;
  }
  const t = new THREE.DataTexture(px, S, S, THREE.RGBAFormat);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.needsUpdate = true;
  return t;
}

function makeFallbackStarsTexture(): THREE.DataTexture {
  const W = 2048, H = 1024;
  const px = new Uint8Array(W * H * 4);
  const rng = (s: number) => { const n = Math.sin(s) * 43758.5453; return n - Math.floor(n); };
  for (let s = 0; s < 7000; s++) {
    const sx = Math.floor(rng(s * 1.1) * W), sy = Math.floor(rng(s * 1.3 + .5) * H);
    const br = Math.floor(rng(s * 1.7 + .2) * 190 + 65);
    const i  = (sy * W + sx) * 4;
    if (i >= 0 && i < px.length - 4) {
      px[i]   = Math.min(255, br + Math.floor(rng(s * 2.1) * 20));
      px[i+1] = Math.min(255, br + Math.floor(rng(s * 2.3) * 15));
      px[i+2] = Math.min(255, br + Math.floor(rng(s * 2.7) * 45));
      px[i+3] = 255;
    }
  }
  for (let b = 0; b < 50; b++) {
    const cx = Math.floor(rng(b * 7.3) * W), cy = Math.floor(rng(b * 7.9) * H);
    const rad = Math.floor(rng(b * 8.1) * 90 + 20);
    for (let dy = -rad; dy <= rad; dy++) for (let dx = -rad; dx <= rad; dx++) {
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > rad) continue;
      const xi = (cx + dx + W) % W, yi = Math.max(0, Math.min(H - 1, cy + dy));
      const i = (yi * W + xi) * 4, a = (1 - d / rad) * 0.06;
      px[i]   = Math.min(255, px[i]   + a * 60);
      px[i+1] = Math.min(255, px[i+1] + a * 80);
      px[i+2] = Math.min(255, px[i+2] + a * 200);
      px[i+3] = 255;
    }
  }
  const t = new THREE.DataTexture(px, W, H, THREE.RGBAFormat);
  t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

// ─────────────────────────────────────────────────────────────────────────────
// React component
// ─────────────────────────────────────────────────────────────────────────────

export default function SingularityCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let renderer: any    = null;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const init = async () => {

      // ── Renderer ───────────────────────────────────────────────────────
      renderer = new THREE.WebGPURenderer({
        antialias: true,
        alpha: false,
        forceWebGL: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(
        mount.clientWidth  || window.innerWidth,
        mount.clientHeight || window.innerHeight,
      );
      renderer.setClearColor(0x010101, 1);
      renderer.toneMapping          = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure  = 1.2;
      renderer.outputColorSpace     = THREE.SRGBColorSpace;

      await renderer.init();
      if (disposed) { renderer.dispose(); return; }

      mount.appendChild(renderer.domElement);

      // ── Scene + Camera ──────────────────────────────────────────────────
      const scene  = new THREE.Scene();
      scene.colorSpace = THREE.SRGBColorSpace;

      const camera = new THREE.PerspectiveCamera(
        50,
        (mount.clientWidth  || window.innerWidth) /
        (mount.clientHeight || window.innerHeight),
        0.1, 2000,
      );
      camera.position.set(1, 0.5, 3);
      camera.lookAt(0, 0, 0);

      // ── Textures ────────────────────────────────────────────────────────
      const loader = new THREE.TextureLoader();

      const NOISE_URL = 'https://raw.githubusercontent.com/MisterPrada/singularity/master/static/textures/noise_deep.png';
      const STARS_URL = 'https://raw.githubusercontent.com/MisterPrada/singularity/master/static/textures/hdr/nebula.png';

      const [noiseDeepTex, starsTex] = await Promise.all([
        loadTextureWithFallback(loader, NOISE_URL, makeFallbackNoiseTexture),
        loadTextureWithFallback(loader, STARS_URL, makeFallbackStarsTexture),
      ]);
      if (disposed) return;

      noiseDeepTex.wrapS = noiseDeepTex.wrapT = THREE.RepeatWrapping;
      noiseDeepTex.needsUpdate = true;

      starsTex.mapping    = THREE.EquirectangularReflectionMapping;
      starsTex.colorSpace = THREE.SRGBColorSpace;
      starsTex.needsUpdate = true;

      // ── Scene background (Environment.js) ───────────────────────────────
      const uBgIntensity = uniform(float(2.0));
      scene.backgroundNode = textureTSL(starsTex, equirectUV()).mul(uBgIntensity);

      // ── Black Hole uniforms (BlackHole.js — verbatim) ───────────────────
      const uStepSize      = uniform(float(0.0071));
      const uNoiseFactor   = uniform(float(0.01));
      const uPower         = uniform(float(0.3));
      const uOriginRadius  = uniform(float(0.13));
      const uWidth         = uniform(float(0.03));
      const uRampCol1      = uniform(colorTSL(0.95, 0.71, 0.44));
      const uRampPos1      = uniform(float(0.050));
      const uRampCol2      = uniform(colorTSL(0.14, 0.05, 0.03));
      const uRampPos2      = uniform(float(0.425));
      const uRampCol3      = uniform(colorTSL(0, 0, 0));
      const uRampPos3      = uniform(float(1.0));
      const uRampEmission  = uniform(float(2.0));
      const uEmissionColor = uniform(colorTSL(0.14, 0.129, 0.09));

      // ── Material (BlackHole.js) ─────────────────────────────────────────
      // @ts-ignore
      const material = new THREE.MeshStandardNodeMaterial({ side: THREE.DoubleSide });

      // @ts-ignore
      material.colorNode = Fn(() => {

        const objCoords   = positionGeometry.mul(vec3(1, 1, -1)).xzy;
        const isBackface  = step(0.0, faceDirection.negate());
        const camPointObj = cameraPosition.mul(modelWorldMatrix).mul(vec3(1, 1, -1)).xzy;
        const startCoords = mix(objCoords, camPointObj.xyz, isBackface);
        const viewInWorld = normalize(cameraPosition.sub(positionWorld))
                              .mul(vec3(1, 1, -1)).xzy;
        const rayDir = viewInWorld.negate();

        const noiseWhite = whiteNoise2D(objCoords.xy).mul(uNoiseFactor);
        const jitter     = rayDir.mul(noiseWhite);

        const rayPos   = startCoords.sub(jitter).toVar();
        const rayDirV  = rayDir.toVar();
        const colorAcc = vec3(0).toVar();
        const alphaAcc = float(0.0).toVar();

        Loop(128, () => {
          const rNorm    = normalize(rayPos);
          const rLen     = lengthSqrt(rayPos);
          const steerMag = uStepSize.mul(uPower).div(rLen.mul(rLen));
          const rangeVal = remapClamp(rLen, 1.0, 0.5, 0.0, 1.0);
          const steer    = rNorm.mul(steerMag.mul(rangeVal));
          const steered  = normalize(rayDirV.sub(steer));

          const advance = rayDirV.mul(uStepSize);
          rayPos.addAssign(advance);

          const xyLen    = lengthSqrt(rayPos.mul(vec3(1, 1, 0)));
          const rotPhase = xyLen.mul(4.270).sub(time.mul(0.1));
          const uvRot    = rayPos.mul(rotateAxis(vec3(0, 0, 1), rotPhase));
          const uvSample = uvRot.mul(2).xy;

          const noiseDeep = textureTSL(noiseDeepTex, uvSample).rgb;

          const bandMin = uWidth.negate();
          const dz      = sub(vec3(bandMin, 0.0, uWidth), vec3(rayPos.z));
          const zQuad   = dz.mul(dz).div(uWidth);
          const zBand   = max(uWidth.sub(zQuad).div(uWidth), 0.0);

          const noiseAmp3   = noiseDeep.mul(zBand);
          const noiseAmpLen = lengthSqrt(noiseAmp3);

          const noiseNml    = textureTSL(noiseDeepTex, uvSample.mul(1.002)).rgb.mul(zBand);
          const noiseNmlLen = lengthSqrt(noiseNml);

          const rampInput = xyLen
            .add(noiseAmpLen.sub(0.780).mul(1.5))
            .add(noiseAmpLen.sub(noiseNmlLen).mul(19.750));

          const rampA   = vec4(uRampCol1, uRampPos1);
          const rampB   = vec4(uRampCol2, uRampPos2);
          const rampC   = vec4(uRampCol3, uRampPos3);
          const base    = ColorRamp3_BSpline(rampInput.x, rampA, rampB, rampC);
          const emitCol = base.mul(uRampEmission).add(uEmissionColor);

          const rLenNow   = lengthSqrt(rayPos);
          const inCore    = rLenNow.lessThan(uOriginRadius);
          const shadedCol = mix(emitCol, vec3(0), inCore);

          const zAbs     = abs(rayPos.z);
          const aNoise   = noiseAmpLen.sub(0.750).mul(-0.60);
          const aRadial  = smoothRange(xyLen, 1.0, 0.0, 0.0, 1.0);
          const aBand    = smoothRange(zAbs.add(aNoise), uWidth, 0, 0, aRadial);
          const alphaLoc = mix(aBand, 1.0, inCore);

          const weight = alphaAcc.oneMinus().mul(vecToFac(alphaLoc));
          colorAcc.assign(mix(colorAcc, shadedCol, weight));
          alphaAcc.assign(mix(alphaAcc, 1.0, vecToFac(alphaLoc)));

          rayPos.addAssign(advance);
          rayDirV.assign(steered);
        });

        const dirForEnv = rayDirV.mul(vec3(1, -1, 1)).xzy;
        const env = linearToSrgb(
          textureTSL(starsTex, equirectUV(dirForEnv)).rgb.mul(uBgIntensity)
        );
        const trans    = float(1.0).sub(alphaAcc);
        const finalRGB = mix(colorAcc, env, trans);
        return srgbToLinear(finalRGB);

      })();

      // @ts-ignore
      material.emissiveNode = material.colorNode;

      scene.add(new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), material));

      // ── Render pipeline (PostProcess.js — bloom) ───────────────────────
      // Bloom values from State.js: strength 0.217, radius 0, threshold 0
      // @ts-ignore
      const renderPipeline = new THREE.RenderPipeline(renderer);

      const scenePass = pass(scene, camera, {});
      scenePass.setMRT(mrt({ output, emissive }));

      const scenePassColor = scenePass.getTextureNode('output');
      const emissivePass   = scenePass.getTextureNode('emissive');

      const bloomNode = bloom(emissivePass, 0.217, 0.0, 0.0);

      renderPipeline.outputNode = scenePassColor.add(bloomNode);

      // ── Resize ─────────────────────────────────────────────────────────
      const onResize = () => {
        if (!renderer || !mount) return;
        const w = mount.clientWidth  || window.innerWidth;
        const h = mount.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        renderPipeline.needsUpdate = true;
      };
      window.addEventListener('resize', onResize);

      // ── Animation loop ─────────────────────────────────────────────────
      renderer.setAnimationLoop((ts: number) => {
        if (disposed) return;
        const elapsed = ts * 0.001;

        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;

        const baseAngle = elapsed * 0.05;
        const R = 3;
        camera.position.x = Math.sin(baseAngle + mouse.x * 0.4) * R;
        camera.position.z = Math.cos(baseAngle + mouse.x * 0.4) * R;
        camera.position.y = 0.5 + mouse.y * -0.8;
        camera.lookAt(0, 0, 0);

        renderPipeline.render();
      });

      (renderer as any).__cleanup = () => window.removeEventListener('resize', onResize);
    };

    init().catch((e) => console.error('[SingularityCanvas]', e));

    return () => {
      disposed = true;
      window.removeEventListener('mousemove', onMouseMove);
      if (renderer) {
        if ((renderer as any).__cleanup) (renderer as any).__cleanup();
        renderer.setAnimationLoop(null);
        const canvas = renderer.domElement;
        renderer.dispose();
        if (mount?.contains(canvas)) mount.removeChild(canvas);
        renderer = null;
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
