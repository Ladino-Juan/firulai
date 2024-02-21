"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";

export function PetModel({ hovered, model, ...props }) {
  console.log(model)
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    '/models/Rocky.glb'
  );
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    const anim = hovered ? "Walk" : "Idle";
    actions[anim].reset().fadeIn(0.5).play();
    return () => actions[anim].fadeOut(0.5);
  }, [hovered]);

  console.log(names)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="metarig" position={[0, 0, 0.001]} rotation={[0, 1.571, 0]} scale={5.666}>
          <primitive object={nodes.spine005} />
          <primitive object={nodes.spine012} />
          <primitive object={nodes.Bone} />
          <group name="Cuerpo007">
            <skinnedMesh name="Cubo002" geometry={nodes.Cubo002.geometry} material={materials['Cuerpo del perrito.001']} skeleton={nodes.Cubo002.skeleton} />
            <skinnedMesh name="Cubo002_1" geometry={nodes.Cubo002_1.geometry} material={materials['Lenguita.001']} skeleton={nodes.Cubo002_1.skeleton} />
            <skinnedMesh name="Cubo002_2" geometry={nodes.Cubo002_2.geometry} material={materials['Ojos.001']} skeleton={nodes.Cubo002_2.skeleton} />
            <skinnedMesh name="Cubo002_3" geometry={nodes.Cubo002_3.geometry} material={materials['Material.002']} skeleton={nodes.Cubo002_3.skeleton} />
            <skinnedMesh name="Cubo002_4" geometry={nodes.Cubo002_4.geometry} material={materials['Trompita.001']} skeleton={nodes.Cubo002_4.skeleton} />
            <skinnedMesh name="Cubo002_5" geometry={nodes.Cubo002_5.geometry} material={materials['Orejitas.001']} skeleton={nodes.Cubo002_5.skeleton} />
            <skinnedMesh name="Cubo002_6" geometry={nodes.Cubo002_6.geometry} material={materials['Colita.001']} skeleton={nodes.Cubo002_6.skeleton} />
            <skinnedMesh name="Cubo002_7" geometry={nodes.Cubo002_7.geometry} material={materials['Brillo.001']} skeleton={nodes.Cubo002_7.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload()
