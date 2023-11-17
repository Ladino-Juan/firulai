import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";
import { useRef } from "react";
import { Controls } from "./Game";
import {
  gameStates,
  useGameStore,
  useCharacterStore,
  useSensorStore,
  playAudio,
  useMobileController
} from "../Store";
import Husky from "./Husky";

import * as THREE from "three";
/* responsive size for the pet model */
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;


const JUMP_FORCE = 0.65;
const MOVEMENT_SPEED = 0.1;
const MAX_VEL = 2.5;
const RUN_VEL = 1.5;



export const CharacterController = () => {
  const { setSensor } = useSensorStore();
  const { characterState, setCharacterState } = useCharacterStore();
  const { gameState } = useGameStore((state) => ({
    gameState: state.gameState,
  }));
  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left])  || useMobileController.getState().isMovingLeft;
  const rightPressed = useKeyboardControls((state) => state[Controls.right])  || useMobileController.getState().isMovingRight;
  const backPressed = useKeyboardControls((state) => state[Controls.back])  || useMobileController.getState().isMovingBackward;
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  )  || useMobileController.getState().isMovingForward;
  const rigidbody = useRef();
  const isOnFloor = useRef(true);



  useFrame((state, delta) => {
    const impulse = { x: 0, y: 0, z: 0 };




    if (jumpPressed && isOnFloor.current) {
      impulse.y += JUMP_FORCE;
      isOnFloor.current = false;
    }

    const linvel = rigidbody.current.linvel();
    let changeRotation = false;
    if (rightPressed && linvel.x < MAX_VEL) {
      impulse.x += MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (leftPressed && linvel.x > -MAX_VEL) {
      impulse.x -= MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (backPressed && linvel.z < MAX_VEL) {
      impulse.z += MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (forwardPressed && linvel.z > -MAX_VEL) {
      impulse.z -= MOVEMENT_SPEED;
      changeRotation = true;
    }


    rigidbody.current.applyImpulse(impulse, true);

    if (Math.abs(linvel.x) > RUN_VEL || Math.abs(linvel.z) > RUN_VEL) {
      if (characterState !== "Walk") {
        setCharacterState("Walk");
      }
    } else {
      if (characterState !== "Idle") {
        setCharacterState("Idle");
      }
    }
    if (jumpPressed) {
      setCharacterState("Jump_ToIdle");
    }

    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z);
      character.current.rotation.y = angle;
    }

    // CAMERA FOLLOW
    const characterWorldPosition = character.current.getWorldPosition(
      new THREE.Vector3()
    );

    const targetCameraPosition = new THREE.Vector3(
      characterWorldPosition.x,
      0,
      characterWorldPosition.z + 14
    );

    if (gameState === gameStates.GAME) {
      targetCameraPosition.y = 6;
    }
    if (gameState !== gameStates.GAME) {
      targetCameraPosition.y = 0;
    }

    state.camera.position.lerp(targetCameraPosition, delta * 2);

    const targetLookAt = new THREE.Vector3(
      characterWorldPosition.x,
      0,
      characterWorldPosition.z
    );

    const direction = new THREE.Vector3();
    state.camera.getWorldDirection(direction);

    const position = new THREE.Vector3();
    state.camera.getWorldPosition(position);

    const currentLookAt = position.clone().add(direction);
    const lerpedLookAt = new THREE.Vector3();

    lerpedLookAt.lerpVectors(currentLookAt, targetLookAt, delta * 2);

    state.camera.lookAt(lerpedLookAt);
  });

  const character = useRef();

  const resetPosition = () => {
    rigidbody.current.setTranslation(vec3({ x: 0, y: 0, z: 0 }));
    rigidbody.current.setLinvel(vec3({ x: 0, y: 0, z: 0 }));
    setSensor(false);
  };

  return (
    <group>
      <RigidBody
        ref={rigidbody}
        colliders={false}
        scale={[0.5, 0.5, 0.5]}
        enabledRotations={[false, false, false]}
        onCollisionEnter={() => {
          isOnFloor.current = true;
        }}
        onIntersectionEnter={({ other }) => {
          if (other.rigidBodyObject.name === "void") {
            resetPosition();
            playAudio("fall", () => {
              playAudio("bark", null, false, 0.2);
            }, false, 0.3);
          }
        }}
      >
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]} />
        <group ref={character}>
          <Husky scale={isMobile ? 0.9 : 1}/>
        </group>
      </RigidBody>
    </group>
  );
};
