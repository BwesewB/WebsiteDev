// Planes.jsx
import React, { useRef, useMemo, useEffect } from 'react'
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useControls } from "leva";
import * as THREE from "three"  
import gsap from "gsap"

export default function Planes({
  rotationDeg = [0, 0, 0],
  position = [0, 0, 0],
  scale = 1,
  mouseFollow = false,
  ...props
}) {
  const { nodes } = useGLTF('/models/GlassPlanesTilted.glb')
  const groupRef = useRef()

const rotation = useMemo(
    () => rotationDeg.map((d) => THREE.MathUtils.degToRad(d)),
    [rotationDeg]
  )

  const materialProps = useControls({
    thickness: { value: 1.05, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.01 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 3, min: 1, max: 3, step: 0.1 },
    chromaticAberration: { value: 3, min: 0, max: 5 },
    backside: { value: true },
  })

  useFrame((state) => {
    if (!mouseFollow || !groupRef.current) return
    const { x, y } = state.pointer // -1..1

    // Animate rotation (counteract default with rotationDeg as base)
    gsap.to(groupRef.current.rotation, {
      x: rotation[0] - y * 0.3,
      y: rotation[1] + x * 0.4,
      z: rotation[2],
      duration: 1,
      ease: "power2.out",
      overwrite: "auto"
    })

    // Animate position for subtle parallax
    gsap.to(groupRef.current.position, {
      x: position[0] + x * 0.2,
      y: position[1] + y * 0.2,
      z: position[2],
      duration: 1,
      ease: "power2.out",
      overwrite: "auto"
    })
  })

  return (
    <group
        ref={groupRef}
        position={position}
        rotation={rotation}
        scale={scale}
        {...props}
    >
      {Object.entries(nodes)
        .filter(([_, obj]) => obj.type === 'Mesh')
        .map(([name, obj]) => (
          <mesh
            key={name}
            geometry={obj.geometry}
            position={obj.position}
            rotation={obj.rotation}
            scale={obj.scale}
            castShadow
            receiveShadow
          >
            <MeshTransmissionMaterial
                {...materialProps}
                envMapIntensity={0.05}
                background={new THREE.Color("#edf2f5")}
                clearcoat={1}
                clearcoatRoughness={0.05}
                iridescence={1}
                iridescenceIOR={5}
                iridescenceThicknessRange={[100, 800]}
            />
          </mesh>
        ))}
    </group>
  )
}

useGLTF.preload('/models/GlassPlanes.glb')