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

//   const materialProps = useControls({
//     thickness: { value: 1.05, min: 0, max: 3, step: 0.05 },
//     roughness: { value: 0.25, min: 0, max: 1, step: 0.01 },
//     transmission: { value: 1, min: 0, max: 1, step: 0.1 },
//     ior: { value: 2, min: 1, max: 3, step: 0.1 },
//     chromaticAberration: { value: 3, min: 0, max: 5 },
//     backside: { value: true },
//   })

  const materialProps = {
    thickness: 1.05,
    roughness: 0.25,
    transmission: 1,
    ior: 2,
    chromaticAberration: 3,
    backside: true,
  }

  useFrame((state) => {
    if (!mouseFollow || !groupRef.current) return
    const { x, y } = state.pointer 
    gsap.to(groupRef.current.rotation, {
      x: rotation[0] - y * 0.1,
      y: rotation[1] + x * 0.2,
      z: rotation[2],
      duration: 1,
      ease: "power2.out",
      overwrite: "auto"
    })

    gsap.to(groupRef.current.position, {
      x: position[0] + x * 0.2,
      y: position[1] + y * 0.2,
      z: position[2],
      duration: 1,
      ease: "power2.out",
      overwrite: "auto"
    })
  })

  useEffect(() => {
  console.log(nodes)
}, [nodes])

  return (
    <group
        ref={groupRef}
        position={position}
        rotation={rotation}
        scale={scale}
        {...props}
        style={{zIndex: 1000000}}
    >
      {Object.entries(nodes)
        .filter(([_, obj]) => obj.isMesh)
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
                // background={new THREE.Color("#edf2f5")}
                clearcoat={1}
                clearcoatRoughness={0.05}
                iridescence={1}
                iridescenceIOR={5}
                iridescenceThicknessRange={[100, 800]}
                emissive={"#88ccff"}
                emissiveIntensity={0.1}
            />
          </mesh>
        ))}
    </group>
  )
}

useGLTF.preload('/models/GlassPlanes.glb')