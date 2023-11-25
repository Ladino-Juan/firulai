import { Center, Cylinder, Text3D, Html } from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { useGameStore, useSensorStore, gameStates } from "../Store";
import { thingsToDo } from "../constants";
import { Crate } from "./Crate";

import { useState, useEffect } from "react";
export const DecisionSpot = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const { isSensor, setSensor } = useSensorStore();
  const { generateDecisions, finalDecision, gameState } = useGameStore((state) => ({
    generateDecisions: state.generateDecisions,
    finalDecision: state.finalDecision,
    gameState: state.gameState
  }));

  const [animate, setAnimate] = useState(false);

  const handleAnimationEnd = () => {
    setAnimate(false); // Restablece animate a false cuando se completa la animación
  };
  const [decisionsData, setDecisionsData] = useState([]);

  useEffect(() => {
    // Generate decisions when the component mounts
    setDecisionsData(generateDecisions());
  }, [generateDecisions]);
  const handleCollisionEnter = (dec) => {
    finalDecision(dec);
    setSensor(true);
    setAnimate(true);
    // Generate new questions when the player collides
    setDecisionsData(generateDecisions());
  };

  let decIdx = null;
  if (decisionsData.length > 0) {
    decIdx = decisionsData[0].idx - 1; // or apply your desired logic to determine decIdx
  }
  return (
    <>
      {decisionsData.map((dec, index) => (
        <group
          key={index}
          rotation-y={(index / decisionsData.length) * Math.PI * 2}
        >
     

          <group
            position-x={3.5}
            position-z={-3.5}
            scale={isMobile ? 0.8 : 0.9}
          >
            <RigidBody
              colliders={false}
              type="fixed"
              onCollisionEnter={() => handleCollisionEnter(dec)}
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
                rotation-y={-(index / decisionsData.length) * Math.PI * 2}
              >
                {index + 1}
                <meshStandardMaterial color="white" toneMapped={false} />
              </Text3D>
            </Center>
          </group>
        </group>
      ))}

      {!isMobile && (
        <Html position={[isMobile ? -2.7 : -3.3, isMobile ? 8.6 : 5, 0]}>
          <h1 className={`text-sm text-center md:text-2xl text-white w-[30vw] p-2 md:p-5 rounded-lg mb-4 background-image max-sm:w-[70vw] font-spiegel ${gameState != gameStates.GAME ? "hidden" : ""}`}>
            {thingsToDo[decIdx]}
          </h1>
        </Html>
      )}
      <Html position={isMobile ? [-2.5, isMobile ? 8 : 6, 0] : [-15, 4, -5]}>
        <h1 className={`text-sm text-black max-w-[110%] p-2 rounded-lg background-image md:hidden animate-none text-center w-[80vw] font-spiegel ${gameState != gameStates.GAME ? "hidden" : ""}`}>
          {thingsToDo[decIdx]}
        </h1>
        <div
          className={`space-y-2 w-[30vw] max-sm:mt-7 h-[70vh] flex justify-center flex-col font-spiegel ${gameState != gameStates.GAME ? "hidden" : ""} max-sm:h-[20vh] max-sm:w-[80vw] max-sm:space-y-1 ${
            animate ? "animate-slide-in" : ""
          } ${animate && isMobile ? "animate-slide-in-mobile" : ""}`}
          onAnimationEnd={handleAnimationEnd}
        >
          {decisionsData.map((dec, index) => (
            <h1
              className={`text-sm md:text-2xl text-white max-w-[110%] p-2 md:p-5 rounded-md background-image`}
              key={index}
            ><span className="text-white max-sm:text-black">{`${index + 1}:`}</span>{` ${dec.description}`}</h1>
          ))}
        </div>
      </Html>
    </>
  );
};
