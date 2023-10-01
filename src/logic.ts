import type { RuneClient } from "rune-games-sdk/multiplayer";

export interface GameState {
  count: number;
}

export type GameActions = {
  increment: (params: { amount: number }) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 1,
  setup: () => ({
      count: 0,
    }),
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount;
    },
  },
});
