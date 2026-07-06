"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Scene() {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Canvas
        dpr={1}
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          const c = gl.domElement;
          c.addEventListener("webglcontextlost", (e) => console.warn("CONTEXT LOST", e));
          c.addEventListener("webglcontextrestored", () => console.warn("CONTEXT RESTORED"));
        }}
      >
        <ambientLight intensity={1} />
        <OrbitControls makeDefault />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
