// ============================================================================
// ENGINE TYPES
// These types define the contract between the engine and game content.
// Content authors (see /src/content) write data against these shapes.
// The engine never hardcodes story text, stat names' meaning, or asset paths —
// it only knows how to interpret this generic structure.
// ============================================================================

/** Named numeric resources tracked for the player. Content can reference any
 *  key here when writing StatDelta effects — the engine treats them generically. */
export interface PlayerStats {
  fame: number;
  followers: number;
  cash: number;
  energy: number;
  style: number;
}

/** A single layer of the player's avatar. Each layer points at an asset id
 *  which is resolved by the avatar asset registry (see content/avatar). */
export interface AvatarConfig {
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  top: string;
  bottom: string;
  shoes: string;
  accessory: string | null;
}

/** A relationship the player has with an NPC, tracked 0-100. */
export interface Relationship {
  npcId: string;
  affinity: number;
}

/** Persisted player/game state. This is the entire save file. */
export interface PlayerState {
  version: number;
  name: string;
  username: string;
  avatar: AvatarConfig;
  stats: PlayerStats;
  relationships: Record<string, number>;
  flags: Record<string, boolean | string | number>;
  currentChapterId: string;
  currentSceneId: string;
  createdAt: string;
  updatedAt: string;
}

/** A change applied to player stats when a choice or scene is resolved.
 *  Positive or negative numbers both allowed. */
export interface StatDelta {
  stat: keyof PlayerStats;
  amount: number;
}

/** A change applied to a relationship affinity value. */
export interface RelationshipDelta {
  npcId: string;
  amount: number;
}

/** A flag set/unset as a consequence — used for branching later content
 *  without needing new stats for every narrative fact. */
export interface FlagSet {
  key: string;
  value: boolean | string | number;
}

/** The bundle of consequences a choice or scene-end can apply. */
export interface Effects {
  stats?: StatDelta[];
  relationships?: RelationshipDelta[];
  flags?: FlagSet[];
}

/** One line of dialogue or narration within a scene. */
export interface DialogueLine {
  id: string;
  /** npc id, or 'player', or 'narrator' */
  speakerId: string;
  /** Display name override; if omitted the engine looks up the NPC registry. */
  speakerName?: string;
  text: string;
  /** Optional portrait/expression id shown alongside this line. */
  expression?: string;
}

/** A choice the player can make at a decision point. */
export interface Choice {
  id: string;
  text: string;
  effects?: Effects;
  /** Scene to go to after this choice. If omitted, continues to the next
   *  scene in chapter order. */
  nextSceneId?: string;
}

/** A single scene: a run of dialogue optionally followed by choices. */
export interface Scene {
  id: string;
  /** Background/location id, resolved by the location registry. */
  locationId: string;
  lines: DialogueLine[];
  choices?: Choice[];
  /** Effects applied automatically when the scene is entered (before lines play). */
  onEnterEffects?: Effects;
  /** If no choices are present, where to go next. Omit to end the chapter. */
  nextSceneId?: string;
}

/** A chapter is an ordered collection of scenes plus metadata. */
export interface Chapter {
  id: string;
  title: string;
  /** Scene id the chapter begins at. */
  startSceneId: string;
  scenes: Record<string, Scene>;
}

/** Static NPC registry entry. */
export interface NpcDefinition {
  id: string;
  name: string;
  role: string;
  colorTag: string;
}

/** Static location registry entry. */
export interface LocationDefinition {
  id: string;
  name: string;
  /** CSS gradient or solid color used as a placeholder backdrop until
   *  illustrated backgrounds are available. */
  backdrop: string;
}

export type ScreenId = "start" | "character-creation" | "story";
