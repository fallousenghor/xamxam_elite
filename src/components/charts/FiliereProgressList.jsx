import { TrendingUp } from "lucide-react";
import { Card } from "../ui/Card";

/**
 * Composant FiliereProgressList - Liste des top filières avec barres de progression
 */
export function FiliereProgressList({ data, total, theme }) {
  const chartColors = [
    theme.chart1,
    theme.chart2,
    theme.chart3,
    theme.chart4,
    theme.chart5,
  ];

  return (
    <Card className="fade-5" style={{ minHeight: 320 }}>
      <div style={{ padding: "24px 28px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: `${theme.success}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUp size={20} color={theme.success} strokeWidth={2.5} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: theme.text,
                  marginBottom: 2,
                }}
              >
                Top filières
              </h3>
              <p
                style={{
                  fontSize: 12,
                  color: theme.textMuted,
                  fontWeight: 500,
                }}
              >
                Les plus populaires
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {data.map((item, i) => {
            const pct = Math.round((item.value / total) * 100);
            const color = chartColors[i % chartColors.length];

            return (
              <div key={item.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: theme.textSub,
                    }}
                  >
                    {item.name}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color,
                      }}
                    >
                      {item.value}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: theme.textMuted,
                        padding: "4px 10px",
                        borderRadius: 6,
                        background: `${color}15`,
                        border: `1px solid ${color}30`,
                      }}
                    >
                      {pct}%
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    height: 10,
                    background: theme.border,
                    borderRadius: 5,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: `linear-gradient(90deg, ${color}CC, ${color})`,
                      transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
                      borderRadius: 5,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)",
                        borderRadius: 5,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
