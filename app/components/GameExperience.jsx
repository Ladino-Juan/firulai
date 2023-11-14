"use client";

import { ContactShadows, Environment, Text } from "@react-three/drei";
import {
  CuboidCollider,
  CylinderCollider,
  RigidBody,
} from "@react-three/rapier";
import { CharacterController } from "./CharacterController";
import { DecisionSpot } from "./DecisionSpot";
import { FarmStage } from "./FarmStage";
import { useGameStore } from "../Store";
import { useThree } from "@react-three/fiber";

const GameExperience = () => {

  /* responsive size */
  const { viewport } = useThree();

  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width / 12;
  const farmScaleRatio = Math.max(0.5, Math.min(0.9 * responsiveRatio, 0.9));

  const { timeLeft } = useGameStore((state) => ({ timeLeft: state.timeLeft }));

  return (
    <>
      {/* LIGHTS */}
      <Environment preset="sunset" />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.3}
        castShadow
        color={"#9e69da"}
      />

      <Text
        position={[0, isMobile ? -1.5 : -0.92, 0]}
        fontSize={isMobile ? 1.2 : 1.84}
        rotation-x={-Math.PI / 2}
        font="./fonts/Poppins-Regular.ttf"
      >
        {timeLeft}
        <meshStandardMaterial color={"white"} opacity={0.6} transparent />
      </Text>

      <group position-y={-1}>
        {/* FLOOR */}
        <RigidBody colliders={false} type="fixed" name="void">
          <CuboidCollider position={[0, -3.5, 0]} args={[50, 0.1, 50]} sensor />
        </RigidBody>
        <ContactShadows
          frames={1}
          position={[0, -0.88, 0]}
          scale={80}
          opacity={0.42}
          far={50}
          blur={0.8}
          color={"#aa9acd"}
        />
        {/* STAGE */}
        <FarmStage
          position-y={-1.4}
          position-z={isMobile ? 1.6 : 2}
          scale={[farmScaleRatio, farmScaleRatio, farmScaleRatio]}
        />
        <RigidBody
          colliders={false}
          type="fixed"
          position-y={-0.5}
          friction={2}
        >
          <CylinderCollider args={[isMobile ? 0.1 : 0.2, isMobile ? 3 : 4.5]}/>
        </RigidBody>

        {/* CHARACTER */}
        <CharacterController />

        {/* DECISIONS */}
        <DecisionSpot/>
      </group>
    </>
  );
};

export default GameExperience;
