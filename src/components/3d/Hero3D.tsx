// src/components/3d/Hero3D.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';

interface Hero3DProps {
  className?: string;
}

function AnimatedCoin() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[1, 1, 0.2, 64]} />
        <MeshDistortMaterial
          color="#8B5CF6"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    ] as [number, number, number],
    scale: Math.random() * 0.5 + 0.1,
  }));

  return (
    <group>
      {particles.map((particle) => (
        <Float key={particle.id} speed={Math.random() * 2 + 1} rotationIntensity={1} floatIntensity={0.5}>
          <mesh position={particle.position} scale={particle.scale}>
            <octahedronGeometry args={[0.5]} />
            <meshStandardMaterial
              color={Math.random() > 0.5 ? '#8B5CF6' : '#6366F1'}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />

      <AnimatedCoin />
      <FloatingParticles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export function Hero3D({ className }: Hero3DProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className={cn('relative w-full h-[300px] sm:h-[350px] lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl', className)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-web3-violet/20 via-web3-indigo/20 to-transparent" />
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Scene />
      </Canvas>

      {/* Overlay Text */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 pointer-events-none">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 drop-shadow-lg">
          Unlock the Power of Crypto
        </h2>
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 drop-shadow-md line-clamp-2 sm:line-clamp-none">
          Manage your nodes, track earnings, and grow your portfolio
        </p>
      </div>
    </motion.div>
  );
}

export default Hero3D;
