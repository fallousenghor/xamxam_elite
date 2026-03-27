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
    <Card className="fade-4">
      <div style={{ padding: "24px 28px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <Layers size={20} color={theme.purple} strokeWidth={2.5} />
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: theme.text,
            }}
          >
            Répartition mode
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              dataKey="value"
              paddingAngle={4}
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
                <span style={{ color: theme.textSub, fontSize: 13 }}>
                  {v}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
