import { createElement } from "../util/util";

export function renderTiles() {
  const grid = createElement("div");
  grid.classList.add("grid");
  for (let i = 0; i < 15; i++) {
    const tileContainer = createElement("div");
    tileContainer.classList.add("tile-container");
    const tile = document.createElement("div");
    tile.classList.add("tile");
    const tileFront = createElement("div");
    tileFront.classList.add("tile-front");
    tile.appendChild(tileFront);
    const tileBack = createElement("div");
    tileBack.classList.add("tile-back");
    tile.appendChild(tileBack);
    const tileSideLeft = createElement("div");
    tileSideLeft.classList.add("tile-side", "left");
    tile.appendChild(tileSideLeft);

    const tileSideRight = createElement("div");
    tileSideRight.classList.add("tile-side", "right");
    tile.appendChild(tileSideRight);

    tileContainer.appendChild(tile);
    grid.append(tileContainer);
  }
  return grid;
}
