import type { Chapter } from "../engine/types";
import { chapter1 } from "./chapters/chapter1";

/** Register new chapters here as they're written. The engine looks chapters
 *  up by id and never needs to change when content grows. */
export const chapterRegistry: Record<string, Chapter> = {
  [chapter1.id]: chapter1,
};

export const FIRST_CHAPTER_ID = chapter1.id;
