import { Calendar, Database } from "lucide-react";

/**
 * Composant Topbar - Barre de navigation supérieure
 */
export function Topbar({ theme, activeTab, useDemo }) {
  const titles = {
    dashboard: "Vue d'ensemble",
    table: "Liste des candidats",
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
        <h1
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: theme.text,
            marginBottom: 2,
          }}
        >
          {titles[activeTab] || "Dashboard"}
        </h1>
        <div
          style={{
            fontSize: 13,
            color: theme.textMuted,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Calendar size={14} />
          {new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {useDemo && (
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              background: `${theme.warning}18`,
              border: `1px solid ${theme.warning}`,
              fontSize: 12,
              fontWeight: 600,
              color: theme.warning,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Database size={14} />
            MODE DÉMO
          </div>
        )}
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: useDemo ? theme.warning : theme.success,
            boxShadow: `0 0 12px ${
              useDemo ? theme.warning : theme.success
            }`,
            animation: "pulse 2s infinite",
          }}
        />
      </div>
    </div>
  );
}
