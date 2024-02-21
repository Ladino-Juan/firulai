"use client"
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Rocky({ hovered, model, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    model
  );
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    const anim = hovered ? 0 : 0;
    actions[names[anim]].reset().fadeIn(0.5).play();
    return () => actions[names[anim]].fadeOut(0.5);
  }, [hovered]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="metarig" position={[0, 0, 0.001]} rotation={[0, 1.571, 0]} scale={5.666}>
          <primitive object={nodes.spine005} />
          <primitive object={nodes.spine012} />
          <primitive object={nodes.Bone} />
          <group name="Cuerpo007">
            <skinnedMesh castShadow name="Cubo001" geometry={nodes.Cubo001.geometry} material={materials['Cuerpo del perrito']} skeleton={nodes.Cubo001.skeleton} />
            <skinnedMesh castShadow name="Cubo001_1" geometry={nodes.Cubo001_1.geometry} material={materials.Lenguita} skeleton={nodes.Cubo001_1.skeleton} />
            <skinnedMesh castShadow name="Cubo001_2" geometry={nodes.Cubo001_2.geometry} material={materials.Ojos} skeleton={nodes.Cubo001_2.skeleton} />
            <skinnedMesh castShadow name="Cubo001_3" geometry={nodes.Cubo001_3.geometry} material={materials['Material.001']} skeleton={nodes.Cubo001_3.skeleton} />
            <skinnedMesh castShadow name="Cubo001_4" geometry={nodes.Cubo001_4.geometry} material={materials.Trompita} skeleton={nodes.Cubo001_4.skeleton} />
            <skinnedMesh castShadow name="Cubo001_5" geometry={nodes.Cubo001_5.geometry} material={materials.Orejitas} skeleton={nodes.Cubo001_5.skeleton} />
            <skinnedMesh castShadow name="Cubo001_6" geometry={nodes.Cubo001_6.geometry} material={materials.Colita} skeleton={nodes.Cubo001_6.skeleton} />
            <skinnedMesh castShadow name="Cubo001_7" geometry={nodes.Cubo001_7.geometry} material={materials.Brillo} skeleton={nodes.Cubo001_7.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload()
