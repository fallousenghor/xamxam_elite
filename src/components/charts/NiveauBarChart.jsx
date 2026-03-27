import { BookOpen } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card } from "../ui/Card";
import { ChartTooltip } from "../ui/ChartTooltip";

/**
 * Composant NiveauDonutChart - Graphique en anneau des niveaux d'études
 * Design simple et professionnel
 * Utilise les couleurs de l'entreprise : Vert, Gold, Bleu
 */
export function NiveauDonutChart({ data, theme }) {
  // Couleurs variées pour les niveaux
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
            marginBottom: 16,
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
                background: theme.gold,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BookOpen size={18} color="#fff" strokeWidth={2.5} />
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
                Niveau d'études
              </h3>
              <p
                style={{
                  fontSize: 11,
                  color: theme.textMuted,
                  fontWeight: 500,
                }}
              >
                Répartition par niveau
              </p>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              dataKey="value"
              paddingAngle={4}
              cornerRadius={6}
            >
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={chartColors[i % chartColors.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
            <Legend
              formatter={(v) => (
                <span style={{ color: theme.textSub, fontSize: 12, fontWeight: 500 }}>
                  {v}
                </span>
              )}
              wrapperStyle={{ paddingTop: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
