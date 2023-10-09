import "./style.css";
import { renderApp } from "./components/app";
import { GameState } from "./logic";

interface GameDetail {
  game: GameState;
}

declare global {
  interface DocumentEventMap {
    gamestate: CustomEvent<GameDetail>;
  }
}

const updateGameEvent = (game: GameState) => {
  const gameEvent = new CustomEvent("gamestate", {
    detail: {
      game,
    },
  });
  document.dispatchEvent(gameEvent);
};

renderApp();

Rune.initClient({
  onChange: ({ newGame }) => {
    updateGameEvent(newGame);
  },
});
