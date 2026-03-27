import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
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
  const isPositive = change >= 0;

  return (
    <Card
      className={`fade-${delay}`}
      style={{
        padding: 0,
        position: "relative",
        cursor: "default",
        background: `linear-gradient(135deg, ${color}08 0%, transparent 100%)`,
      }}
    >
      {/* Gradient top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${color}, ${color}CC, ${color}88)`,
          boxShadow: `0 2px 12px ${color}60`,
        }}
      />

      <div
        style={{
          padding: "28px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 20,
          }}
        >
          {/* Icon with gradient background */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: `linear-gradient(135deg, ${color}20, ${color}10)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(135deg, ${color}15, transparent)`,
              }}
            />
            <Icon size={26} color={color} strokeWidth={2.5} style={{ position: "relative", zIndex: 1 }} />
          </div>

          {/* Change indicator */}
          {change && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 20,
                background: isPositive
                  ? `${color}15`
                  : "rgba(239,68,68,0.15)",
                border: `1px solid ${
                  isPositive ? color : "rgba(239,68,68,0.3)"
                }`,
              }}
            >
              {isPositive ? (
                <ArrowUpRight size={16} color={color} strokeWidth={2.5} />
              ) : (
                <ArrowDownRight size={16} color="#EF4444" strokeWidth={2.5} />
              )}
              <span
                style={{
                  fontSize: 13,
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
            fontSize: 36,
            fontWeight: 800,
            color: "var(--text)",
            marginBottom: 6,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          {value}
        </div>

        {/* Label */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "var(--text-sub)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {label}
        </div>

        {/* Decorative gradient */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 120,
            height: 120,
            background: `radial-gradient(circle at center, ${color}10 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      </div>
    </Card>
  );
}
