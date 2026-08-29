import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { AvatarConfig, PlayerState, Scene, ScreenId } from "./types";
import { chapterRegistry } from "../content/chapterRegistry";
import { createNewPlayerState } from "./playerFactory";
import { applyEffects } from "./effects";
import { clearSave, hasSave, loadGame, saveGame } from "./saveSystem";

interface GameUiState {
  screen: ScreenId;
  player: PlayerState | null;
  /** How many dialogue lines of the current scene are revealed so far. */
  lineIndex: number;
  /** Last effect summary strings, shown briefly as a toast after a choice. */
  lastEffectSummary: string[];
}

type GameAction =
  | { type: "GO_TO_CHARACTER_CREATION" }
  | { type: "GO_TO_START" }
  | { type: "CONFIRM_CHARACTER"; name: string; username: string; avatar: AvatarConfig }
  | { type: "CONTINUE_SAVED_GAME" }
  | { type: "ADVANCE_LINE" }
  | { type: "MAKE_CHOICE"; choiceId: string }
  | { type: "ADVANCE_SCENE" }
  | { type: "CLEAR_EFFECT_SUMMARY" }
  | { type: "RESTART" };

function getScene(player: PlayerState): Scene | null {
  const chapter = chapterRegistry[player.currentChapterId];
  if (!chapter) return null;
  return chapter.scenes[player.currentSceneId] ?? null;
}

/** Applies onEnterEffects for whatever scene the player currently points at.
 *  Called whenever currentSceneId changes. */
function withSceneEntryEffectsApplied(player: PlayerState): PlayerState {
  const scene = getScene(player);
  if (!scene) return player;
  return applyEffects(player, scene.onEnterEffects);
}

function reducer(state: GameUiState, action: GameAction): GameUiState {
  switch (action.type) {
    case "GO_TO_CHARACTER_CREATION":
      return { ...state, screen: "character-creation" };

    case "GO_TO_START":
      return { ...state, screen: "start" };

    case "CONFIRM_CHARACTER": {
      const player = createNewPlayerState(action.name, action.username, action.avatar);
      const withEffects = withSceneEntryEffectsApplied(player);
      return { screen: "story", player: withEffects, lineIndex: 0, lastEffectSummary: [] };
    }

    case "CONTINUE_SAVED_GAME": {
      const saved = loadGame();
      if (!saved) return state;
      const scene = getScene(saved);
      // Resume with dialogue already revealed so the player lands on choices
      // or the "continue" prompt rather than replaying lines they've seen.
      const lineIndex = scene ? scene.lines.length : 0;
      return { screen: "story", player: saved, lineIndex, lastEffectSummary: [] };
    }

    case "ADVANCE_LINE": {
      if (!state.player) return state;
      const scene = getScene(state.player);
      if (!scene) return state;
      const nextIndex = Math.min(state.lineIndex + 1, scene.lines.length);
      return { ...state, lineIndex: nextIndex };
    }

    case "MAKE_CHOICE": {
      if (!state.player) return state;
      const scene = getScene(state.player);
      const choice = scene?.choices?.find((c) => c.id === action.choiceId);
      if (!scene || !choice) return state;

      const afterChoiceEffects = applyEffects(state.player, choice.effects);
      const nextSceneId = choice.nextSceneId ?? scene.nextSceneId;
      if (!nextSceneId) {
        // No further scene: stay put, just record effects.
        return {
          ...state,
          player: afterChoiceEffects,
          lastEffectSummary: summarize(choice.effects),
        };
      }
      const advanced = withSceneEntryEffectsApplied({
        ...afterChoiceEffects,
        currentSceneId: nextSceneId,
      });
      return {
        screen: "story",
        player: advanced,
        lineIndex: 0,
        lastEffectSummary: summarize(choice.effects),
      };
    }

    case "ADVANCE_SCENE": {
      if (!state.player) return state;
      const scene = getScene(state.player);
      if (!scene || !scene.nextSceneId) return state;
      const advanced = withSceneEntryEffectsApplied({
        ...state.player,
        currentSceneId: scene.nextSceneId,
      });
      return { ...state, player: advanced, lineIndex: 0 };
    }

    case "CLEAR_EFFECT_SUMMARY":
      return { ...state, lastEffectSummary: [] };

    case "RESTART":
      clearSave();
      return { screen: "start", player: null, lineIndex: 0, lastEffectSummary: [] };

    default:
      return state;
  }
}

function summarize(effects?: { stats?: { stat: string; amount: number }[] }): string[] {
  if (!effects?.stats) return [];
  const labels: Record<string, string> = {
    fame: "Fame",
    followers: "Followers",
    cash: "Cash",
    energy: "Energy",
    style: "Style",
  };
  return effects.stats.map((d) => `${d.amount >= 0 ? "+" : ""}${d.amount} ${labels[d.stat] ?? d.stat}`);
}

interface GameContextValue {
  screen: ScreenId;
  player: PlayerState | null;
  currentScene: Scene | null;
  lineIndex: number;
  lastEffectSummary: string[];
  hasSaveAvailable: boolean;
  goToCharacterCreation: () => void;
  goToStart: () => void;
  confirmCharacter: (name: string, username: string, avatar: AvatarConfig) => void;
  continueSavedGame: () => void;
  advanceLine: () => void;
  makeChoice: (choiceId: string) => void;
  advanceScene: () => void;
  clearEffectSummary: () => void;
  restart: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    screen: "start",
    player: null,
    lineIndex: 0,
    lastEffectSummary: [],
  });

  // Autosave whenever the player state changes.
  useEffect(() => {
    if (state.player) saveGame(state.player);
  }, [state.player]);

  const currentScene = state.player ? getScene(state.player) : null;

  const value = useMemo<GameContextValue>(
    () => ({
      screen: state.screen,
      player: state.player,
      currentScene,
      lineIndex: state.lineIndex,
      lastEffectSummary: state.lastEffectSummary,
      hasSaveAvailable: hasSave(),
      goToCharacterCreation: () => dispatch({ type: "GO_TO_CHARACTER_CREATION" }),
      goToStart: () => dispatch({ type: "GO_TO_START" }),
      confirmCharacter: (name, username, avatar) =>
        dispatch({ type: "CONFIRM_CHARACTER", name, username, avatar }),
      continueSavedGame: () => dispatch({ type: "CONTINUE_SAVED_GAME" }),
      advanceLine: () => dispatch({ type: "ADVANCE_LINE" }),
      makeChoice: (choiceId) => dispatch({ type: "MAKE_CHOICE", choiceId }),
      advanceScene: () => dispatch({ type: "ADVANCE_SCENE" }),
      clearEffectSummary: () => dispatch({ type: "CLEAR_EFFECT_SUMMARY" }),
      restart: () => dispatch({ type: "RESTART" }),
    }),
    [state, currentScene]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
}
