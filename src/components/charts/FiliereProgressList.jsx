import { TrendingUp } from "lucide-react";
import { Card } from "../ui/Card";

/**
 * Composant FiliereProgressList - Liste des top filières avec barres de progression
 * Design simple et professionnel
 * Utilise les couleurs de l'entreprise : Vert, Gold, Bleu
 */
export function FiliereProgressList({ data, total, theme }) {
  // Couleurs variées pour les filières
  const chartColors = [
    theme.primary,   // Vert sombre
    theme.gold,      // Gold
    theme.blue,      // Bleu
    theme.chart4,    // Vert moyen
    theme.chart5,    // Bleu foncé
  ];

  return (
    <Card className="fade-5" style={{ minHeight: 320 }}>
      <div style={{ padding: "20px 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: theme.success,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUp size={18} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: theme.text,
                  marginBottom: 2,
                }}
              >
                Top filières
              </h3>
              <p
                style={{
                  fontSize: 11,
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
            gap: 18,
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
                      fontSize: 13,
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
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color,
                      }}
                    >
                      {item.value}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: theme.textMuted,
                        padding: "3px 8px",
                        borderRadius: 4,
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
                      background: color,
                      transition: "width 0.8s ease",
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
