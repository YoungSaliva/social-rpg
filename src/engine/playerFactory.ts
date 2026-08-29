import type { AvatarConfig, PlayerState } from "./types";
import { FIRST_CHAPTER_ID } from "../content/chapterRegistry";
import { chapterRegistry } from "../content/chapterRegistry";

export const SAVE_VERSION = 1;

export const defaultAvatar: AvatarConfig = {
  skinTone: "skin-02",
  hairStyle: "hair-bob",
  hairColor: "hair-brown",
  top: "top-tee",
  bottom: "bottom-jeans",
  shoes: "shoes-sneakers",
  accessory: "acc-none",
};

/** Builds a brand-new player state at the very start of the game. The engine
 *  calls this once, at character creation confirm — nothing else in the app
 *  should construct a PlayerState from scratch. */
export function createNewPlayerState(
  name: string,
  username: string,
  avatar: AvatarConfig
): PlayerState {
  const now = new Date().toISOString();
  const firstChapter = chapterRegistry[FIRST_CHAPTER_ID];
  return {
    version: SAVE_VERSION,
    name,
    username,
    avatar,
    stats: {
      fame: 0,
      followers: 120,
      cash: 40,
      energy: 8,
      style: 1,
    },
    relationships: {},
    flags: {},
    currentChapterId: firstChapter.id,
    currentSceneId: firstChapter.startSceneId,
    createdAt: now,
    updatedAt: now,
  };
}
