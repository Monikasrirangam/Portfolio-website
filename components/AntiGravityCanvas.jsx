'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometries() {
  const groupRef = useRef();

  // Create array of floating items with unique math parameters
  const items = [
    {
      id: 0,
      geom: new THREE.TorusGeometry(0.7, 0.25, 16, 100),
      pos: [-2.2, 1.2, -1],
      rotSpeed: [0.005, 0.008, 0.003],
      floatSpeed: 1.2,
      floatRange: 0.15,
      type: 'glass',
      color: '#FFFFFF'
    },
    {
      id: 1,
      geom: new THREE.SphereGeometry(0.55, 32, 32),
      pos: [2.5, 0.8, -2],
      rotSpeed: [0.002, 0.004, 0.001],
      floatSpeed: 0.9,
      floatRange: 0.2,
      type: 'glossy',
      color: '#E4A834'
    },
    {
      id: 2,
      geom: new THREE.IcosahedronGeometry(0.75, 1),
      pos: [-1.8, -1.5, -2],
      rotSpeed: [0.003, 0.002, 0.005],
      floatSpeed: 1.5,
      floatRange: 0.1,
      type: 'wireframe',
      color: '#444444'
    },
    {
      id: 3,
      geom: new THREE.ConeGeometry(0.5, 0.9, 4),
      pos: [2.0, -1.3, -1],
      rotSpeed: [0.008, 0.005, 0.002],
      floatSpeed: 1.1,
      floatRange: 0.18,
      type: 'glass',
      color: '#FF4500'
    },
    {
      id: 4,
      geom: new THREE.TorusKnotGeometry(0.4, 0.12, 64, 8),
      pos: [0, 0, -3.5],
      rotSpeed: [0.006, 0.006, 0.006],
      floatSpeed: 0.7,
      floatRange: 0.25,
      type: 'glossy',
      color: '#9D4EDD'
    }
  ];

  // Store individual references for independent bobbing
  const meshRefs = useRef([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Gentle individual bobbing & rotating
    items.forEach((item, idx) => {
      const mesh = meshRefs.current[idx];
      if (mesh) {
        mesh.rotation.x += item.rotSpeed[0];
        mesh.rotation.y += item.rotSpeed[1];
        mesh.rotation.z += item.rotSpeed[2];

        // Unique floating sine wave
        mesh.position.y = item.pos[1] + Math.sin(time * item.floatSpeed + item.id) * item.floatRange;
      }
    });

    // 2. Mouse Coordinate Parallax Lerping
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        state.pointer.y * 0.15,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.15,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {items.map((item, idx) => (
        <mesh
          key={item.id}
          ref={(el) => (meshRefs.current[idx] = el)}
          geometry={item.geom}
          position={item.pos}
        >
          {item.type === 'glass' && (
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.2}
              chromaticAberration={0.05}
              anisotropy={0.1}
              distortion={0.1}
              distortionScale={0.1}
              temporalDistortion={0.05}
              clearcoat={1}
              attenuationDistance={0.5}
              attenuationColor="#FFFFFF"
              color={item.color}
            />
          )}
          {item.type === 'glossy' && (
            <meshPhysicalMaterial
              color={item.color}
              roughness={0.1}
              metalness={0.9}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
            />
          )}
          {item.type === 'wireframe' && (
            <meshStandardMaterial
              color={item.color}
              wireframe
              roughness={0.8}
            />
          )}
        </mesh>
      ))}
    </group>
  );
}

export default function AntiGravityCanvas() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 bg-[#050505]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        
        {/* Soft fill lighting */}
        <directionalLight position={[-5, 5, 2]} intensity={0.5} />
        
        {/* Main rim light to showcase glass and metallic specular values */}
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#FFFFFF" />
        
        {/* Colorful background glowing spotlight */}
        <spotLight position={[0, -10, -5]} intensity={1.5} color="#5C67F2" angle={0.6} penumbra={1} />
        
        <FloatingGeometries />
      </Canvas>
    </div>
  );
}
