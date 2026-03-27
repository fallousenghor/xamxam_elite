import { Layers } from "lucide-react";
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
 * Composant ModePieChart - Graphique en anneau de répartition des modes
 * Design simple et professionnel
 * Couleurs : Vert (En ligne) et Gold (Présentiel)
 */
export function ModePieChart({ data, theme }) {
  // Couleurs spécifiques pour le mode : Vert pour En ligne, Gold pour Présentiel
  const chartColors = [theme.primary, theme.gold];

  return (
    <Card className="fade-4" style={{ minHeight: 340 }}>
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
                background: theme.blue,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Layers size={18} color="#fff" strokeWidth={2.5} />
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
                Répartition mode
              </h3>
              <p
                style={{
                  fontSize: 11,
                  color: theme.textMuted,
                  fontWeight: 500,
                }}
              >
                En ligne vs Présentiel
              </p>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              dataKey="value"
              paddingAngle={5}
              cornerRadius={6}
            >
              {data.map((_, i) => (
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
