import type { AvatarOption } from "../content/avatar/avatarOptions";
import "./SwatchPicker.css";

interface SwatchPickerProps {
  label: string;
  options: AvatarOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  /** Swatches render as color circles by default; set false for styles that
   *  aren't naturally a color (kept for future non-color option sets). */
  showAsColor?: boolean;
}

export function SwatchPicker({
  label,
  options,
  selectedId,
  onSelect,
  showAsColor = true,
}: SwatchPickerProps) {
  return (
    <div className="swatch-picker">
      <span className="swatch-picker__label">{label}</span>
      <div className="swatch-picker__row">
        {options.map((opt) => {
          const isSelected = opt.id === selectedId;
          const isEmptyColor = showAsColor && !opt.value;
          return (
            <button
              key={opt.id}
              className={`swatch ${isSelected ? "swatch--selected" : ""} ${
                showAsColor ? "" : "swatch--label"
              }`}
              onClick={() => onSelect(opt.id)}
              aria-label={opt.label}
              aria-pressed={isSelected}
            >
              {showAsColor ? (
                isEmptyColor ? (
                  <span className="swatch__none">✕</span>
                ) : (
                  <span className="swatch__dot" style={{ background: opt.value }} />
                )
              ) : (
                <span className="swatch__text">{opt.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
