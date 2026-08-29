import { useGame } from "../../engine/GameContext";
import { ScreenTransition } from "../../components/ScreenTransition";
import "./StartScreen.css";

export function StartScreen() {
  const { goToCharacterCreation, continueSavedGame, hasSaveAvailable } = useGame();

  return (
    <ScreenTransition transitionKey="start" className="start-screen">
      <div className="start-screen__glow" aria-hidden="true" />
      <div className="start-screen__mark anim-pop-in">
        <svg viewBox="0 0 48 48" width="46" height="46">
          <path
            d="M24 4 L28.6 17.4 L42.8 17.4 L31.4 25.8 L35.6 39.2 L24 30.4 L12.4 39.2 L16.6 25.8 L5.2 17.4 L19.4 17.4 Z"
            fill="var(--color-gold)"
          />
        </svg>
      </div>

      <div className="start-screen__titles anim-rise-in">
        <span className="start-screen__eyebrow">A SOCIAL-LIFE RPG</span>
        <h1 className="start-screen__title">Rising Star</h1>
        <p className="start-screen__subtitle">
          Your name in lights hasn't been written yet. Start behind the counter.
        </p>
      </div>

      <div className="start-screen__actions anim-rise-in" style={{ animationDelay: "120ms" }}>
        <button className="start-screen__cta" onClick={goToCharacterCreation}>
          New Game
        </button>
        {hasSaveAvailable && (
          <button className="start-screen__secondary" onClick={continueSavedGame}>
            Continue
          </button>
        )}
      </div>

      <p className="start-screen__footnote">Chapter 1 · First Shift</p>
    </ScreenTransition>
  );
}
