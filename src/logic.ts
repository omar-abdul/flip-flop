import type { RuneClient } from "rune-games-sdk/multiplayer";

export interface GameState {
  flipped: boolean;
  noOfFlips: number;
  match: string[];
  flippedTiles: string[];
}

export type GameActions = {
  changeFlip: () => void;
  incrementFlipsByOne: () => void;
  decrementFlipsByOne: () => void;
  resetAllFlipped: () => void;
  pushToFlippedTiles: (params: { tileValue: string }) => void;
  popFlippedTiles: (params: { tileValue: string }) => void;
  canBeFlipped: () => boolean;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 1,
  setup: () => ({
    flipped: false,
    noOfFlips: 0,
    match: [],
    flippedTiles: [],
  }),
  actions: {
    changeFlip: (_, { game }) => {
      game.flipped = !game.flipped;
    },
    incrementFlipsByOne: (_, { game }) => {
      if (game.noOfFlips >= 2) return;
      game.noOfFlips += 1;
    },
    resetAllFlipped: (_, { game }) => {
      game.noOfFlips = 0;
    },
    decrementFlipsByOne: (_, { game }) => {
      if (game.noOfFlips <= 0) return;
      game.noOfFlips -= 1;
    },
    pushToFlippedTiles: ({ tileValue }, { game }) => {
      if (game.flippedTiles.length < 2) game.flippedTiles.push(tileValue);
    },
    popFlippedTiles({ tileValue }, { game }) {
      if (game.flippedTiles.length > 0)
        game.flippedTiles = game.flippedTiles.filter((v) => v !== tileValue);
    },
    canBeFlipped: (_, { game }) => game.flippedTiles.length < 2,
  },
});
