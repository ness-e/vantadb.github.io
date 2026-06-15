import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * SingularityCanvas
 * Original Three.js implementation of a black-hole / accretion-disk style
 * particle simulation. Inspired by the "singularity" aesthetic: a dense
 * cloud of points orbiting an event horizon, warped by mouse gravity.
 *
 * Pure custom code — no third-party source vendored.
 */

const PARTICLE_COUNT = 9000;

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { mouse, viewport } = useThree();

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const seeds = new Float32Array(PARTICLE_COUNT * 3); // radius, angle, z-tilt
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // disc with bias toward inner ring
      const r = Math.pow(Math.random(), 0.6) * 6 + 0.8;
      const a = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 0.35 * (1 / (r * 0.4 + 0.2));
      positions[i * 3 + 0] = Math.cos(a) * r;
      positions[i * 3 + 1] = z;
      positions[i * 3 + 2] = Math.sin(a) * r;
      seeds[i * 3 + 0] = r;
      seeds[i * 3 + 1] = a;
      seeds[i * 3 + 2] = Math.random();
    }
    return { positions, seeds };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
      uSize: { value: 18 },
      uColorHot: { value: new THREE.Color("#c4a8ff") },
      uColorCold: { value: new THREE.Color("#4cc8ff") },
      uColorCore: { value: new THREE.Color("#ffffff") },
    }),
    [],
  );

  useFrame((_, delta) => {
    const u = materialRef.current?.uniforms;
    if (!u) return;
    u.uTime.value += delta;
    // Translate normalized mouse to world coords on the disc plane
    const target = new THREE.Vector3(
      (mouse.x * viewport.width) / 2,
      (mouse.y * viewport.height) / 2,
      0,
    );
    u.uMouse.value.lerp(target, 0.05);

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x = Math.sin(u.uTime.value * 0.1) * 0.08;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-seed" args={[seeds, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          uniform float uTime;
          uniform float uSize;
          uniform vec3 uMouse;
          attribute vec3 seed;
          varying float vDist;
          varying float vRadius;

          void main() {
            float r = seed.x;
            float baseAngle = seed.y;
            float n = seed.z;

            // Keplerian-ish angular speed: inner faster
            float speed = 0.6 / pow(r, 0.55);
            float angle = baseAngle + uTime * speed;

            vec3 pos;
            pos.x = cos(angle) * r;
            pos.z = sin(angle) * r;
            pos.y = position.y + sin(uTime * 0.5 + n * 6.283) * 0.04;

            // Mouse gravity well — bend particles toward cursor
            vec3 toMouse = uMouse - pos;
            float md = length(toMouse);
            float pull = 0.35 / (md * md + 0.6);
            pos += normalize(toMouse) * pull;

            // Spiral fall-in near core
            if (r < 1.4) {
              pos *= 0.985 + 0.015 * sin(uTime + n * 6.283);
            }

            vRadius = r;
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            vDist = -mv.z;
            gl_Position = projectionMatrix * mv;
            gl_PointSize = uSize * (1.0 / vDist) * (0.6 + 0.8 / r);
          }
        `}
        fragmentShader={`
          uniform vec3 uColorHot;
          uniform vec3 uColorCold;
          uniform vec3 uColorCore;
          varying float vDist;
          varying float vRadius;

          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            if (d > 0.5) discard;
            float a = smoothstep(0.5, 0.0, d);

            float t = smoothstep(0.8, 5.0, vRadius);
            vec3 col = mix(uColorHot, uColorCold, t);
            // core glow
            col = mix(uColorCore, col, smoothstep(0.6, 1.6, vRadius));

            gl_FragColor = vec4(col, a * 0.85);
          }
        `}
      />
    </points>
  );
}

function EventHorizon() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.z = s.clock.elapsedTime * 0.05;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.55, 64, 64]} />
      <meshBasicMaterial color="#000000" />
    </mesh>
  );
}

export function SingularityCanvas() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="pointer-events-auto absolute inset-0">
        <Canvas
          camera={{ position: [0, 1.6, 7], fov: 55 }}
          dpr={[1, 1.8]}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={["#0a0612"]} />
          <fog attach="fog" args={["#0a0612", 6, 18]} />
          <EventHorizon />
          <ParticleField />
        </Canvas>
      </div>
      {/* contrast veil */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,6,18,0.55)_60%,rgba(10,6,18,0.9)_100%)]" />
    </div>
  );
}
