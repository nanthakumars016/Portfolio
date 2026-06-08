import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedSphereProps {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  scale?: number;
}

function AnimatedSphere({ position, color, speed = 2, distort = 0.4, scale = 1 }: AnimatedSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

export function GlowingOrbs() {
  return (
    <div className="absolute inset-0 -z-5 opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />
        <pointLight position={[10, 10, 5]} intensity={0.5} color="#3B82F6" />
        
        <AnimatedSphere position={[-3, 1, -2]} color="#3B82F6" speed={1.5} distort={0.5} scale={0.8} />
        <AnimatedSphere position={[3, -1, -3]} color="#8B5CF6" speed={2} distort={0.4} scale={1.2} />
        <AnimatedSphere position={[0, 2, -4]} color="#EC4899" speed={1} distort={0.3} scale={0.6} />
      </Canvas>
    </div>
  );
}
