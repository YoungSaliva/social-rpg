import type { Chapter } from "../../engine/types";

/**
 * Chapter 1 — "First Shift"
 * Vertical-slice story content: an opening scene, a choice with two branches,
 * and consequence scenes that reflect the player's decision back at them.
 * Purely data — the engine has no idea what a "café" or "talent scout" is.
 */
export const chapter1: Chapter = {
  id: "chapter-1",
  title: "First Shift",
  startSceneId: "opening",
  scenes: {
    opening: {
      id: "opening",
      locationId: "corner-cafe",
      lines: [
        {
          id: "l1",
          speakerId: "narrator",
          text: "Six a.m. The Corner Café smells like burnt espresso and yesterday's ambition. This is where it starts — not the top, not even close. Just a counter, an apron, and a Tuesday.",
        },
        {
          id: "l2",
          speakerId: "mara",
          text: "You're on the counter today. Smile at people, get the order right, and for the love of latte art — do NOT let the espresso machine hiss at you like that again.",
        },
        {
          id: "l3",
          speakerId: "player",
          text: "No promises. That machine started it.",
        },
        {
          id: "l4",
          speakerId: "mara",
          text: "Uh-huh. Rush is about to hit. Places.",
        },
      ],
      nextSceneId: "ollie-arrives",
    },

    "ollie-arrives": {
      id: "ollie-arrives",
      locationId: "corner-cafe",
      lines: [
        {
          id: "l1",
          speakerId: "narrator",
          text: "The morning rush thins out. A man in a well-worn leather jacket steps up to the counter, scrolling his phone with the practiced boredom of someone who's seen a thousand baristas.",
        },
        {
          id: "l2",
          speakerId: "ollie",
          text: "Surprise me. Whatever you'd actually want to drink, not whatever's easiest to make.",
        },
      ],
      choices: [
        {
          id: "choice-bold",
          text: "\"Seasonal special — it's not on the board yet, but you'll be glad I told you.\"",
          effects: {
            stats: [
              { stat: "fame", amount: 2 },
              { stat: "style", amount: 1 },
              { stat: "energy", amount: -1 },
            ],
            flags: [{ key: "firstShiftChoice", value: "bold" }],
          },
          nextSceneId: "bold-result",
        },
        {
          id: "choice-cautious",
          text: "\"House blend, black. Can't go wrong with it.\"",
          effects: {
            stats: [
              { stat: "cash", amount: 1 },
              { stat: "energy", amount: 1 },
            ],
            flags: [{ key: "firstShiftChoice", value: "cautious" }],
          },
          nextSceneId: "cautious-result",
        },
      ],
    },

    "bold-result": {
      id: "bold-result",
      locationId: "corner-cafe",
      onEnterEffects: {
        stats: [{ stat: "followers", amount: 15 }],
      },
      lines: [
        {
          id: "l1",
          speakerId: "narrator",
          text: "You slide the cup across the counter with a little too much confidence. He takes a sip — and actually stops scrolling.",
        },
        {
          id: "l2",
          speakerId: "ollie",
          text: "Okay. That's — huh. I run a scouting account, mostly nightlife and new faces. You've got a look the camera would like. Post something today, tag the café, see what happens.",
        },
        {
          id: "l3",
          speakerId: "player",
          text: "That an offer, or a line?",
        },
        {
          id: "l4",
          speakerId: "ollie",
          text: "Ask me again once you've got followers. Both, probably.",
        },
      ],
      nextSceneId: "shift-end",
    },

    "cautious-result": {
      id: "cautious-result",
      locationId: "corner-cafe",
      onEnterEffects: {
        stats: [{ stat: "cash", amount: 5 }],
      },
      lines: [
        {
          id: "l1",
          speakerId: "narrator",
          text: "Simple, correct, fast. He leaves a folded bill in the tip jar without much comment and heads back to his phone.",
        },
        {
          id: "l2",
          speakerId: "mara",
          text: "Solid. That's the whole job, honestly — don't overthink it, keep the line moving.",
        },
        {
          id: "l3",
          speakerId: "player",
          text: "Not exactly a viral moment.",
        },
        {
          id: "l4",
          speakerId: "mara",
          text: "No, but the till doesn't care about viral. Steady's underrated.",
        },
      ],
      nextSceneId: "shift-end",
    },

    "shift-end": {
      id: "shift-end",
      locationId: "cafe-backroom",
      lines: [
        {
          id: "l1",
          speakerId: "narrator",
          text: "Shift over. You hang the apron by the door and check your reflection in the dark window glass — same face as this morning, but the day left a mark on it either way.",
        },
        {
          id: "l2",
          speakerId: "narrator",
          text: "This is the end of the vertical slice. Chapter 2 — and everything after it — is built the same way this scene was: as data, not code.",
        },
      ],
    },
  },
};
