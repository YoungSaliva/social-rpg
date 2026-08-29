import type { DialogueLine } from "../engine/types";
import { getNpcColor, getNpcName } from "../content/characters/npcs";
import "./DialogueBox.css";

interface DialogueBoxProps {
  line: DialogueLine;
  onTap: () => void;
  isLast: boolean;
}

export function DialogueBox({ line, onTap, isLast }: DialogueBoxProps) {
  const name = getNpcName(line.speakerId, line.speakerName);
  const color = getNpcColor(line.speakerId);
  const isNarration = line.speakerId === "narrator";

  return (
    <button className="dialogue-box anim-rise-in" onClick={onTap} key={line.id}>
      {!isNarration && (
        <span className="dialogue-box__speaker" style={{ color }}>
          {name}
        </span>
      )}
      <p className={`dialogue-box__text ${isNarration ? "dialogue-box__text--narration" : ""}`}>
        {line.text}
      </p>
      <span className="dialogue-box__hint">{isLast ? "▾ continue" : "▾ tap"}</span>
    </button>
  );
}
