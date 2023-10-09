import type { RuneClient } from "rune-games-sdk/multiplayer";
import { shuffledArray } from "./components/tiles";

export interface GameState {
  match: string[];
  flippedTiles: string[];
  moves: number;
  numberOfTiles: number;
  scores: Record<string, number>;
}

export type GameActions = {
  pushToFlippedTiles: (params: { tileId: string }) => void;
  popFlippedTiles: (params: { tileId: string }) => void;
  gameOver: () => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 1,
  setup: (allPlayerIds) => {
    const scores: Record<string, number> = {};
    for (const playerId of allPlayerIds) {
      scores[playerId] = 0;
    }
    return {
      match: [],
      flippedTiles: [],
      moves: 0,
      numberOfTiles: shuffledArray.length,
      scores,
    };
  },
  actions: {
    pushToFlippedTiles: ({ tileId }, { game, playerId }) => {
      if (game.flippedTiles.length < 2) game.flippedTiles.push(tileId);
      if (game.flippedTiles.length === 2) {
        game.moves++;
        game.scores[playerId] = game.moves;
        if (game.flippedTiles[0] === game.flippedTiles[1]) {
          game.match.push(game.flippedTiles[0]);
          game.numberOfTiles -= 2;
        }
        game.flippedTiles = [];
      }
    },
    popFlippedTiles({ tileId }, { game }) {
      if (game.flippedTiles.length > 0)
        game.flippedTiles = game.flippedTiles.filter((v) => v !== tileId);
    },
    gameOver: () => {
      Rune.gameOver();
    },
  },
  update: ({ game }) => {
    if (game.numberOfTiles <= 0) {
      Rune.gameOver({ players: game.scores });
    }
  },
});
