import { useEffect } from "react";
import "./EffectToast.css";

interface EffectToastProps {
  items: string[];
  onDone: () => void;
}

export function EffectToast({ items, onDone }: EffectToastProps) {
  useEffect(() => {
    if (items.length === 0) return;
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [items, onDone]);

  if (items.length === 0) return null;

  return (
    <div className="effect-toast anim-pop-in">
      {items.map((item) => (
        <span className="effect-toast__chip" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}
