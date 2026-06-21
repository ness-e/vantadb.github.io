import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STAR_COUNT = 40;

function CubeScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const starRef = useRef<THREE.Points>(null);

  const starPositions = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return pos;
  }, []);

  useEffect(() => {
    const el = meshRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#cta",
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const rot = self.progress * Math.PI * 2;
          el.rotation.x = rot * 0.5;
          el.rotation.y = rot;
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
    if (starRef.current) {
      starRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshBasicMaterial color="#ff6a00" wireframe opacity={0.15} transparent />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2.5, 2.5, 2.5)]} />
          <lineBasicMaterial color="#ff6a00" opacity={0.08} transparent />
        </lineSegments>
      </mesh>
      <points ref={starRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#ffffff"
          opacity={0.3}
          transparent
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export function HybridCube() {
  return (
    <div className="hybrid-cube">
      <Canvas
        camera={{ position: [5, 3, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <CubeScene />
      </Canvas>
    </div>
  );
}
