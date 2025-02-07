import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function BeerCan(props) {
  const { nodes, materials } = useGLTF('/media/cans/beerCan/CansWeb.gltf')
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.995, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder005.geometry}
          material={materials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder005_1.geometry}
          material={materials.Fish}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/media/cans/beerCan/CansWeb.gltf')