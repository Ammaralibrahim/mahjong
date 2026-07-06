"use client";
import { Tile } from "@/domain/types";

export type TileIconSize = "sm" | "md" | "lg";

type TileIconProps = {
  tile: Tile;
  size?: TileIconSize;
  className?: string;
};

const DIMS: Record<TileIconSize, number> = { sm: 48, md: 72, lg: 100 };

function getDims(size: TileIconSize) {
  const w = DIMS[size] ?? DIMS.md;
  const h = Math.round(w * 1.4);
  return { w, h };
}

// ---- Bamboo ----
function BambooTile({ value, size = "md" }: { value: number; size?: TileIconSize }) {
  const { w, h } = getDims(size);
  const colors = ["#2ECC71", "#27AE60", "#229954", "#1E8449", "#196F3D", "#145A32", "#0E4D2A", "#0A3D22", "#072E1A"];
  const color = colors[value - 1] || "#2ECC71";
  return (
    <svg width={w} height={h} viewBox="0 0 100 140" className="drop-shadow-sm">
      <rect x="4" y="4" width="92" height="132" rx="10" fill="#F8F5F0" stroke="#E8E0D6" strokeWidth="1.5"/>
      <rect x="8" y="8" width="84" height="124" rx="7" fill="white" opacity="0.4"/>
      <g transform="translate(50, 68)">
        {value === 1 && <rect x="-12" y="-35" width="24" height="70" rx="12" fill={color} opacity="0.85"/>}
        {value === 2 && (
          <>
            <rect x="-22" y="-38" width="18" height="42" rx="9" fill={color} opacity="0.85"/>
            <rect x="4" y="-4" width="18" height="42" rx="9" fill={color} opacity="0.85"/>
          </>
        )}
        {value === 3 && (
          <>
            <rect x="-28" y="-42" width="14" height="34" rx="7" fill={color} opacity="0.85"/>
            <rect x="-7" y="-8" width="14" height="34" rx="7" fill={color} opacity="0.85"/>
            <rect x="14" y="26" width="14" height="34" rx="7" fill={color} opacity="0.85"/>
          </>
        )}
        {value === 4 && (
          <>
            {[[-24, -38], [-24, 12], [12, -38], [12, 12]].map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x - 7} y={y - 7} width="14" height="28" rx="7" fill={color} opacity="0.85"/>
            ))}
          </>
        )}
        {value >= 5 && [...Array(Math.min(value, 9))].map((_, i) => {
          const row = Math.floor(i / 3), col = i % 3;
          return (
            <rect
              key={i}
              x={(col - 1) * 20 - 6}
              y={(row - 1) * 22 - 8}
              width="12"
              height="16"
              rx="6"
              fill={color}
              opacity="0.85"
            />
          );
        })}
      </g>
      <text x="50" y="126" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5A4E42" opacity="0.5" className="font-mono">
        {value}
      </text>
    </svg>
  );
}

// ---- Dot ----
function DotTile({ value, size = "md" }: { value: number; size?: TileIconSize }) {
  const { w, h } = getDims(size);
  const colors = ["#E74C6F", "#E74C3C", "#D35400", "#E67E22", "#F39C12", "#F1C40F", "#2ECC71", "#1ABC9C", "#3498DB"];
  const color = colors[value - 1] || "#E74C6F";
  return (
    <svg width={w} height={h} viewBox="0 0 100 140" className="drop-shadow-sm">
      <rect x="4" y="4" width="92" height="132" rx="10" fill="#F8F5F0" stroke="#E8E0D6" strokeWidth="1.5"/>
      <rect x="8" y="8" width="84" height="124" rx="7" fill="white" opacity="0.4"/>
      <g transform="translate(50, 65)">
        {value === 1 && <circle cx="0" cy="0" r="16" fill={color} opacity="0.9"/>}
        {value === 2 && (
          <>
            <circle cx="-20" cy="-18" r="13" fill={color} opacity="0.9"/>
            <circle cx="20" cy="18" r="13" fill={color} opacity="0.9"/>
          </>
        )}
        {value === 3 && (
          <>
            <circle cx="-20" cy="-18" r="11" fill={color} opacity="0.9"/>
            <circle cx="0" cy="0" r="11" fill={color} opacity="0.9"/>
            <circle cx="20" cy="18" r="11" fill={color} opacity="0.9"/>
          </>
        )}
        {value === 4 && (
          <>
            {[[-18, -18], [18, -18], [-18, 18], [18, 18]].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="11" fill={color} opacity="0.9"/>
            ))}
          </>
        )}
        {value >= 5 && [...Array(Math.min(value, 9))].map((_, i) => {
          const row = Math.floor(i / 3), col = i % 3;
          return (
            <circle
              key={i}
              cx={(col - 1) * 22}
              cy={(row - 1) * 22}
              r={value > 6 ? 8 : 10}
              fill={color}
              opacity="0.9"
            />
          );
        })}
      </g>
      <text x="50" y="126" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5A4E42" opacity="0.5" className="font-mono">
        {value}
      </text>
    </svg>
  );
}

