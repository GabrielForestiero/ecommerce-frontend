"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, OrbitControls, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Can() {
  const group = useRef<THREE.Group>(null);
  const label = useTexture("/textures/test8.png");

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y += 0.002;
  });

  const bottomProfile = new THREE.LatheGeometry(
    [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.3, 0.025),
      new THREE.Vector2(0.36, 0.06),
      new THREE.Vector2(0.425, 0.11),
      new THREE.Vector2(0.43, 0.15),
    ],
    72
  );

  const topProfile = new THREE.LatheGeometry(
    [
      new THREE.Vector2(0.43, 0.0),
      new THREE.Vector2(0.435, 0.025),
      new THREE.Vector2(0.44, 0.045),
      new THREE.Vector2(0.43, 0.075),
      new THREE.Vector2(0.39, 0.095),
      new THREE.Vector2(0.35, 0.11),
    ],
    72
  );

  return (
    <group ref={group}>
      <mesh>
        <cylinderGeometry args={[0.43, 0.43, 1.8, 80, 1, false]} />
        <meshStandardMaterial
          color="#c0c0c0"
          metalness={0.95}
          roughness={0.28}
          envMapIntensity={1.25}
        />
      </mesh>

      <mesh>
        <cylinderGeometry args={[0.438, 0.438, 1.78, 80, 1, true]} />
        <meshStandardMaterial
          map={label}
          transparent
          metalness={0.04}
          roughness={0.7}
        />
      </mesh>

      <mesh position={[0, 0.83, 0]}>
        <primitive object={topProfile} />
        <meshStandardMaterial
          color="#d1d5db"
          metalness={0.95}
          roughness={0.32}
        />
      </mesh>

      <mesh position={[0.075, 0.93, 0.17]}>
        <cylinderGeometry args={[0.065, 0.065, 0.014, 32]} />
        <meshStandardMaterial
          color="#b0b0b0"
          metalness={0.95}
          roughness={0.22}
        />
      </mesh>

      <mesh position={[0, 0.94, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.095, 0.018, 16, 40]} />
        <meshStandardMaterial
          color="#b0b0b0"
          metalness={0.95}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[0, 0.935, 0.19]}>
        <boxGeometry args={[0.055, 0.004, 0.16]} />
        <meshStandardMaterial
          color="#b0b0b0"
          metalness={0.95}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[0, -0.83, 0]} rotation={[Math.PI, 0, 0]}>
        <primitive object={bottomProfile} />
        <meshStandardMaterial
          color="#9ca3af"
          metalness={0.9}
          roughness={0.32}
        />
      </mesh>
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="w-full h-[50vh] md:h-[60vh] lg:h-screen min-h-75 max-h-200 touch-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 4]} intensity={1.3} />
        <directionalLight position={[-6, 3, -5]} intensity={0.8} />
        <directionalLight position={[0, -5, 4]} intensity={0.5} />

        <Environment preset="city" />

        <Can />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
