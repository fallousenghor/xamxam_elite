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
 * Design simple et professionnel
 * Utilise les couleurs de l'entreprise : Vert, Gold, Bleu
 */
export function FormationBarChart({ data, theme }) {
  // Couleurs variées pour les formations
  const chartColors = [
    theme.primary,   // Vert sombre
    theme.gold,      // Gold
    theme.blue,      // Bleu
    theme.chart4,    // Vert moyen
    theme.chart5,    // Bleu foncé
  ];

  return (
    <Card className="fade-4" style={{ minHeight: 340 }}>
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
                background: theme.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BarChart3 size={18} color="#fff" strokeWidth={2.5} />
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
                Formations demandées
              </h3>
              <p
                style={{
                  fontSize: 11,
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
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
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
