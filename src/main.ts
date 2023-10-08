import "./style.css";
import { renderApp } from "./components/app";
import { GameState } from "./logic";
// import { attachListenerToFlip } from "./components/tiles";

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

// document.addEventListener("gamestate", (e: CustomEvent<GameDetail>) => {
//   attachListenerToFlip(e.detail.game);
// });

Rune.initClient({
  onChange: ({ newGame }) => {
    updateGameEvent(newGame);
    // const detach = attachListenerToFlip(newGame);
  },
});
