'use client';

import React, { useRef, useEffect, useState, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Float, Environment } from '@react-three/drei';
import gsap from 'gsap';
import styles from './InteractiveCan.module.css';

const fishTexturePath = '/media/cans/labels/Fish@2x.png';
const canModelPath = '/media/cans/beerCan/CansWeb.gltf';

// --- Simple Error Boundary to catch 3D loading errors ---
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("3D component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorFallback}>
          <p>Could not load 3D model.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- The 3D Model Component (no changes needed) ---
const CanModel = ({ scale }) => {
  const { nodes, materials } = useGLTF(canModelPath);
  const labelTexture = useTexture(fishTexturePath);
  labelTexture.flipY = false;

  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    gsap.to(groupRef.current.rotation, {
      y: 0.7 + (x * 0.5),
      x: -y * 0.5,
      duration: 1,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });

  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
      <group ref={groupRef} dispose={null} scale={scale} position={[0, -0.3, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Cylinder005.geometry} material={materials['Material.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Cylinder005_1.geometry}>
          <meshStandardMaterial map={labelTexture} />
        </mesh>
      </group>
    </Float>
  );
};

// --- The Main Exported Component ---
export default function InteractiveCanScene({
  className = '',
  scale: hoverScale = 1.1, // Renamed to avoid conflict
  movementFactor = 15,
}) {
  const containerRef = useRef(null); // Ref for the event listener container
  const childRef = useRef(null);     // Ref for the element to be animated by GSAP

  // --- Dynamic Hover Logic (Integrated) ---
  useEffect(() => {
    const container = containerRef.current;
    const child = childRef.current;
    if (!container || !child) return;

    const onMouseEnter = () => gsap.to(child, { scale: hoverScale, duration: 0.5, ease: 'power3.out' });
    const onMouseLeave = () => {
      gsap.killTweensOf(child);
      gsap.to(child, { scale: 1, x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
    };
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.pageX - (rect.left + window.scrollX)) / rect.width - 0.5;
      const y = (e.pageY - (rect.top + window.scrollY)) / rect.height - 0.5;
      gsap.to(child, { x: x * movementFactor, y: y * movementFactor, duration: 0.8, ease: 'power3.out' });
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mousemove', onMouseMove);

    return () => {
      if (container) {
        container.removeEventListener('mouseenter', onMouseEnter);
        container.removeEventListener('mouseleave', onMouseLeave);
        container.removeEventListener('mousemove', onMouseMove);
      }
      gsap.killTweensOf(child);
    };
  }, [hoverScale, movementFactor]);

  // --- Responsive Scaling Logic for the 3D model itself ---
  const [modelScale, setModelScale] = useState(0.7);
  useEffect(() => {
    const handleResize = () => setModelScale(window.innerWidth < 1350 ? 0.45 : 0.7);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
    >
      <div ref={childRef} className={styles.child}>
        <ErrorBoundary>
          <Canvas
            shadows
            dpr={[1, 1.5]}
            gl={{ antialias: true }}
            camera={{ fov: 30 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <CanModel scale={modelScale} />
            <Environment files="/hdr/beach.hdr" environmentIntensity={1.2} />
          </Canvas>
        </ErrorBoundary>
      </div>
    </div>
  );
}

// Preload assets for better performance
useGLTF.preload(canModelPath);
useTexture.preload(fishTexturePath);