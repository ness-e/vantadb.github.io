/**
 * TSL Utility functions ported from MisterPrada/singularity (MIT)
 * https://github.com/MisterPrada/singularity/blob/master/src/Experience/Utils/TSL-utils.js
 * Only the subset required by the BlackHole shader is included.
 */
import {
  float, vec2, vec3, vec4,
  cos, sin, Fn, If,
  sub, mul, add, pow,
  fract, dot, mix, clamp, step,
  mat3,
} from 'three/tsl';

// ── Rotation matrix around an arbitrary axis ──────────────────────────────────

export const rotateAxis = /*@__PURE__*/ Fn(([axis_immutable, angle_immutable]: any[]) => {
  const angle = float(angle_immutable).toVar();
  const axis  = vec3(axis_immutable).toVar();
  const s  = float(sin(angle)).toVar();
  const c  = float(cos(angle)).toVar();
  const oc = float(sub(1.0, c)).toVar();
  return mat3(
    oc.mul(axis.x).mul(axis.x).add(c),
    oc.mul(axis.x).mul(axis.y).sub(axis.z.mul(s)),
    oc.mul(axis.z).mul(axis.x).add(axis.y.mul(s)),
    oc.mul(axis.x).mul(axis.y).add(axis.z.mul(s)),
    oc.mul(axis.y).mul(axis.y).add(c),
    oc.mul(axis.y).mul(axis.z).sub(axis.x.mul(s)),
    oc.mul(axis.z).mul(axis.x).sub(axis.y.mul(s)),
    oc.mul(axis.y).mul(axis.z).add(axis.x.mul(s)),
    oc.mul(axis.z).mul(axis.z).add(c),
  );
});

// ── White noise (hash-based) ──────────────────────────────────────────────────

export const whiteNoise2D = (coord: any) =>
  fract(sin(dot(coord, vec2(12.9898, 78.233))).mul(43758.5453));

// ── Length with explicit sqrt (matches original impl) ────────────────────────

export const lengthSqrt = Fn(([v]: any[]) =>
  v.x.mul(v.x).add(v.y.mul(v.y)).add(v.z.mul(v.z)).sqrt()
);

// ── Smooth range mapping ──────────────────────────────────────────────────────

export const smoothRange = /*@__PURE__*/ Fn(
  ([value, inMin, inMax, outMin, outMax]: any[]) => {
    const t       = clamp(value.sub(inMin).div(inMax.sub(inMin)), 0.0, 1.0);
    const smoothT = t.mul(t).mul(float(3.0).sub(t.mul(2.0)));
    return mix(outMin, outMax, smoothT);
  }
);

// ── Color-space conversion (sRGB ↔ linear) ───────────────────────────────────

export const srgbToLinear = Fn(([rgb]: any[]) =>
  mix(
    rgb.div(12.92),
    pow(add(rgb, 0.055).div(1.055), vec3(2.4)),
    step(0.04045, rgb)
  )
);

export const linearToSrgb = Fn(([lin]: any[]) => {
  const low  = lin.mul(12.92);
  const high = pow(lin, vec3(1.0 / 2.4)).mul(1.055).sub(0.055);
  return mix(low, high, step(0.0031308, lin));
});

// ── RGB → luminance ───────────────────────────────────────────────────────────

export const vecToFac = /*@__PURE__*/ Fn(([vector]: any[]) =>
  vector.r.mul(0.2126).add(vector.g.mul(0.7152)).add(vector.b.mul(0.0722)).toVar()
);

// ── 3-stop B-Spline color ramp ────────────────────────────────────────────────

const CatmulRom = /*@__PURE__*/ Fn(([T, D, C, B, A]: any[]) =>
  mul(0.5,
    mul(2.0, B)
      .add(A.negate().add(C).mul(T))
      .add(mul(2.0, A).sub(mul(5.0, B)).add(mul(4.0, C)).sub(D).mul(T).mul(T))
      .add(A.negate().add(mul(3.0, B)).sub(mul(3.0, C)).add(D).mul(T).mul(T).mul(T))
  )
);

export const ColorRamp3_BSpline = /*@__PURE__*/ Fn(([T, A, B, C]: any[]) => {
  const AB  = B.w.sub(A.w);
  const BC  = C.w.sub(B.w);
  const iAB = T.sub(A.w).div(AB).saturate();
  const iBC = T.sub(B.w).div(BC).saturate();
  const p   = vec3(sub(1.0, iAB), iAB.sub(iBC), iBC);
  const cA  = CatmulRom(p.x, A.xyz, A.xyz, B.xyz, C.xyz);
  const cB  = CatmulRom(p.y, A.xyz, B.xyz, C.xyz, C.xyz);
  const cC  = C.xyz;
  If(T.lessThan(B.w), () => { return cA.xyz; });
  If(T.lessThan(C.w), () => { return cB.xyz; });
  return cC.xyz;
});
