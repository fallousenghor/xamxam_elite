import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "./Card";

/**
 * Composant StatCard - Affiche une statistique avec icône et indicateur de tendance
 * Design simple et professionnel
 */
export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  color,
  delay = 0,
}) {
  const isPositive = change >= 0;

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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        {/* Icon avec couleur solide */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 10,
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={24} color="#fff" strokeWidth={2.5} />
        </div>

        {/* Change indicator */}
        {change && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 10px",
              borderRadius: 12,
              background: isPositive
                ? `${color}15`
                : "rgba(239,68,68,0.15)",
              border: `1px solid ${
                isPositive ? color : "rgba(239,68,68,0.3)"
              }`,
            }}
          >
            {isPositive ? (
              <ArrowUpRight size={14} color={color} strokeWidth={2.5} />
            ) : (
              <ArrowDownRight size={14} color="#EF4444" strokeWidth={2.5} />
            )}
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: isPositive ? color : "#EF4444",
              }}
            >
              {Math.abs(change)}%
            </span>
          </div>
        )}
      </div>

      {/* Value */}
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "var(--text)",
          marginBottom: 6,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </div>

      {/* Label */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "var(--text-sub)",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {label}
      </div>
    </Card>
  );
}
