'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Text, Torus } from '@react-three/drei';
import { MathUtils } from 'three';
import type { Group } from 'three';
import { useEffect, useRef } from 'react';

const roomData = [
  { title: 'Auditive', z: 0, shape: 'sphere' },
  { title: 'Visuelle', z: -20, shape: 'torus' },
  { title: 'Tactile', z: -40, shape: 'sphere' },
  { title: 'Vestibulaire', z: -60, shape: 'torus' },
  { title: 'Proprioceptive', z: -80, shape: 'sphere' },
] as const;

function SceneContents() {
  const rig = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / Math.max(1, window.innerWidth)) * 2 - 1,
        y: 1 - (event.clientY / Math.max(1, window.innerHeight)) * 2,
      };
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  useFrame((_, delta) => {
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = MathUtils.clamp(window.scrollY / scrollable, 0, 1);
    // End at -70 so the final room at z=-80 remains in front of the camera.
    const targetZ = MathUtils.lerp(10, -70, progress);
    if (!rig.current) return;
    rig.current.position.z = MathUtils.damp(rig.current.position.z, targetZ, 2.4, delta);
    const targetRotationY = -pointer.current.x * 0.055;
    const targetRotationX = pointer.current.y * 0.04;
    rig.current.rotation.y = MathUtils.damp(rig.current.rotation.y, targetRotationY, 2.2, delta);
    rig.current.rotation.x = MathUtils.damp(rig.current.rotation.x, targetRotationX, 2.2, delta);
  });
  return <group ref={rig}>{roomData.map((room) => <Room key={room.title} {...room} />)}</group>;
}

function Room({ title, z, shape }: (typeof roomData)[number]) {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08;
    void state;
  });

  return (
    <group ref={group} position={[0, 0, z]}>
      <Text
        position={[0, 1.15, -3]}
        fontSize={0.78}
        maxWidth={8}
        anchorX="center"
        anchorY="middle"
        color="#0E5A5F"
        fontWeight={500}
      >
        {title}
      </Text>
      <Float speed={0.6} rotationIntensity={0.12} floatIntensity={0.24}>
        {shape === 'sphere' ? (
          <Sphere args={[1.05, 40, 40]} position={[-2.6, -0.45, -4]}>
            <meshStandardMaterial color="#C4623B" roughness={0.72} metalness={0.02} />
          </Sphere>
        ) : (
          <Torus args={[1.05, 0.28, 24, 96]} position={[2.6, -0.45, -4]}>
            <meshStandardMaterial color="#0E5A5F" roughness={0.58} metalness={0.08} />
          </Torus>
        )}
      </Float>
      <Sphere args={[0.22, 24, 24]} position={[2.7, 1.35, -5]}>
        <meshStandardMaterial color="#B7B99A" roughness={0.8} />
      </Sphere>
      <Torus args={[3.65, 0.018, 8, 120]} rotation={[0.1, 0, 0]} position={[0, -0.65, -6]}>
        <meshBasicMaterial color="#C4623B" transparent opacity={0.75} />
      </Torus>
    </group>
  );
}

export default function MuseumSceneCanvas() {
  return (
    <div className="pointer-events-none sticky top-0 z-0 h-screen w-full bg-[#F7F3EB]" aria-hidden="true">
      <Canvas className="!absolute inset-0 !h-full !w-full" camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#F7F3EB']} />
        <fog attach="fog" args={['#F7F3EB', 5, 40]} />
        <ambientLight intensity={1.15} color="#FFF7E8" />
        <directionalLight position={[-4, 7, 8]} intensity={2.1} color="#FFF0D7" />
        <directionalLight position={[5, 0, -8]} intensity={0.65} color="#B6D1C7" />
        <SceneContents />
      </Canvas>
    </div>
  );
}
