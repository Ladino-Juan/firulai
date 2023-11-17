"use client";

import {
  KeyboardControls,
  Loader,
  useFont,
  useProgress,
} from "@react-three/drei";
import { Leva } from "leva";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useMemo, useState, useEffect } from "react";
import GameExperience from "./GameExperience";
import { Menu } from "./Menu";
import { useGameStore, useMobileController } from "../Store";
import DogHappinessIcon from "../../public/icons/dogHappiness.svg";
import DogHealthIcon from "../../public/icons/dogHealth.svg";
import CoinIcon from "../../public/icons/coin.svg";
import Image from "next/image";
import { Joystick } from "react-joystick-component";

export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

const Game = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const { healthLevel, happinessLevel, money } = useGameStore((state) => ({
    healthLevel: state.healthLevel,
    happinessLevel: state.happinessLevel,
    money: state.money,
  }));

  useFont.preload("./fonts/Poppins.json");

  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  const [joystickDirection, setJoystickDirection] = useState(null);

  // UseEffect to handle joystick direction changes
  useEffect(() => {
    if (joystickDirection) {
      // Reset all direction states to false
      useMobileController.getState().setDirectionState("FORWARD", false);
      useMobileController.getState().setDirectionState("BACKWARD", false);
      useMobileController.getState().setDirectionState("LEFT", false);
      useMobileController.getState().setDirectionState("RIGHT", false);

      // Set the direction state to true based on the joystick direction
      useMobileController.getState().setDirectionState(joystickDirection, true);
    } else {
      // If joystickDirection is null, stop all directions
      useMobileController.getState().setDirectionState("FORWARD", false);
      useMobileController.getState().setDirectionState("BACKWARD", false);
      useMobileController.getState().setDirectionState("LEFT", false);
      useMobileController.getState().setDirectionState("RIGHT", false);
    }
  }, [joystickDirection]);


  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
  const [showJoystick, setShowJoystick] = useState(false);

  // Función para manejar el inicio del toque
  const handleTouchStart = (event) => {
    setShowJoystick(true);

    // Obtener las coordenadas del toque en relación con la ventana
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;

    // Establecer la posición del joystick usando las coordenadas del toque
    setJoystickPosition({ x: touchX, y: touchY });
  };
  const handleMove = (e) => {
    const direction = e.direction;
    setJoystickDirection(direction);
  };

  const handleStop = () => {
    setJoystickDirection(null);
  };

  const { progress } = useProgress();

  return (
    <KeyboardControls map={map}>
      <Leva hidden />
      <Canvas
        shadows
        camera={{ position: [0, 20, 14], fov: isMobile ? 68 : 42 }}
      >
        <color attach="background" args={["#719de3"]} />
        <Suspense>
          <Physics>
            <GameExperience />
          </Physics>
        </Suspense>
      </Canvas>
      <Loader />
      {!isMobile ? (
        <div className="absolute inset-0 flex items-center justify-end space-x-5 mr-14 font-spiegel">
          <div className="flex flex-col items-center space-y-2">
            <Image
              src={DogHealthIcon}
              alt="Firulais health icon"
              width={70}
              quality={100}
            ></Image>
            <div className="h-[75vh] w-20 bg-gray-200 rounded-full dark:bg-gray-700 relative">
              <div
                className="bg-amber-500 text-2xl font-light text-blue-100 pt-5 leading-none rounded-full  flex justify-center items-start transition-height duration-[1000ms] ease-in-out absolute bottom-0"
                style={{ height: `${healthLevel}%`, width: "100%" }}
              >
                {`${healthLevel}%`}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Image
              src={DogHappinessIcon}
              alt="Firulais happiness icon"
              width={70}
              quality={100}
            ></Image>
            <div className="h-[75vh] w-20 bg-gray-200 rounded-full dark:bg-gray-700 relative">
              <div
                className="bg-amber-500 text-2xl font-light text-blue-100 pt-5 leading-none rounded-full  flex justify-center items-start transition-height duration-[1000ms] ease-in-out absolute bottom-0"
                style={{ height: `${happinessLevel}%`, width: "100%" }}
              >
                {`${happinessLevel}%`}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <Image
              src={CoinIcon}
              alt="Firulais money icon"
              width={70}
              quality={100}
            ></Image>
            <div className="h-[75vh] w-20 bg-gray-200 rounded-full dark:bg-gray-700 relative">
              <div
                className="bg-amber-500 text-2xl font-light text-blue-100 pt-5 leading-none rounded-full flex justify-center items-start transition-height duration-[1000ms] ease-in-out absolute bottom-0"
                style={{ height: `${money}%`, width: "100%" }}
              >
                {`${money}%`}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="absolute inset-0 flex md:flex-col items-end justify-around md:justify-end m-5 md:m-0 md:mr-5"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {showJoystick && (
              <Joystick
                size={100}
                baseColor="#374151"
                sticky={false}
                stickColor="#FFDA77"
                move={handleMove}
                stop={handleStop}
                style={{ position: 'absolute', left: joystickPosition.x, top: joystickPosition.y }}
              ></Joystick>
            )}

            <div className={isMobile ? "flex flex-col space-y-2" : ""}>
              <div className="flex items-center space-x-2">
                <Image
                  src={DogHealthIcon}
                  alt="Firulais health icon"
                  width={30}
                  quality={100}
                ></Image>
                <div className="w-[80vw] bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-amber-500 text-xs font-light text-blue-100 text-center p-2.5 leading-none rounded-full transition-width duration-[1000ms] ease-in-out"
                    style={{ width: `${healthLevel}%` }}
                  >
                    {`${healthLevel}%`}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src={DogHappinessIcon}
                  alt="Firulais happiness icon"
                  width={30}
                  quality={100}
                ></Image>
                <div className="w-[80vw] bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-amber-500 text-xs font-light text-blue-100 text-center p-2.5 leading-none rounded-full transition-width duration-[1000ms] ease-in-out"
                    style={{ width: `${happinessLevel}%` }}
                  >
                    {`${happinessLevel}%`}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Image
                  src={CoinIcon}
                  alt="Firulais money icon"
                  width={30}
                  quality={100}
                ></Image>
                <div className="w-[80vw] bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-amber-500 text-xs font-light text-blue-100 text-center p-2.5 leading-none rounded-full transition-width duration-[1000ms] ease-in-out"
                    style={{ width: `${money}%` }}
                  >
                    {`${money}%`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {progress === 100 && <Menu />}
      <Menu />
    </KeyboardControls>
  );
};

export default Game;
