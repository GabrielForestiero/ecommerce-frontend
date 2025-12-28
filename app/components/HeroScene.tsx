"use client";

import { Canvas } from "@react-three/fiber";
import { useTexture, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Can() {
  const group = useRef<THREE.Group>(null);
  const label = useTexture("/textures/label.png");

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y += 0.004;
  });

  return (
    <group ref={group}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.4, 2, 64]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Top */}
      <mesh position={[0, 1.03, 0]}>
        <cylinderGeometry args={[0.39, 0.39, 0.06, 64]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Bottom */}
      <mesh position={[0, -1.02, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.05, 64]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Label */}
      <mesh>
        <cylinderGeometry args={[0.41, 0.41, 1.8, 64, 1, true]} />
        <meshStandardMaterial
          map={label}
          metalness={0.25}
          roughness={0.6}
        />
      </mesh>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={1.2} />
      <directionalLight position={[-6, 3, -5]} intensity={0.8} />
      <directionalLight position={[0, -5, 4]} intensity={0.5} />

      <Can />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
