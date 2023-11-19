"use client";

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useCharacterStore } from "../Store";

export function Husky(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./models/Husky.gltf");
  const { actions } = useAnimations(animations, group);

  const characterState = useCharacterStore((state) => state.characterState);

  useEffect(() => {
    actions[characterState].reset().fadeIn(0.5).play();
    return () => {
      actions[characterState].fadeOut(0.5);
    };
  }, [characterState]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="AnimalArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.IKBackLegL} />
          <primitive object={nodes.IKFrontLegL} />
          <primitive object={nodes.IKBackLegR} />
          <primitive object={nodes.IKFrontLegR} />
          <group name="Cube">
            <skinnedMesh
              castShadow
              name="Cube_1"
              geometry={nodes.Cube_1.geometry}
              material={materials.Material}
              skeleton={nodes.Cube_1.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Cube_2"
              geometry={nodes.Cube_2.geometry}
              material={materials["Material.006"]}
              skeleton={nodes.Cube_2.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Cube_3"
              geometry={nodes.Cube_3.geometry}
              material={materials["Material.001"]}
              skeleton={nodes.Cube_3.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Cube_4"
              geometry={nodes.Cube_4.geometry}
              material={materials["Material.002"]}
              skeleton={nodes.Cube_4.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Cube_5"
              geometry={nodes.Cube_5.geometry}
              material={materials["Material.003"]}
              skeleton={nodes.Cube_5.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("./models/Husky.gltf");
