import { Calendar, Database, Bell, Search } from "lucide-react";

/**
 * Composant Topbar - Barre de navigation supérieure avec design premium
 */
export function Topbar({ theme, activeTab, useDemo }) {
  const titles = {
    dashboard: "Vue d'ensemble",
    table: "Liste des candidats",
  };

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      style={{
        height: 80,
        borderBottom: `1px solid ${theme.border}`,
        background: `linear-gradient(180deg, ${theme.bgCard} 0%, ${theme.bgCard}CC 100%)`,
        backdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        position: "sticky",
        top: 0,
        zIndex: 90,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 6,
          }}
        >
          <div
            style={{
              padding: "8px 14px",
              borderRadius: 10,
              background: theme.gradientPrimary,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {activeTab}
            </span>
          </div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: theme.text,
              letterSpacing: "-0.02em",
            }}
          >
            {titles[activeTab] || "Dashboard"}
          </h1>
        </div>
        <div
          style={{
            fontSize: 13,
            color: theme.textMuted,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 500,
          }}
        >
          <Calendar size={14} />
          {formatDate()}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Badge Mode Démo */}
        {useDemo && (
          <div
            style={{
              padding: "8px 16px",
              borderRadius: 24,
              background: `linear-gradient(135deg, ${theme.warning}20, ${theme.warning}10)`,
              border: `1.5px solid ${theme.warning}`,
              fontSize: 12,
              fontWeight: 700,
              color: theme.warning,
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: `0 4px 16px ${theme.warning}30`,
            }}
          >
            <Database size={14} strokeWidth={2.5} />
            MODE DÉMO
          </div>
        )}

        {/* Indicateur de statut */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 16px",
            borderRadius: 12,
            background: theme.bgHover,
            border: `1px solid ${theme.border}`,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: useDemo ? theme.warning : theme.success,
              boxShadow: `0 0 20px ${
                useDemo ? theme.warning : theme.success
              }`,
              animation: "pulse 2s infinite",
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: theme.textSub,
            }}
          >
            {useDemo ? "Démo" : "En ligne"}
          </span>
        </div>

        {/* Bouton de notifications */}
        <button
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: theme.bgHover,
            border: `1px solid ${theme.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = theme.primary;
            e.target.style.background = theme.primaryGlow;
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = theme.border;
            e.target.style.background = theme.bgHover;
          }}
        >
          <Bell size={20} color={theme.textSub} strokeWidth={2} />
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 10,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: theme.danger,
              border: `2px solid ${theme.bgCard}`,
            }}
          />
        </button>

        {/* Avatar utilisateur */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: theme.gradientPrimary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            AD
          </span>
        </div>
      </div>
    </div>
  );
}
