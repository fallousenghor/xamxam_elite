/**
 * Composant Card - Conteneur de base avec style simple et professionnel
 */
export function Card({ children, className = "", style = {}, noHover = false }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden",
        transition: "all 0.2s ease",
        position: "relative",
        ...style,
      }}
      className={className}
      onMouseEnter={(e) => {
        if (!noHover) {
          e.currentTarget.style.boxShadow = "var(--shadow)";
        }
      }}
      onMouseLeave={(e) => {
        if (!noHover) {
          e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        }
      }}
    >
      {children}
    </div>
  );
}
