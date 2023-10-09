import { createElement, shuffle } from "../util/util";
import * as theme from "./themes.json";

export function renderTiles() {
  const grid = createElement("div");
  grid.classList.add("grid");

  const arrayDoubled = [...theme.retro, ...theme.retro];
  const shuffeledArray = shuffle(arrayDoubled);

  for (let i = 0; i <= shuffeledArray.length - 1; i++) {
    const { value } = shuffeledArray[i];
    // const id = generateID();
    const tileContainer = createElement("div");
    tileContainer.classList.add("tile-container");
    tileContainer.dataset.tileValue = value;
    // tileContainer.dataset.tileId = id;
    tileContainer.dataset.flipped = "false";

    const tile = document.createElement("div");
    tile.classList.add("tile");
    const tileFront = createElement("div");
    tileFront.classList.add("tile-front");
    const innerP = createElement("p");
    innerP.classList.add("p-value");
    innerP.innerText = value;
    tileFront.appendChild(innerP);
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
let checking = false;
export function attachListenerToFlip() {
  // Select all .tile-container elements
  const tileContainers =
    document.querySelectorAll<HTMLDivElement>(".tile-container");

  const handleClicks = function (container: HTMLDivElement) {
    if (!checking) {
      if (container.dataset.flipped === "false") {
        if (flippedArr.length < 2) {
          Rune.actions.pushToFlippedTiles({
            tileId: container.dataset.tileValue!,
          });
          container.dataset.flipped = "true";
        }
      } else {
        Rune.actions.popFlippedTiles({
          tileId: container.dataset.tileValue!,
        });
        container.dataset.flipped = "false";
      }
    }
  };
  tileContainers.forEach((container) => {
    container.addEventListener("click", () => handleClicks(container));
  });
}
const flippedArr: string[] = [];
document.addEventListener("gamestate", function (e) {
  const { flippedTiles, match } = e.detail.game;

  flippedArr.length = 0;
  flippedArr.push(...flippedTiles);
  if (flippedArr.length === 0) {
    match.map((value) => {
      document
        .querySelectorAll<HTMLDivElement>(".tile-container")
        .forEach((container) => {
          if (container.dataset.tileValue === value) {
            checking = true;
            container.dataset.matched = "true";
            setTimeout(() => {
              checking = false;
            }, 700);
          }
        });
    });
    document
      .querySelectorAll<HTMLDivElement>(
        '.tile-container[data-flipped="true"]:not([data-matched="true"])'
      )
      .forEach((container) => {
        checking = true;
        setTimeout(() => {
          container.dataset.flipped = "false";
          checking = false;
        }, 700);
      });
  }
});
