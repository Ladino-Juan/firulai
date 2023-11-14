import { create } from "zustand";
import { decisions } from "./constants";

export const gameStates = {
  MENU: "MENU",
  GAME: "GAME",
  GAME_OVER: "GAME_OVER",
  WIN: "WIN",
};

export const useMobileController = create((set) => ({
  isMovingForward: false,
  isMovingBackward: false,
  isMovingLeft: false,
  isMovingRight: false,

  // Function to set the state based on the joystick direction
  setDirectionState: (direction, value) => {
    switch (direction) {
      case "FORWARD":
        set({ isMovingForward: value });
        break;
      case "BACKWARD":
        set({ isMovingBackward: value });
        break;
      case "LEFT":
        set({ isMovingLeft: value });
        break;
      case "RIGHT":
        set({ isMovingRight: value });
        break;
      default:
        break;
    }
  },

}))

export const useCharacterStore = create((set) => ({
  characterState: "Idle",
  setCharacterState: (characterState) =>
    set({
      characterState,
    }),
}));

export const playAudio = (path, callback, loop = false) => {
  const audio = new Audio(`./sounds/${path}.mp3`);

  if (callback) {
    audio.addEventListener("ended", callback);
  }

  if (loop) {
    audio.loop = true;
  }

  audio.play();

  return {
    stop: () => {
      audio.pause();
      audio.currentTime = 0;
    },
  };
};

export const useSensorStore = create((set) => ({
  isSensor: false,
  setSensor: (value) => set({ isSensor: value }),
}));
let currentAudioInstance = null;

let gameTimer = null;
let startTime = null;
const gameDuration = 30000; 

export const useGameStore = create((set) => ({
  gameState: gameStates.MENU,
  healthLevel: 40,
  happinessLevel: 40,
  money: 50,
  timeLeft: null,
  startGameTimer: (callback, initialDuration = gameDuration) => {
    if (gameTimer) {
      clearTimeout(gameTimer);
    }

    startTime = Date.now(); // Store the start timestamp

    gameTimer = setTimeout(() => {
      callback();
    }, initialDuration);

    const updateRemainingTime = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, initialDuration - elapsedTime);
      set({ timeLeft: Math.floor(remainingTime / 1000) }); // Convert to seconds and round down
    };

    const intervalId = setInterval(() => {
      updateRemainingTime();
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
    }, initialDuration);
  },
  gameOver: () => {
    set({ gameState: gameStates.GAME_OVER });
  },
  generateDecisions: () => {
    const randomIndex = Math.floor(Math.random() * decisions.length);
    return decisions[randomIndex];
  },
  startGame: () => {
    if (currentAudioInstance) {
      currentAudioInstance.stop();
    }

    currentAudioInstance = playAudio("start", null, true);
    set({
      gameState: gameStates.GAME,
      healthLevel: 40,
      happinessLevel: 40,
      money: 50,
    });

    useGameStore.getState().startGameTimer(() => {
      set({ gameState: gameStates.GAME_OVER });
    });

    return useGameStore.getState().generateRandomDecisions();
  },
  finalDecision: (decision) => {
    useGameStore.getState().startGameTimer(() => {
      set({ gameState: gameStates.GAME_OVER });
    }, gameDuration);
    playAudio("woodSmash");

    set((state) => ({
      healthLevel: Math.min(101, state.healthLevel + decision.healthLevel),
      happinessLevel: Math.min(
        101,
        state.happinessLevel + decision.happinessLevel
      ),
      money: Math.min(100, state.money + decision.money),
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
      const newDecisions = useGameStore.getState().generateDecisions();
      set({ gameState: gameStates.GAME, ...newDecisions });
    }
  },
  goToMenu: () => {
    if (currentAudioInstance) {
      currentAudioInstance.stop();
    }
    set({
      gameState: gameStates.MENU,
    });
  },
}));
