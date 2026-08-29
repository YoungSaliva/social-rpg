import type { LocationDefinition } from "../engine/types";

/** All locations available to content authors. `backdrop` is a placeholder
 *  CSS gradient — swap in an illustrated background image later by changing
 *  this value to `url(...)`; nothing else in the engine needs to change. */
export const locationRegistry: Record<string, LocationDefinition> = {
  "corner-cafe": {
    id: "corner-cafe",
    name: "The Corner Café",
    backdrop: "linear-gradient(160deg, #3a1a37 0%, #57244f 55%, #7a3159 100%)",
  },
  "cafe-backroom": {
    id: "cafe-backroom",
    name: "Café Backroom",
    backdrop: "linear-gradient(160deg, #241220 0%, #3a1a37 100%)",
  },
  "night-street": {
    id: "night-street",
    name: "Night Street",
    backdrop: "linear-gradient(160deg, #1c0f22 0%, #33184a 60%, #4a2360 100%)",
  },
};
