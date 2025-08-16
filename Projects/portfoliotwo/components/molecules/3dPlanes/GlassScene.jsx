// GlassScene.jsx
"use client"

import React, { Suspense, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import Planes from "./Planes"


function CameraRig() {
  const { camera } = useThree()
  useEffect(() => {
    camera.position.set(0, 0, 3)
    camera.lookAt(0, 0, 0)
    camera.near = 0.1
    camera.far = 5000
    camera.updateProjectionMatrix()
  }, [camera])
  return null
}

export default function GlassScene() {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} camera={{ fov: 40 }} style={{ background: "transparent" }}>
        <color attach="background" args={["#edf2f5"]} />

        <ambientLight intensity={0.35} />
        <directionalLight position={[-2, -2, 5]} intensity={1.1} /> {/* bottom */}
        <directionalLight position={[2.5, 2.5, 2]} intensity={2} /> {/* top */}
        {/* <directionalLight position={[3, 3, 2]} intensity={1.1} /> */}
        <Environment 
            files="/hdr/NormalMap.jpg"
            blur={1} 
            background={false} 
            backgroundIntensity={0.5}
        />
      <Suspense fallback={null}>
        <Planes
            rotationDeg={[-10, 10, 0]}
            position={[0.5, 1, 0]}
            scale={1}
            mouseFollow 
        />
      </Suspense>
    <EffectComposer>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          intensity={0.5}
        />
      </EffectComposer>
      <CameraRig />
    </Canvas>
  )
}
