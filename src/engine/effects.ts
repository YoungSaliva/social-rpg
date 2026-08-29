import type { Effects, PlayerState } from "./types";

/** Applies a generic Effects bundle to a PlayerState and returns a new state.
 *  This is the ONLY place stat/relationship/flag mutation logic lives — scenes
 *  and choices in content just describe effects declaratively. */
export function applyEffects(state: PlayerState, effects?: Effects): PlayerState {
  if (!effects) return state;

  const nextStats = { ...state.stats };
  for (const delta of effects.stats ?? []) {
    const current = nextStats[delta.stat] ?? 0;
    nextStats[delta.stat] = Math.max(0, current + delta.amount);
  }

  const nextRelationships = { ...state.relationships };
  for (const delta of effects.relationships ?? []) {
    const current = nextRelationships[delta.npcId] ?? 0;
    nextRelationships[delta.npcId] = Math.min(
      100,
      Math.max(0, current + delta.amount)
    );
  }

  const nextFlags = { ...state.flags };
  for (const flag of effects.flags ?? []) {
    nextFlags[flag.key] = flag.value;
  }

  return {
    ...state,
    stats: nextStats,
    relationships: nextRelationships,
    flags: nextFlags,
    updatedAt: new Date().toISOString(),
  };
}

/** Summarizes an Effects bundle into short human-readable deltas, e.g.
 *  "+2 Fame", used by the UI to show what just changed. */
export function describeEffects(effects?: Effects): string[] {
  if (!effects) return [];
  const statLabels: Record<string, string> = {
    fame: "Fame",
    followers: "Followers",
    cash: "Cash",
    energy: "Energy",
    style: "Style",
  };
  const out: string[] = [];
  for (const delta of effects.stats ?? []) {
    const sign = delta.amount >= 0 ? "+" : "";
    out.push(`${sign}${delta.amount} ${statLabels[delta.stat] ?? delta.stat}`);
  }
  return out;
}
