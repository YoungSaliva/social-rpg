import type { AvatarConfig } from "../engine/types";
import {
  accessoryOptions,
  bottomOptions,
  findOption,
  hairColorOptions,
  shoeOptions,
  skinToneOptions,
  topOptions,
} from "../content/avatar/avatarOptions";

interface AvatarRendererProps {
  avatar: AvatarConfig;
  size?: number;
  className?: string;
}

/**
 * Renders the player's avatar from layered shapes as a placeholder.
 * This is the ONLY place that needs to change to swap in illustrated or
 * licensed artwork later — it can be rewritten to render <image> layers
 * from an asset registry keyed by the same option ids, while every caller
 * (character creation, HUD, press pass) stays untouched.
 */
export function AvatarRenderer({ avatar, size = 160, className }: AvatarRendererProps) {
  const skin = findOption(skinToneOptions, avatar.skinTone).value;
  const hairColor = findOption(hairColorOptions, avatar.hairColor).value;
  const hairStyle = avatar.hairStyle;
  const top = findOption(topOptions, avatar.top).value;
  const bottom = findOption(bottomOptions, avatar.bottom).value;
  const shoes = findOption(shoeOptions, avatar.shoes).value;
  const accessory = avatar.accessory
    ? findOption(accessoryOptions, avatar.accessory).value
    : "";

  return (
    <svg
      className={className}
      viewBox="0 0 200 260"
      width={size}
      height={size * 1.3}
      role="img"
      aria-label="Character avatar"
    >
      {/* shoes */}
      <rect x="66" y="224" width="24" height="16" rx="4" fill={shoes} />
      <rect x="110" y="224" width="24" height="16" rx="4" fill={shoes} />

      {/* bottom */}
      <path d="M64 158 L64 230 L94 230 L98 176 L102 176 L106 230 L136 230 L136 158 Z" fill={bottom} />

      {/* top */}
      <path
        d="M60 96 C60 84 74 76 100 76 C126 76 140 84 140 96 L146 160 L54 160 Z"
        fill={top}
      />
      {/* arms */}
      <rect x="42" y="98" width="18" height="58" rx="9" fill={top} />
      <rect x="140" y="98" width="18" height="58" rx="9" fill={top} />
      <circle cx="51" cy="160" r="9" fill={skin} />
      <circle cx="149" cy="160" r="9" fill={skin} />

      {/* neck + head */}
      <rect x="90" y="66" width="20" height="18" fill={skin} />
      <circle cx="100" cy="46" r="34" fill={skin} />

      {/* hair back layer for long styles */}
      {(hairStyle === "long" || hairStyle === "curls") && (
        <path d="M64 40 C60 80 66 108 78 118 L72 70 C72 50 78 38 64 40 Z" fill={hairColor} />
      )}
      {(hairStyle === "long" || hairStyle === "curls") && (
        <path d="M136 40 C140 80 134 108 122 118 L128 70 C128 50 122 38 136 40 Z" fill={hairColor} />
      )}

      {/* hair front layer */}
      {hairStyle === "buzz" && (
        <path d="M66 34 C66 12 134 12 134 34 C134 24 66 24 66 34 Z" fill={hairColor} />
      )}
      {hairStyle === "bob" && (
        <path
          d="M62 46 C58 14 142 14 138 46 C138 30 128 22 100 22 C72 22 62 30 62 46 Z"
          fill={hairColor}
        />
      )}
      {hairStyle === "long" && (
        <path
          d="M60 44 C56 10 144 10 140 44 C140 26 128 18 100 18 C72 18 60 26 60 44 Z"
          fill={hairColor}
        />
      )}
      {hairStyle === "curls" && (
        <>
          <circle cx="72" cy="26" r="14" fill={hairColor} />
          <circle cx="94" cy="18" r="15" fill={hairColor} />
          <circle cx="118" cy="20" r="14" fill={hairColor} />
          <circle cx="134" cy="32" r="13" fill={hairColor} />
        </>
      )}
      {hairStyle === "bun" && (
        <>
          <path
            d="M62 46 C58 16 142 16 138 46 C138 30 128 22 100 22 C72 22 62 30 62 46 Z"
            fill={hairColor}
          />
          <circle cx="100" cy="12" r="12" fill={hairColor} />
        </>
      )}

      {/* face */}
      <circle cx="88" cy="48" r="3.4" fill="#2b1329" />
      <circle cx="112" cy="48" r="3.4" fill="#2b1329" />
      <path d="M92 60 Q100 66 108 60" stroke="#2b1329" strokeWidth="2.4" fill="none" strokeLinecap="round" />

      {/* accessory */}
      {avatar.accessory === "acc-earrings" && (
        <>
          <circle cx="66" cy="54" r="3" fill={accessory} />
          <circle cx="134" cy="54" r="3" fill={accessory} />
        </>
      )}
      {avatar.accessory === "acc-glasses" && (
        <>
          <circle cx="88" cy="48" r="10" fill="none" stroke={accessory} strokeWidth="3" />
          <circle cx="112" cy="48" r="10" fill="none" stroke={accessory} strokeWidth="3" />
          <line x1="98" y1="48" x2="102" y2="48" stroke={accessory} strokeWidth="3" />
        </>
      )}
      {avatar.accessory === "acc-choker" && (
        <rect x="86" y="78" width="28" height="5" rx="2.5" fill={accessory} />
      )}
    </svg>
  );
}
