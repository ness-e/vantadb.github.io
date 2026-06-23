import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GRID_COUNT = 32;

function CubeScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const gridRef = useRef<THREE.Points>(null);
  const scrollDriven = useRef(false);

  /* Grid de puntos en un plano — Swiss precision dots vs estrellas flotantes */
  const gridPositions = useMemo(() => {
    const pos = new Float32Array(GRID_COUNT * 3);
    const side = Math.sqrt(GRID_COUNT) | 0;
    for (let i = 0; i < GRID_COUNT; i++) {
      const row = Math.floor(i / side);
      const col = i % side;
      pos[i * 3] = (col / side - 0.5) * 14;
      pos[i * 3 + 1] = (row / side - 0.5) * 14;
      pos[i * 3 + 2] = -6;
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
        onEnter: () => {
          scrollDriven.current = true;
        },
        onLeave: () => {
          scrollDriven.current = false;
        },
        onEnterBack: () => {
          scrollDriven.current = true;
        },
        onLeaveBack: () => {
          scrollDriven.current = false;
        },
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
    if (meshRef.current && !scrollDriven.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        {/* Wireframe Safety Orange — opaco para fondo claro */}
        <meshBasicMaterial color="#ff5500" wireframe opacity={0.5} transparent />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2.5, 2.5, 2.5)]} />
          <lineBasicMaterial color="#ff5500" opacity={0.9} transparent />
        </lineSegments>
      </mesh>
      {/* Puntos en grilla negros — visibles sobre fondo claro */}
      <points ref={gridRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[gridPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#000000" opacity={0.15} transparent sizeAttenuation />
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
