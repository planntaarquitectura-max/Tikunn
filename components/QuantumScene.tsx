// @ts-nocheck
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Cylinder, Stars, Environment, Box, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

// Simplified Loader to avoid potential Drei/Html conflicts in preview
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-xs text-[#C5A059] font-sans tracking-widest uppercase">Cargando...</p>
      </div>
    </Html>
  );
}

const RippleRing = ({ radius, delay, opacity }: { radius: number, delay: number, opacity: number }) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            // Gentle undulating motion
            ref.current.position.z = Math.sin(t * 0.5 + delay) * 0.2;
            ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2 + delay) * 0.05;
            ref.current.rotation.y = Math.sin(t * 0.1 + delay) * 0.05;
        }
    })

    return (
        <Torus ref={ref} args={[radius, 0.02, 16, 128]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial 
                color="#A8A29E" 
                roughness={0.1} 
                metalness={0.8} 
                transparent 
                opacity={opacity} 
            />
        </Torus>
    )
}

const CentralDroplet = () => {
    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[0, 0.5]}>
            <Sphere args={[0.5, 64, 64]} position={[0, 0.5, 0]}>
                <MeshDistortMaterial
                    color="#C5A059"
                    envMapIntensity={3}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    metalness={1}
                    roughness={0}
                    distort={0} // Perfect sphere to match reference image
                />
            </Sphere>
        </Float>
    )
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 2, 8], fov: 35 }}>
        <Suspense fallback={<Loader />}>
            {/* Lighting setup for light tones */}
            <ambientLight intensity={1.5} />
            <spotLight position={[10, 10, 5]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" />
            <spotLight position={[-10, 5, -5]} angle={0.5} penumbra={1} intensity={1} color="#C5A059" />
            <pointLight position={[0, -5, 0]} intensity={1} color="#C5A059" />

            <CentralDroplet />
            
            {/* Concentric ripples */}
            <group position={[0, -1, 0]} rotation={[0.4, 0, 0]}>
                <RippleRing radius={1.5} delay={0} opacity={0.6} />
                <RippleRing radius={2.5} delay={1} opacity={0.5} />
                <RippleRing radius={3.5} delay={2} opacity={0.4} />
                <RippleRing radius={4.5} delay={3} opacity={0.3} />
                <RippleRing radius={5.5} delay={4} opacity={0.2} />
                <RippleRing radius={6.5} delay={5} opacity={0.1} />
            </group>

            {/* Environment - Using Umhlanga Sunrise for beach reflections as requested */}
            <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/umhlanga_sunrise_1k.hdr" />
            
            {/* Fog to blend into the background page color */}
            <fog attach="fog" args={['#F9F8F4', 5, 20]} />
        </Suspense>
      </Canvas>
    </div>
  );
};
