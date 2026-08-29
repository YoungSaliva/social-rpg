import { GameProvider, useGame } from "./engine/GameContext";
import { StartScreen } from "./ui/screens/StartScreen";
import { CharacterCreationScreen } from "./ui/screens/CharacterCreationScreen";
import { StoryScreen } from "./ui/screens/StoryScreen";

function Router() {
  const { screen } = useGame();

  switch (screen) {
    case "character-creation":
      return <CharacterCreationScreen />;
    case "story":
      return <StoryScreen />;
    case "start":
    default:
      return <StartScreen />;
  }
}

export default function App() {
  return (
    <GameProvider>
      <div className="app-shell">
        <Router />
      </div>
    </GameProvider>
  );
}
