import { useState } from "react";
import { useGame } from "../../engine/GameContext";
import { locationRegistry } from "../../content/locations";
import { DialogueBox } from "../../components/DialogueBox";
import { ChoiceButton } from "../../components/ChoiceButton";
import { StatBar } from "../../components/StatBar";
import { EffectToast } from "../../components/EffectToast";
import { PressPassBadge } from "../../components/PressPassBadge";
import "./StoryScreen.css";

export function StoryScreen() {
  const {
    player,
    currentScene,
    lineIndex,
    advanceLine,
    makeChoice,
    advanceScene,
    lastEffectSummary,
    clearEffectSummary,
    restart,
  } = useGame();
  const [statPulse, setStatPulse] = useState(0);

  if (!player || !currentScene) {
    return (
      <div className="story-screen story-screen--empty">
        <p>Something went off script.</p>
        <button onClick={restart}>Back to title</button>
      </div>
    );
  }

  const location = locationRegistry[currentScene.locationId];
  const visibleLine = currentScene.lines[Math.min(lineIndex, currentScene.lines.length - 1)];
  const allLinesShown = lineIndex >= currentScene.lines.length - 1 || currentScene.lines.length === 0;
  const showChoices = allLinesShown && !!currentScene.choices?.length;
  const showContinue = allLinesShown && !currentScene.choices?.length && !!currentScene.nextSceneId;
  const isChapterEnd = allLinesShown && !currentScene.choices?.length && !currentScene.nextSceneId;

  const handleTapLine = () => {
    if (lineIndex < currentScene.lines.length - 1) {
      advanceLine();
    }
  };

  const handleChoice = (choiceId: string) => {
    setStatPulse((n) => n + 1);
    makeChoice(choiceId);
  };

  return (
    <div className="story-screen" style={{ background: location?.backdrop }}>
      <div className="story-screen__scrim" aria-hidden="true" />

      <header className="story-screen__hud">
        <PressPassBadge name={player.name} username={player.username} avatar={player.avatar} compact />
        <StatBar stats={player.stats} pulseKey={statPulse} />
      </header>

      <EffectToast items={lastEffectSummary} onDone={clearEffectSummary} />

      <div className="story-screen__location-tag anim-fade-in" key={currentScene.id}>
        {location?.name}
      </div>

      <div className="story-screen__stage">
        {visibleLine && !showChoices && (
          <DialogueBox
            key={visibleLine.id}
            line={visibleLine}
            onTap={showContinue || isChapterEnd ? () => {} : handleTapLine}
            isLast={allLinesShown}
          />
        )}
        {visibleLine && showChoices && (
          <DialogueBox key={visibleLine.id} line={visibleLine} onTap={() => {}} isLast />
        )}

        {showContinue && (
          <button className="story-screen__continue anim-rise-in" onClick={advanceScene}>
            Continue →
          </button>
        )}

        {showChoices && (
          <div className="story-screen__choices">
            {currentScene.choices!.map((choice, i) => (
              <ChoiceButton
                key={choice.id}
                index={i}
                text={choice.text}
                onSelect={() => handleChoice(choice.id)}
              />
            ))}
          </div>
        )}

        {isChapterEnd && (
          <button className="story-screen__continue anim-rise-in" onClick={restart}>
            Return to Title
          </button>
        )}
      </div>
    </div>
  );
}
