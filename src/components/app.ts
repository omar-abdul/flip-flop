import { getAppContainer } from "../util/util";
import { attachListenerToFlip, renderTiles } from "./tiles";

export function renderApp() {
  const app = getAppContainer();

  app.append(renderTiles()); //renderTiles under this container

  attachListenerToFlip();
}
