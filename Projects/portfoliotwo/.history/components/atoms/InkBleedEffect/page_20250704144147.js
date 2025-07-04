// components/InkBleedEffect.js
'use client'; // This is a client component

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import styles from './inkBleedEffect.module.css'; // Import your CSS module

// Import shaders
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';

const InkBleedEffect = ({ children }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // We use refs to keep track of Three.js objects without causing re-renders
  const threeRef = useRef({}).current;

  useEffect(() => {
    // === THREE.js SETUP ===
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true, // Important for transparent background
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // === GEOMETRY & MATERIAL ===
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/images/ink-blot-noise.png');

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        u_time: { value: 0 },
        u_intensity: { value: 0.0 },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_texture: { value: texture },
      },
    });
    threeRef.material = material; // Store material in ref

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // === RESIZE LOGIC ===
    const handleResize = () => {
      const { clientWidth, clientHeight } = containerRef.current;
      renderer.setSize(clientWidth, clientHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // === MOUSE & ANIMATION LOGIC ===
    const clock = new THREE.Clock();

    const handleMouseMove = (e) => {
      // Convert mouse position to UV coordinates (0 to 1)
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = 1.0 - (clientY - top) / height; // Y is inverted in UVs
      
      if (threeRef.material) {
        threeRef.material.uniforms.u_mouse.value.set(x, y);
      }
    };

    const handleMouseEnter = () => {
      gsap.to(threeRef.material.uniforms.u_intensity, {
        value: 1.0,
        duration: 0.7,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(threeRef.material.uniforms.u_intensity, {
        value: 0.0,
        duration: 0.7,
        ease: 'power2.out',
      });
    };
    
    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // === RENDER LOOP ===
    const animate = () => {
      material.uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // === CLEANUP ===
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      
      // Dispose of Three.js objects
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [threeRef]);

  return (
    <div ref={containerRef} className={styles.inkBleedContainer}>
      <canvas ref={canvasRef} className={styles.inkBleedCanvas}/>
      <div className={styles.contentOnTop}>{children}</div>
    </div>
  );
};

export default InkBleedEffect;