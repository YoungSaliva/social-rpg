import "./ChoiceButton.css";

interface ChoiceButtonProps {
  text: string;
  index: number;
  onSelect: () => void;
}

export function ChoiceButton({ text, index, onSelect }: ChoiceButtonProps) {
  return (
    <button
      className="choice-button anim-rise-in"
      style={{ animationDelay: `${index * 70}ms` }}
      onClick={onSelect}
    >
      <span className="choice-button__marker">{String.fromCharCode(65 + index)}</span>
      <span className="choice-button__text">{text}</span>
    </button>
  );
}
