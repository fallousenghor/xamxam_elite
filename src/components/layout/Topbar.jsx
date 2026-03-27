import { Calendar, Database, Bell } from "lucide-react";

/**
 * Composant Topbar - Barre de navigation supérieure avec design simple et professionnel
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
        height: 70,
        borderBottom: `1px solid ${theme.border}`,
        background: theme.bgCard,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        position: "sticky",
        top: 0,
        zIndex: 90,
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 4,
          }}
        >
          <div
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              background: theme.primary,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                fontSize: 10,
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
              fontSize: 22,
              fontWeight: 700,
              color: theme.text,
            }}
          >
            {titles[activeTab] || "Dashboard"}
          </h1>
        </div>
        <div
          style={{
            fontSize: 12,
            color: theme.textMuted,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontWeight: 500,
          }}
        >
          <Calendar size={12} />
          {formatDate()}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Badge Mode Démo */}
        {useDemo && (
          <div
            style={{
              padding: "6px 12px",
              borderRadius: 16,
              background: `${theme.warning}15`,
              border: `1.5px solid ${theme.warning}`,
              fontSize: 11,
              fontWeight: 700,
              color: theme.warning,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Database size={12} strokeWidth={2.5} />
            MODE DÉMO
          </div>
        )}

        {/* Indicateur de statut */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            borderRadius: 8,
            background: theme.bgHover,
            border: `1px solid ${theme.border}`,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: useDemo ? theme.warning : theme.success,
            }}
          />
          <span
            style={{
              fontSize: 11,
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
            width: 38,
            height: 38,
            borderRadius: 8,
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
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = theme.border;
          }}
        >
          <Bell size={18} color={theme.textSub} strokeWidth={2} />
          <div
            style={{
              position: "absolute",
              top: 6,
              right: 8,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: theme.danger,
              border: `2px solid ${theme.bgCard}`,
            }}
          />
        </button>

        {/* Avatar utilisateur */}
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 8,
            background: theme.gold,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontSize: 14,
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
