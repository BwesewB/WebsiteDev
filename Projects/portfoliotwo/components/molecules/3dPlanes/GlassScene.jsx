// GlassScene.jsx
"use client"

import React, { Suspense, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import Planes from "./Planes"

function CameraRig() {
  const { camera } = useThree()
  useEffect(() => {
    // camera.position.set(-1, 5, 3)
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
    <Canvas dpr={[1, 1.5]} gl={{ antialias: true }} camera={{ fov: 40 }}>
      <color attach="background" args={["#edf2f5"]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 3]} intensity={1.1} castShadow />
      <Environment preset="studio" blur={1} background={false} />
      <Suspense fallback={null}>
        <Planes
            rotationDeg={[0, 0, 0]}
            position={[0.5, 1, 0]}
            scale={1}
        //   rotationDeg={[20, -10, 85]}
        //   position={[10, 7, 0]}
        //   scale={15}
          mouseFollow 
        />
      </Suspense>

      <CameraRig />
    </Canvas>
  )
}
