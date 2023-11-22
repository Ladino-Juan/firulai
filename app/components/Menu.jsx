"use client";

import { gameStates, useGameStore } from "../Store";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import InfoIcon from "../../public/icons/info-icon.svg";
import DogAi from "../../public/assets/DogAiGame.webp";
import Image from "next/image";
import DogHappinessIcon from "../../public/icons/dogHappiness.svg";
import DogHealthIcon from "../../public/icons/dogHealth.svg";
import CoinIcon from "../../public/icons/coin.svg";

export const Menu = () => {
  const { startGame, gameState, goToMenu } = useGameStore((state) => ({
    startGame: state.startGame,
    gameState: state.gameState,
    goToMenu: state.goToMenu,
  }));

  const [open, setOpen] = useState(false);
  const [hasClickedPlay, setHasClickedPlay] = useState(false);

  const [modalTextIndex, setModalTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const modalTexts = [
    "¡Hola, soy Rocky! Has sido elegid@ para cuidar de mí.",
    "A continuación se te presentarán una serie de preguntas y decisiones que debes tomar por mí.",
    "Cada decisión que tomes afectará positiva o negativamente mi salud, felicidad o dinero disponible.",
    "Si alguna de estas barras llega a cero, significará que no me has cuidado bien, y nuestra aventura terminará, al igual que si el contador llega a cero. Afortunadamente, me han dicho que eres un buen cuidador.",
    "Ten en cuenta lo siguiente:",
  ];

  const isMenuVisible = gameState === gameStates.MENU;
  const isGameOver = gameState === gameStates.GAME_OVER;
  const isWin = gameState === gameStates.WIN;

  const handleClickPlay = () => {
    if (!hasClickedPlay) {
      setOpen(true);
      setHasClickedPlay(true);
    } else {
      startGame();
    }
  };

  const handleNext = () => {
    // Cambiar el índice del texto al hacer clic en "Sig"
    if (modalTextIndex < modalTexts.length - 1) {
      setModalTextIndex(modalTextIndex + 1);
    } else {
      // Si se ha alcanzado el último mensaje, cerrar el modal
      setOpen(false);
      setModalTextIndex(0); // Reiniciar el índice para la próxima apertura
      startGame();
    }
  };
  useEffect(() => {
    const displayText = () => {
      if (currentCharIndex < modalTexts[modalTextIndex].length) {
        setDisplayedText(
          modalTexts[modalTextIndex].slice(0, currentCharIndex + 1)
        );
        setCurrentCharIndex(currentCharIndex + 1);
      }
    };

    const typingTimer = setTimeout(displayText, 50);

    return () => clearTimeout(typingTimer);
  }, [currentCharIndex, modalTextIndex]); // Remove modalTexts dependency from here

  useEffect(() => {
    setCurrentCharIndex(0);
    setDisplayedText("");
  }, [modalTextIndex]); // Run this effect when modalTextIndex changes

  return (
    <>
      <div className={`menu ${isMenuVisible ? "" : "menu--hidden"}`}>
        <div>
          <h1 className="font-solaris text-9xl text-main text-center mb-10 max-sm:text-6xl max-sm:mb-2">
            fIrulaiS
          </h1>
          <p className="text-2xl text-center font-spiegel max-sm:text-sm max-sm:mb-10">
            Forge the path for your virtual pet's aventure!
          </p>
        </div>
        <button
          className="p-2 rounded-lg border border-main text-center w-44 text-main hover:bg-main hover:text-white  transition-all duration-300"
          disabled={!isMenuVisible}
          onClick={handleClickPlay}
        >
          Play
        </button>
        <button
          className="btn absolute top-20 right-20 max-sm:right-5"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Image
            src={InfoIcon}
            alt="Firulais game"
            width={30}
            quality={100}
          ></Image>
        </button>

        <Modal open={open} onClose={() => setOpen(false)}>
          <div
            className={`flex flex-col items-center justify-center h-full w-full font-spiegel`}
          >
            <Image
              src={DogAi}
              alt="Firulais game"
              width={600}
              quality={100}
              className="absolute md:left-[-40%] top-1/4 max-sm:top-[90%]"
            ></Image>
            <div className="w-3/4 flex flex-col justify-center max-sm:w-[75vw]">
              <p className="text-3xl text-white text-center max-sm:text-2xl">{displayedText}</p>

              {displayedText === modalTexts[2] ? (
                <div className="w-full flex justify-around mt-6 text-lg max-sm:text-sm font-spiegel">
                  {/* Ícono relacionado con el dinero */}
                  <div className="text-white text-center flex flex-col items-center">
                    <Image
                      src={CoinIcon}
                      alt="Firulais money icon"
                      width={40}
                      quality={100}
                      className="mb-2"
                    />
                    DINERO
                  </div>

                  {/* Ícono relacionado con la salud */}
                  <div className="text-white text-center flex flex-col items-center">
                    <Image
                      src={DogHealthIcon}
                      alt="Firulais health icon"
                      width={40}
                      quality={100}
                      className="mb-2"
                    />
                    SALUD
                  </div>

                  {/* Ícono relacionado con la felicidad */}
                  <div className="text-white text-center flex flex-col items-center">
                    <Image
                      src={DogHappinessIcon}
                      alt="Firulais happiness icon"
                      width={40}
                      quality={100}
                      className="mb-2"
                    />
                    FELICIDAD
                  </div>
                </div>
              ) : (
                <></>
              )}
              {displayedText === modalTexts[4] ? (
                <ul className="font-spiegel mt-4 text-xl text-center">
                  <li>- No me gusta el pollo ni las croquetas.</li>
                  <li>- No disfruto los paseos al río.</li>
                  <li>- Me dan miedo los truenos.</li>
                  <li> - Le tengo miedo al agua.</li>
                  <li> - No me gusta interactuar con otros perros.</li>
                </ul>
              ) : (
                <></>
              )}
            </div>
            <div className="absolute right-10 bottom-10 max-sm:right-20">
              <button
                className="w-36 p-2 text-center background-image shadow-2xl rounded-xl text-xl hover:scale-110"
                onClick={handleNext}
              >
                {modalTextIndex < modalTexts.length - 1 ? "sig" : "jugar"}
              </button>
            </div>
          </div>
        </Modal>
      </div>

      <div className={`scores ${isGameOver || isWin ? "" : "scores--hidden"}`}>
        {isGameOver && (
          <>
            <h1>Game Over</h1>
            <button onClick={goToMenu} disabled={!isGameOver}>
              Play again
            </button>
          </>
        )}
        {isWin && (
          <>
            <h1>You Win</h1>
            <button onClick={goToMenu} disabled={!isWin}>
              Play again
            </button>
          </>
        )}
      </div>
    </>
  );
};
