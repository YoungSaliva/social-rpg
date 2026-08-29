import { useState } from "react";
import type { AvatarConfig } from "../../engine/types";
import { useGame } from "../../engine/GameContext";
import { defaultAvatar } from "../../engine/playerFactory";
import { AvatarRenderer } from "../../components/AvatarRenderer";
import { SwatchPicker } from "../../components/SwatchPicker";
import { ScreenTransition } from "../../components/ScreenTransition";
import {
  accessoryOptions,
  bottomOptions,
  hairColorOptions,
  hairStyleOptions,
  shoeOptions,
  skinToneOptions,
  topOptions,
} from "../../content/avatar/avatarOptions";
import "./CharacterCreationScreen.css";

export function CharacterCreationScreen() {
  const { confirmCharacter, goToStart } = useGame();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState<AvatarConfig>(defaultAvatar);

  const updateAvatar = (key: keyof AvatarConfig, value: string) =>
    setAvatar((prev) => ({ ...prev, [key]: value }));

  const canConfirm = name.trim().length > 0 && username.trim().length > 0;

  return (
    <ScreenTransition transitionKey="character-creation" className="cc-screen">
      <header className="cc-screen__header">
        <button className="cc-screen__back" onClick={goToStart} aria-label="Back">
          ←
        </button>
        <span className="cc-screen__title">Build Your Character</span>
        <span style={{ width: 24 }} />
      </header>

      <div className="cc-screen__preview anim-pop-in">
        <AvatarRenderer avatar={avatar} size={132} />
      </div>

      <div className="cc-screen__fields">
        <label className="cc-field">
          <span className="cc-field__label">Name</span>
          <input
            className="cc-field__input"
            value={name}
            maxLength={24}
            placeholder="What people call you"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="cc-field">
          <span className="cc-field__label">Username</span>
          <div className="cc-field__input cc-field__input--username">
            <span className="cc-field__at">@</span>
            <input
              className="cc-field__inline-input"
              value={username}
              maxLength={20}
              placeholder="handle"
              onChange={(e) =>
                setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase())
              }
            />
          </div>
        </label>
      </div>

      <div className="cc-screen__customizer">
        <SwatchPicker
          label="Skin Tone"
          options={skinToneOptions}
          selectedId={avatar.skinTone}
          onSelect={(id) => updateAvatar("skinTone", id)}
        />
        <SwatchPicker
          label="Hairstyle"
          options={hairStyleOptions}
          selectedId={avatar.hairStyle}
          onSelect={(id) => updateAvatar("hairStyle", id)}
          showAsColor={false}
        />
        <SwatchPicker
          label="Hair Color"
          options={hairColorOptions}
          selectedId={avatar.hairColor}
          onSelect={(id) => updateAvatar("hairColor", id)}
        />
        <SwatchPicker
          label="Top"
          options={topOptions}
          selectedId={avatar.top}
          onSelect={(id) => updateAvatar("top", id)}
        />
        <SwatchPicker
          label="Bottom"
          options={bottomOptions}
          selectedId={avatar.bottom}
          onSelect={(id) => updateAvatar("bottom", id)}
        />
        <SwatchPicker
          label="Shoes"
          options={shoeOptions}
          selectedId={avatar.shoes}
          onSelect={(id) => updateAvatar("shoes", id)}
        />
        <SwatchPicker
          label="Accessory"
          options={accessoryOptions}
          selectedId={avatar.accessory ?? "acc-none"}
          onSelect={(id) => updateAvatar("accessory", id)}
        />
      </div>

      <button
        className="cc-screen__confirm"
        disabled={!canConfirm}
        onClick={() => confirmCharacter(name.trim(), username.trim(), avatar)}
      >
        Confirm Character
      </button>
    </ScreenTransition>
  );
}
