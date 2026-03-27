import { TrendingUp } from "lucide-react";
import { Card } from "./Card";

/**
 * Composant StatCard - Affiche une statistique avec icône et indicateur de tendance
 */
export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  color,
  delay = 0,
}) {
  return (
    <Card
      className={`fade-${delay}`}
      style={{
        padding: "24px",
        position: "relative",
        cursor: "default",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: `${color}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={24} color={color} strokeWidth={2.5} />
        </div>
        {change && (
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: change > 0 ? "var(--success)" : "var(--danger)",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <TrendingUp size={14} />
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: "var(--text)",
          marginBottom: 4,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: "var(--text-sub)",
        }}
      >
        {label}
      </div>
    </Card>
  );
}
