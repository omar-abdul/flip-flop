import type { RuneClient } from "rune-games-sdk/multiplayer";

export interface GameState {
  match: string[];
  flippedTiles: string[];
}

export type GameActions = {
  pushToFlippedTiles: (params: { tileId: string }) => void;
  popFlippedTiles: (params: { tileId: string }) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 1,
  setup: () => ({
    match: [],
    flippedTiles: [],
  }),
  actions: {
    pushToFlippedTiles: ({ tileId }, { game }) => {
      if (game.flippedTiles.length < 2) game.flippedTiles.push(tileId);
      if (game.flippedTiles.length === 2) {
        game.flippedTiles[0] === game.flippedTiles[1] &&
          game.match.push(game.flippedTiles[0]);
        game.flippedTiles = [];
      }
    },
    popFlippedTiles({ tileId }, { game }) {
      if (game.flippedTiles.length > 0)
        game.flippedTiles = game.flippedTiles.filter((v) => v !== tileId);
    },
  },
});
