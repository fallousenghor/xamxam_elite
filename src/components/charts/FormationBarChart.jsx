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
    <Card className="fade-4" style={{ minHeight: 340 }}>
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
                background: `${theme.primary}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BarChart3 size={20} color={theme.primary} strokeWidth={2.5} />
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
                Formations demandées
              </h3>
              <p
                style={{
                  fontSize: 12,
                  color: theme.textMuted,
                  fontWeight: 500,
                }}
              >
                Répartition par formation
              </p>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ bottom: 20, top: 10 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.border}
              vertical={false}
              opacity={0.5}
            />
            <XAxis
              dataKey="name"
              stroke={theme.textMuted}
              tick={{ fontSize: 11, fill: theme.textMuted, fontWeight: 500 }}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis
              stroke={theme.textMuted}
              tick={{ fontSize: 12, fill: theme.textMuted, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={chartColors[i % chartColors.length]}
                  style={{
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
