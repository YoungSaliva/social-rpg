import type { PlayerStats } from "../engine/types";
import "./StatBar.css";

interface StatBarProps {
  stats: PlayerStats;
  pulseKey: number;
}

const STAT_META: { key: keyof PlayerStats; label: string; icon: string }[] = [
  { key: "fame", label: "Fame", icon: "★" },
  { key: "followers", label: "Followers", icon: "◎" },
  { key: "cash", label: "Cash", icon: "$" },
  { key: "energy", label: "Energy", icon: "⚡" },
];

/** Small always-visible readout of the player's stats during story scenes. */
export function StatBar({ stats, pulseKey }: StatBarProps) {
  return (
    <div className="stat-bar">
      {STAT_META.map((meta) => (
        <div className="stat-bar__item" key={meta.key + pulseKey}>
          <span className="stat-bar__icon">{meta.icon}</span>
          <span className="stat-bar__value">{stats[meta.key]}</span>
        </div>
      ))}
    </div>
  );
}
