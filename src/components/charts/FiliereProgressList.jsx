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
    <Card className="fade-5">
      <div style={{ padding: "24px 28px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <TrendingUp size={20} color={theme.success} strokeWidth={2.5} />
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: theme.text,
            }}
          >
            Top filières
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
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
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: theme.textSub,
                    }}
                  >
                    {item.name}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color,
                      }}
                    >
                      {item.value}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        color: theme.textMuted,
                      }}
                    >
                      {pct}%
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    height: 8,
                    background: theme.border,
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: `linear-gradient(90deg, ${color}88, ${color})`,
                      transition: "width 1s ease",
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
