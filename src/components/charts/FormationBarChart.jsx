import { BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";
import { Card } from "../ui/Card";
import { ChartTooltip } from "../ui/ChartTooltip";

/**
 * Composant FormationBarChart - Graphique en barres verticales des formations demandées
 */
export function FormationBarChart({ data, theme }) {
  const chartColors = [
    theme.chart1,
    theme.chart2,
    theme.chart3,
    theme.chart4,
    theme.chart5,
  ];

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
          <BarChart3 size={20} color={theme.primary} strokeWidth={2.5} />
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: theme.text,
            }}
          >
            Formations demandées
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ bottom: 20, top: 10 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.border}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke={theme.textMuted}
              tick={{ fontSize: 11, fill: theme.textMuted }}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis
              stroke={theme.textMuted}
              tick={{ fontSize: 12, fill: theme.textMuted }}
            />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={chartColors[i % chartColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
