import { gameStates, useGameStore } from "../Store";

export const Menu = () => {
  const { startGame, gameState, goToMenu } = useGameStore((state) => ({
    startGame: state.startGame,
    gameState: state.gameState,
    goToMenu: state.goToMenu,
  }));

  const isMenuVisible = gameState === gameStates.MENU;
  const isGameOver = gameState === gameStates.GAME_OVER;
  const isWin = gameState === gameStates.WIN;

  return (
    <>
      <div className={`menu ${isMenuVisible ? '' : 'menu--hidden'}`}>
        <div>
          <h1 className="text-center">Welcome to firulais</h1>
          <p>A game to choose the best life for your virtual pet</p>
        </div>
        <button
          disabled={!isMenuVisible}
          onClick={startGame}
        >
          Jugar
        </button>
      </div>

      <div className={`scores ${isGameOver || isWin ? '' : 'scores--hidden'}`}>
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
