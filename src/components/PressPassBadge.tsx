import type { AvatarConfig, PlayerStats } from "../engine/types";
import { AvatarRenderer } from "./AvatarRenderer";
import "./PressPassBadge.css";

interface PressPassBadgeProps {
  name: string;
  username: string;
  avatar: AvatarConfig;
  stats?: PlayerStats;
  compact?: boolean;
}

/** The recurring "all-access pass" motif: character identity presented like
 *  a laminated backstage badge. Used at character-creation confirm and as
 *  the in-story HUD, so the fame/career theme reads visually everywhere. */
export function PressPassBadge({ name, username, avatar, stats, compact }: PressPassBadgeProps) {
  return (
    <div className={`press-pass ${compact ? "press-pass--compact" : ""}`}>
      <div className="press-pass__hole" aria-hidden="true" />
      <div className="press-pass__header">
        <span className="press-pass__eyebrow">ALL ACCESS</span>
        <span className="press-pass__eyebrow">NO. 001</span>
      </div>
      <div className="press-pass__body">
        <div className="press-pass__portrait">
          <AvatarRenderer avatar={avatar} size={compact ? 56 : 92} />
        </div>
        <div className="press-pass__id">
          <span className="press-pass__name">{name || "Unnamed"}</span>
          <span className="press-pass__username">@{username || "handle"}</span>
        </div>
      </div>
      {stats && !compact && (
        <div className="press-pass__stats">
          <StatChip label="Fame" value={stats.fame} />
          <StatChip label="Followers" value={stats.followers} />
          <StatChip label="Cash" value={`$${stats.cash}`} />
          <StatChip label="Energy" value={stats.energy} />
        </div>
      )}
      <div className="press-pass__perforation" aria-hidden="true" />
    </div>
  );
}

function StatChip({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="stat-chip">
      <span className="stat-chip__value">{value}</span>
      <span className="stat-chip__label">{label}</span>
    </div>
  );
}
