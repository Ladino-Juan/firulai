import { create } from "zustand";

export const useCharacterStore = create((set) => ({
  characterState: "Idle",
  setCharacterState: (characterState) =>
    set({
      characterState,
    }),
}));

export const playAudio = (path, callback, loop = false, volume) => {
  const audio = new Audio(`/sounds/${path}.mp3`);

  if (callback) {
    audio.addEventListener("ended", callback);
  }

  if (loop) {
    audio.loop = true;
  }
  audio.volume = volume; // Establecer el volumen al 50%
  audio.play();

  return {
    stop: () => {
      audio.pause();
      audio.currentTime = 0;
    },
  };
};

