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
 */
export function NiveauDonutChart({ data, theme }) {
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
            marginBottom: 20,
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
                background: `${theme.cyan}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BookOpen size={20} color={theme.cyan} strokeWidth={2.5} />
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
                Niveau d'études
              </h3>
              <p
                style={{
                  fontSize: 12,
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
                  style={{
                    filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
            <Legend
              formatter={(v) => (
                <span style={{ color: theme.textSub, fontSize: 13, fontWeight: 500 }}>
                  {v}
                </span>
              )}
              wrapperStyle={{ paddingTop: 16 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
