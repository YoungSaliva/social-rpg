import type { NpcDefinition } from "../../engine/types";

/** All NPCs available to content authors. Add new NPCs here — nothing else
 *  needs to change for a new character to be usable in scene dialogue. */
export const npcRegistry: Record<string, NpcDefinition> = {
  narrator: {
    id: "narrator",
    name: "Narrator",
    role: "narration",
    colorTag: "#f2c14e",
  },
  player: {
    id: "player",
    name: "You",
    role: "player",
    colorTag: "#ff5c8a",
  },
  mara: {
    id: "mara",
    name: "Mara Chen",
    role: "Café shift lead",
    colorTag: "#6fb2c4",
  },
  ollie: {
    id: "ollie",
    name: "Ollie Dubois",
    role: "Regular customer, talent scout",
    colorTag: "#c48fce",
  },
};

export function getNpcName(npcId: string, override?: string): string {
  if (override) return override;
  return npcRegistry[npcId]?.name ?? npcId;
}

export function getNpcColor(npcId: string): string {
  return npcRegistry[npcId]?.colorTag ?? "#f6eee7";
}
