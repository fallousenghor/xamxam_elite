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
 */
export function ModePieChart({ data, theme }) {
  const chartColors = [theme.primary, theme.success, theme.warning];

  return (
    <Card className="fade-4" style={{ minHeight: 340 }}>
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
                background: `${theme.purple}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Layers size={20} color={theme.purple} strokeWidth={2.5} />
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
                Répartition mode
              </h3>
              <p
                style={{
                  fontSize: 12,
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
              cornerRadius={8}
            >
              {data.map((_, i) => (
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
