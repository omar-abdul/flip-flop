import { GameState } from "../logic";
import { getAppContainer } from "../util/util";
import { renderTiles } from "./tiles";

export function renderApp(game: GameState) {
  const app = getAppContainer();

  app.append(renderTiles()); //renderTiles under this container
}
