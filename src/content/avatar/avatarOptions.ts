// ============================================================================
// AVATAR OPTIONS
// Defines the selectable value for each avatar layer. Right now every value
// resolves to a color/shape used by the placeholder SVG renderer
// (see components/AvatarRenderer.tsx). To swap in licensed/illustrated art
// later, change `AvatarRenderer` to resolve these same ids to image assets —
// content data and character-creation UI do not need to change.
// ============================================================================

export interface AvatarOption {
  id: string;
  label: string;
  /** Placeholder swatch/value. Interpreted by AvatarRenderer today as a
   *  color; can be repointed to an asset path later. */
  value: string;
}

export const skinToneOptions: AvatarOption[] = [
  { id: "skin-01", label: "Porcelain", value: "#f2d3bd" },
  { id: "skin-02", label: "Sand", value: "#e0ac7f" },
  { id: "skin-03", label: "Amber", value: "#c17f4f" },
  { id: "skin-04", label: "Umber", value: "#8a5330" },
  { id: "skin-05", label: "Espresso", value: "#5a3520" },
];

export const hairStyleOptions: AvatarOption[] = [
  { id: "hair-bob", label: "Bob", value: "bob" },
  { id: "hair-long", label: "Long Waves", value: "long" },
  { id: "hair-curls", label: "Curls", value: "curls" },
  { id: "hair-buzz", label: "Buzz", value: "buzz" },
  { id: "hair-bun", label: "Top Bun", value: "bun" },
];

export const hairColorOptions: AvatarOption[] = [
  { id: "hair-black", label: "Jet Black", value: "#231a1e" },
  { id: "hair-brown", label: "Espresso Brown", value: "#5a3a28" },
  { id: "hair-blonde", label: "Honey Blonde", value: "#d9a962" },
  { id: "hair-coral", label: "Coral", value: "#ff5c8a" },
  { id: "hair-silver", label: "Silver", value: "#c8c3cc" },
];

export const topOptions: AvatarOption[] = [
  { id: "top-tee", label: "Café Tee", value: "#e0e6df" },
  { id: "top-hoodie", label: "Oversized Hoodie", value: "#6f7bab" },
  { id: "top-blouse", label: "Satin Blouse", value: "#f2c14e" },
  { id: "top-jacket", label: "Denim Jacket", value: "#5c7a9e" },
];

export const bottomOptions: AvatarOption[] = [
  { id: "bottom-jeans", label: "Jeans", value: "#3c5375" },
  { id: "bottom-skirt", label: "Pleated Skirt", value: "#8a4c6c" },
  { id: "bottom-cargo", label: "Cargo Pants", value: "#5c6650" },
  { id: "bottom-joggers", label: "Joggers", value: "#4a4550" },
];

export const shoeOptions: AvatarOption[] = [
  { id: "shoes-sneakers", label: "Sneakers", value: "#f6eee7" },
  { id: "shoes-boots", label: "Boots", value: "#3c2a1e" },
  { id: "shoes-heels", label: "Heels", value: "#c4344a" },
];

export const accessoryOptions: AvatarOption[] = [
  { id: "acc-none", label: "None", value: "" },
  { id: "acc-earrings", label: "Hoop Earrings", value: "#f2c14e" },
  { id: "acc-glasses", label: "Round Glasses", value: "#2b1329" },
  { id: "acc-choker", label: "Choker", value: "#231a1e" },
];

export function findOption(options: AvatarOption[], id: string): AvatarOption {
  return options.find((o) => o.id === id) ?? options[0];
}
