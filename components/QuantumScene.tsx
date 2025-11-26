/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Cylinder, Stars, Environment, Box } from '@react-three/drei';
import * as THREE from 'three';

// Comprehensive type declarations for R3F intrinsic elements to fix Vercel build errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshStandardMaterial: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      group: any;
      fog: any;
      mesh: any;
      primitive: any;
      object3D: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      meshStandardMaterial: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      group: any;
      fog: any;
      mesh: any;
      primitive: any;
      object3D: any;
    }
  }
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
        <Suspense fallback={null}>
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

            {/* Environment - Umhlanga Sunrise HDRI for warm, golden hour beach reflections */}
            <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/umhlanga_sunrise_1k.hdr" />
            
            {/* Fog to blend into the background page color */}
            <fog attach="fog" args={['#F9F8F4', 5, 20]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export const QuantumComputerScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#C5A059" />
            <pointLight position={[-5, -5, -5]} intensity={0.5} />
            <Environment preset="studio" />
            
            <Float rotationIntensity={0.4} floatIntensity={0.2} speed={1}>
            <group rotation={[0, 0, 0]} position={[0, 0.5, 0]}>
                {/* Main Cryostat Structure (Gold Chandelier) */}
                
                {/* Top Plate */}
                <Cylinder args={[1.2, 1.2, 0.1, 64]} position={[0, 1, 0]}>
                <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.15} />
                </Cylinder>
                
                {/* Middle Stage */}
                <Cylinder args={[1, 1, 0.1, 64]} position={[0, 0.2, 0]}>
                <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.15} />
                </Cylinder>
                
                {/* Bottom Stage (Mixing Chamber) */}
                <Cylinder args={[0.6, 0.6, 0.1, 64]} position={[0, -0.6, 0]}>
                <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.15} />
                </Cylinder>

                {/* Connecting Rods */}
                <Cylinder args={[0.04, 0.04, 0.8, 16]} position={[0.5, 0.6, 0]}>
                <meshStandardMaterial color="#D1D5DB" metalness={0.8} roughness={0.2} />
                </Cylinder>
                <Cylinder args={[0.04, 0.04, 0.8, 16]} position={[-0.5, 0.6, 0]}>
                <meshStandardMaterial color="#D1D5DB" metalness={0.8} roughness={0.2} />
                </Cylinder>
                <Cylinder args={[0.04, 0.04, 0.8, 16]} position={[0, 0.6, 0.5]}>
                <meshStandardMaterial color="#D1D5DB" metalness={0.8} roughness={0.2} />
                </Cylinder>
                <Cylinder args={[0.04, 0.04, 0.8, 16]} position={[0, 0.6, -0.5]}>
                <meshStandardMaterial color="#D1D5DB" metalness={0.8} roughness={0.2} />
                </Cylinder>

                {/* Lower Rods */}
                <Cylinder args={[0.03, 0.03, 0.8, 16]} position={[0.2, -0.2, 0]}>
                <meshStandardMaterial color="#D1D5DB" metalness={0.8} roughness={0.2} />
                </Cylinder>
                <Cylinder args={[0.03, 0.03, 0.8, 16]} position={[-0.2, -0.2, 0]}>
                <meshStandardMaterial color="#D1D5DB" metalness={0.8} roughness={0.2} />
                </Cylinder>

                {/* Coils/Wires - Copper colored */}
                <Torus args={[0.7, 0.015, 16, 64]} position={[0, -0.2, 0]} rotation={[Math.PI/2, 0, 0]}>
                <meshStandardMaterial color="#B87333" metalness={0.8} roughness={0.3} />
                </Torus>
                <Torus args={[0.3, 0.015, 16, 64]} position={[0, -1, 0]} rotation={[Math.PI/2, 0, 0]}>
                <meshStandardMaterial color="#B87333" metalness={0.8} roughness={0.3} />
                </Torus>
                
                {/* Central processor chip simulation at bottom */}
                <Box args={[0.2, 0.05, 0.2]} position={[0, -0.7, 0]}>
                    <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
                </Box>
            </group>
            </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}