// ---- Character ----
function CharacterTile({ value, size = "md" }: { value: number; size?: TileIconSize }) {
  const { w, h } = getDims(size);
  const colors = ["#2C3E50", "#34495E", "#2C3E50", "#1A252F", "#2C3E50", "#34495E", "#2C3E50", "#1A252F", "#2C3E50"];
  const chars = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
  return (
    <svg width={w} height={h} viewBox="0 0 100 140" className="drop-shadow-sm">
      <rect x="4" y="4" width="92" height="132" rx="10" fill="#F8F5F0" stroke="#E8E0D6" strokeWidth="1.5"/>
      <rect x="8" y="8" width="84" height="124" rx="7" fill="white" opacity="0.4"/>
      <text x="50" y="80" textAnchor="middle" fontSize="48" fontWeight="600" fill={colors[value - 1]} className="font-serif" style={{ fontFeatureSettings: '"ss01" on' }}>
        {chars[value - 1]}
      </text>
      <text x="50" y="126" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5A4E42" opacity="0.5" className="font-mono">
        {value}
      </text>
    </svg>
  );
}

// ---- Wind ----
function WindTile({ wind, size = "md" }: { wind: string; size?: TileIconSize }) {
  const { w, h } = getDims(size);
  const colors = { east: "#3498DB", south: "#E74C3C", west: "#2ECC71", north: "#9B59B6" };
  const labels = { east: "東", south: "南", west: "西", north: "北" };
  const color = colors[wind as keyof typeof colors] || "#3498DB";
  return (
    <svg width={w} height={h} viewBox="0 0 100 140" className="drop-shadow-sm">
      <rect x="4" y="4" width="92" height="132" rx="10" fill="#F8F5F0" stroke="#E8E0D6" strokeWidth="1.5"/>
      <rect x="8" y="8" width="84" height="124" rx="7" fill="white" opacity="0.4"/>
      <circle cx="50" cy="65" r="26" fill={color} opacity="0.08"/>
      <text x="50" y="80" textAnchor="middle" fontSize="42" fontWeight="600" fill={color} className="font-serif">
        {labels[wind as keyof typeof labels]}
      </text>
      <text x="50" y="122" textAnchor="middle" fontSize="9" fontWeight="600" fill="#8A7A6A" opacity="0.6" className="font-mono tracking-widest">
        {wind.toUpperCase()}
      </text>
    </svg>
  );
}

// ---- Dragon ----
function DragonTile({ dragon, size = "md" }: { dragon: string; size?: TileIconSize }) {
  const { w, h } = getDims(size);
  const colors = { red: "#E74C3F", green: "#2ECC71", white: "#BDC3C7" };
  const labels = { red: "中", green: "発", white: "白" };
  const color = colors[dragon as keyof typeof colors] || "#E74C3F";
  return (
    <svg width={w} height={h} viewBox="0 0 100 140" className="drop-shadow-sm">
      <rect
        x="4" y="4" width="92" height="132" rx="10"
        fill={dragon === "white" ? "#F5F5F5" : "#F8F5F0"}
        stroke="#E8E0D6" strokeWidth="1.5"
      />
      <rect x="8" y="8" width="84" height="124" rx="7" fill="white" opacity={dragon === "white" ? 0.2 : 0.4}/>
      {dragon === "white" ? (
        <rect x="32" y="44" width="36" height="42" rx="5" fill="none" stroke={color} strokeWidth="2.5" opacity="0.7"/>
      ) : (
        <text x="50" y="80" textAnchor="middle" fontSize="46" fontWeight="600" fill={color} className="font-serif">
          {labels[dragon as keyof typeof labels]}
        </text>
      )}
      <text x="50" y="122" textAnchor="middle" fontSize="9" fontWeight="600" fill="#8A7A6A" opacity="0.6" className="font-mono tracking-widest">
        {dragon.toUpperCase()}
      </text>
    </svg>
  );
}

// ---- Main TileIcon ----
export function TileIcon({ tile, size = "md", className = "" }: TileIconProps) {
  const safeSize: TileIconSize = (["sm", "md", "lg"] as const).includes(size) ? size : "md";
  const { w, h } = getDims(safeSize);
  const containerStyle = { width: w, height: h };

  if (tile.category === "number") {
    const [suit, val] = tile.key.split("-");
    const value = parseInt(val, 10);
    const props = { value, size: safeSize };
    switch (suit) {
      case "bamboo": return <div style={containerStyle} className={className}><BambooTile {...props} /></div>;
      case "dot": return <div style={containerStyle} className={className}><DotTile {...props} /></div>;
      case "character": return <div style={containerStyle} className={className}><CharacterTile {...props} /></div>;
      default: return null;
    }
  }
  if (tile.category === "wind") {
    const wind = tile.key.split("-")[1];
    return <div style={containerStyle} className={className}><WindTile wind={wind} size={safeSize} /></div>;
  }
  if (tile.category === "dragon") {
    const dragon = tile.key.split("-")[1];
    return <div style={containerStyle} className={className}><DragonTile dragon={dragon} size={safeSize} /></div>;
  }
  return null;
}