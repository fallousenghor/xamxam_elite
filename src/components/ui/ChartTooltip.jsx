/**
 * Composant ChartTooltip - Tooltip personnalisé pour les graphiques
 */
export function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "10px 14px",
        boxShadow: "var(--shadow)",
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          marginBottom: 4,
        }}
      >
        {payload[0].payload.name || payload[0].name}
      </div>
      {payload.map((p, i) => (
        <div
          key={i}
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: p.color,
          }}
        >
          {p.value} candidat{p.value > 1 ? "s" : ""}
        </div>
      ))}
    </div>
  );
}
