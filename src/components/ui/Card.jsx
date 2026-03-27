/**
 * Composant Card - Conteneur de base avec style cohérent
 */
export function Card({ children, className = "", style = {} }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden",
        transition: "all 0.2s",
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
}
