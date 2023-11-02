import { Center, Cylinder, Text3D, Html, Text } from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { useGameStore, useSensorStore } from "../Store";
import { Crate } from "./Crate";
import { useState } from "react";


export const DecisionSpot = () => {
  const { isSensor, setSensor } = useSensorStore();
  const { generateRandomDecisions, finalDecision } = useGameStore((state) => ({
    generateRandomDecisions: state.generateRandomDecisions,
    finalDecision: state.finalDecision,
  }));
  const [decision, setDecision] = useState('');
  return (
    <>
      {generateRandomDecisions().map((dec, index) => (
        <group
          key={dec.idx}
          rotation-y={(index / generateRandomDecisions().length) * Math.PI * 2}
        >
 

          <group position-x={3.5} position-z={-3.5}>
            <RigidBody
              colliders={false}
              type="fixed"
              onCollisionEnter={() => {
                finalDecision(dec);
                setSensor(true);
                setDecision(dec.description);
              }}
              name="void"
            >
              <CylinderCollider args={[0.25 / 2, 1]} sensor={isSensor} />
              <Cylinder scale={[1, 0.25, 1]}>
                <meshStandardMaterial color="#BE8142" />
              </Cylinder>
            </RigidBody>

            <Crate scale={[1.22, 1.22, 1.22]} position={[0, 0, 0]} />

            <Center position-y={1.65}>
              <Text3D
                font={"./fonts/Poppins.json"}
                size={0.82}
                rotation-y={
                  -(index / generateRandomDecisions().length) * Math.PI * 2
                }
              >
                {index + 1}
                <meshStandardMaterial color="white" toneMapped={false} />
              </Text3D>
            </Center>
         
           
          </group>
        </group>
      ))}

      {console.log(decision)}
   <Html position={[-15, 3, -5]}>
        <div className="space-y-2 w-80 h-96 flex justify-center rounded-xl flex-col font-california">
          <h1 className="text-3xl  text-white ml-10">Decisions</h1>
          <h1>{decision}</h1>
          <button>NO</button>
          <button>YES</button>
        </div>
      </Html>
      
    </>
  );
};
