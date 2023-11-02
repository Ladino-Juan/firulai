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
import { Suspense, useMemo } from "react";
import GameExperience from "./GameExperience";
import { Menu } from "./Menu";
import { useGameStore } from "../Store";
import DogHappinessIcon from "../../public/icons/dogHappiness.svg";
import DogHealthIcon from "../../public/icons/dogHealth.svg";
import CoinIcon from "../../public/icons/coin.svg";
import Image from "next/image";

export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

const Game = () => {
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
  const { progress } = useProgress();

  return (
    <KeyboardControls map={map}>
      <Leva hidden />
      <Canvas shadows camera={{ position: [0, 20, 14], fov: 42 }}>
        <color attach="background" args={["#719de3"]} />
        <Suspense>
          <Physics>
            <GameExperience />
          </Physics>
        </Suspense>
      </Canvas>
      <Loader />

      <div className="absolute inset-0 flex items-center justify-end space-x-5 mr-14 font-california">
        <div className="flex flex-col items-center space-y-2">
          <Image
            src={DogHealthIcon}
            alt="Firulais health icon"
            width={70}
            quality={100}
          ></Image>
         <div class="h-[75vh] w-20 bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              class="bg-amber-500 text-2xl font-light text-blue-100 p-0.5 leading-none rounded-full  flex justify-center items-end transition-height duration-[3000ms] ease-in-out"
              style={{ height: `${healthLevel}%` }}
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
          <div class="h-[75vh] w-20 bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              class="bg-amber-500 text-2xl font-light text-blue-100 p-0.5 leading-none rounded-full  flex justify-center items-end transition-height duration-[3000ms] ease-in-out"
              style={{ height: `${happinessLevel}%` }}
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
          <div class="h-[75vh] w-20 bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              class="bg-amber-500 text-2xl font-light text-blue-100 p-0.5 leading-none rounded-full flex justify-center items-end transition-height duration-[3000ms] ease-in-out"
              style={{ height: `${money}%` }}
            >
              {`${money}%`}
            </div>
          </div>
        </div>
      </div>
      {progress === 100 && <Menu />}
      <Menu />
    </KeyboardControls>
  );
};

export default Game;
