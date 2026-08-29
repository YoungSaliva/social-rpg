import type { PlayerState } from "./types";
import { SAVE_VERSION } from "./playerFactory";

const SAVE_KEY = "social-rpg.save.v1";

/** Persists player state to localStorage. Swappable later for a remote/
 *  cloud save backend without changing any calling code — callers only
 *  know about `saveGame` / `loadGame` / `hasSave` / `clearSave`. */
export function saveGame(state: PlayerState): void {
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save game:", err);
  }
}

export function loadGame(): PlayerState | null {
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PlayerState;
    if (parsed.version !== SAVE_VERSION) {
      // Vertical slice: no migration path yet, treat mismatched saves as absent.
      console.warn("Save version mismatch, ignoring old save.");
      return null;
    }
    return parsed;
  } catch (err) {
    console.error("Failed to load game:", err);
    return null;
  }
}

export function hasSave(): boolean {
  return window.localStorage.getItem(SAVE_KEY) !== null;
}

export function clearSave(): void {
  window.localStorage.removeItem(SAVE_KEY);
}
