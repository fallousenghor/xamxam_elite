/**
 * Composant Card - Conteneur de base avec style cohérent et design premium
 */
export function Card({ children, className = "", style = {}, noHover = false }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        ...style,
      }}
      className={className}
      onMouseEnter={(e) => {
        if (!noHover) {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "var(--shadow)";
          e.currentTarget.style.borderColor = "var(--primary)";
        }
      }}
      onMouseLeave={(e) => {
        if (!noHover) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "var(--shadow-sm)";
          e.currentTarget.style.borderColor = "var(--border)";
        }
      }}
    >
      {children}
    </div>
  );
}
