"use client";
import {
  CameraControls,
  Cylinder,
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useCursor,
  useTexture,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PetModel } from "./PetModel";
import { Rocky } from "./Rocky";



export const Experience = ({ model, name }) => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  useCursor(hovered);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    } else {
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
      {model.map((modelUrl, idx) => (
        <MonsterStage
          texture={"/assets/textures/mountains.png"}
          name={name[idx]}
          color={"#df8d52"}
          position-x={model.length == 1 ? 0 : model.length == 2 ? -1 + idx * 2.5 : -2.5 + (idx % 3) * 2.5}
          position-y={model.length > 3 && -3 + (Math.floor(idx / 3) * 3)}
          active={active}
          setActive={setActive}
          hovered={hovered}
          setHovered={setHovered}
          key={idx}
        >
          <Rocky
            scale={0.2}
            position-y={-0.6}
            position-z={0.1}
            rotation={[0, -1.571, 0]}
            hovered={hovered === name[idx]}
            model={modelUrl}
          />
        </MonsterStage>
      ))}
    </>
  );
};

const MonsterStage = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  hovered,
  setHovered,
  ...props
}) => {
  const map = useTexture(texture);
  const portalMaterial = useRef();

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
  });

  return (
    <group {...props}>
      <Text
        font="/fonts/Caprasimo-Regular.ttf"
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        anchorY={"bottom"}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
            <Cylinder scale={[0.8, 0.25, 1]} position-y={-0.7}>
                <meshStandardMaterial color="#BE8142" />
              </Cylinder>
          </mesh>
        </MeshPortalMaterial>
       
      </RoundedBox>
    </group>
  );
};

export default Experience;
