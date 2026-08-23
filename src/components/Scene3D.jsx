import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Sparkles,
} from "@react-three/drei";

function EnergyCore() {
  const mesh = useRef(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;

    mesh.current.rotation.x += delta * 0.16;
    mesh.current.rotation.y += delta * 0.28;
    mesh.current.rotation.z += delta * 0.08;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.9}>
      <mesh ref={mesh} scale={1.7}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshDistortMaterial
          color="#2b5cff"
          emissive="#4b00ff"
          emissiveIntensity={2.4}
          roughness={0.16}
          metalness={0.8}
          distort={0.32}
          speed={2.2}
          transparent
          opacity={0.88}
        />
      </mesh>

      <mesh scale={2.2} rotation={[0.6, 0.4, 0.2]}>
        <torusGeometry args={[1.35, 0.018, 16, 160]} />
        <meshBasicMaterial
          color="#7c3cff"
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh scale={2.45} rotation={[1.1, 0.2, 0.8]}>
        <torusGeometry args={[1.35, 0.012, 16, 160]} />
        <meshBasicMaterial
          color="#00b7ff"
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="scene3d" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[4, 4, 4]} intensity={18} color="#335cff" />
        <pointLight position={[-4, -2, 2]} intensity={12} color="#a000ff" />

        <EnergyCore />
        <Sparkles
          count={100}
          scale={8}
          size={2.2}
          speed={0.35}
          color="#9bbcff"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.25}
        />
      </Canvas>
    </div>
  );
}
