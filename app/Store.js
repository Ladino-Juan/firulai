import { create } from "zustand";
import { decisions } from "./constants";

export const gameStates = {
  MENU: "MENU",
  GAME: "GAME",
  GAME_OVER: "GAME_OVER",
  WIN: "WIN",
};

export const useCharacterStore = create((set) => ({
  characterState: "Idle",
  setCharacterState: (characterState) =>
    set({
      characterState,
    }),
}));

export const useSensorStore = create((set) => ({
  isSensor: false,
  setSensor: (value) => set({ isSensor: value }),
}));

{
  /*10 sencons end game timer: 
let gameTimer = null; // Store the timer reference
const gameDuration = 10000; // 10 seconds in milliseconds

// Function to start or restart the game timer
const startGameTimer = (callback) => {
  if (gameTimer) {
    clearTimeout(gameTimer);
  }
  gameTimer = setTimeout(() => {
    callback();
  }, gameDuration);
};*/
}

export const useGameStore = create((set) => ({
  gameState: gameStates.MENU,
  healthLevel: 40,
  happinessLevel: 40,
  money: 50,

  gameOver: () => {
    set({ gameState: gameStates.GAME_OVER });
  },
  generateRandomDecisions: () => {
    const randomDecisions = [];
    while (randomDecisions.length < 5) {
      const randomIndex = Math.floor(Math.random() * decisions.length);
      if (!randomDecisions.includes(decisions[randomIndex])) {
        randomDecisions.push(decisions[randomIndex]);
      }
    }
    return randomDecisions;
  },
  startGame: () => {
    set({
      gameState: gameStates.GAME,
      healthLevel: 40,
      happinessLevel: 40,
      money: 50,
    });
    /*startGameTimer(() => {
      set({ gameState: gameStates.GAME_OVER });
    });*/

    return useGameStore.getState().generateRandomDecisions();
  },
  finalDecision: (decision) => {
    /*startGameTimer(() => {
      set({ gameState: gameStates.GAME_OVER });
    });*/

    set((state) => ({
      healthLevel: Math.min(101, state.healthLevel + decision.healthLevel),
      happinessLevel: Math.min(
        101,
        state.happinessLevel + decision.happinessLevel
      ),
      money: Math.min(100, state.money + decision.moneyChange),
    }));

    const { healthLevel, happinessLevel, money } = useGameStore.getState();

    if (healthLevel < 0 || happinessLevel < 0 || money < 0) {
      set({
        gameState: gameStates.GAME_OVER,
      });
    } else if (healthLevel > 100 && happinessLevel > 100) {
      set({
        gameState: gameStates.WIN,
      });
    } else {
      const newDecisions = useGameStore.getState().generateRandomDecisions();
      set({ gameState: gameStates.GAME, ...newDecisions });
    }
  },
  goToMenu: () => {
    set({
      gameState: gameStates.MENU,
    });
  },
}));
