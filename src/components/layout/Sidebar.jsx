import * as Icons from "lucide-react";
import { NAVIGATION_ITEMS, DATA_SOURCE_OPTIONS } from "../../config/constants";

/**
 * Composant Sidebar - Navigation latérale avec design simple et professionnel
 */
export function Sidebar({
  theme,
  darkMode,
  toggleTheme,
  activeTab,
  onTabChange,
  useDemo,
  onDataSourceChange,
  filteredCount,
  totalCount,
}) {
  const getIcon = (iconName) => Icons[iconName];

  return (
    <div
      style={{
        width: 260,
        background: theme.bgSidebar,
        borderRight: `1px solid ${theme.border}`,
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        height: "100vh",
        zIndex: 100,
      }}
    >
      {/* Logo simple et professionnel */}
      <div style={{ padding: "24px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 14px",
            borderRadius: 10,
            background: theme.primary,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icons.GraduationCap size={22} color="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Xam Xam Elite
            </div>
            <div
              style={{
                fontSize: 9,
                color: "rgba(255,255,255,0.85)",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Dashboard
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: theme.border,
          margin: "0 16px",
        }}
      />

      {/* Navigation */}
      <nav style={{ padding: "20px 12px", flex: 1 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: theme.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 12,
            paddingLeft: 12,
          }}
        >
          Menu
        </div>
        {NAVIGATION_ITEMS.map(({ id, label, icon }) => {
          const Icon = getIcon(icon);
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                border: "none",
                background: isActive ? theme.primary : "transparent",
                color: isActive ? "#fff" : theme.textSub,
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                transition: "all 0.2s ease",
                marginBottom: 4,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.background = theme.bgHover;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.background = "transparent";
                }
              }}
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </button>
          );
        })}

        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: theme.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginTop: 28,
            marginBottom: 12,
            paddingLeft: 12,
          }}
        >
          Données
        </div>
        {DATA_SOURCE_OPTIONS.map(({ label, value, icon }) => {
          const Icon = getIcon(icon);
          const isActive = useDemo === value;
          return (
            <button
              key={label}
              onClick={() => onDataSourceChange(value)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                border: `1.5px solid ${
                  isActive ? theme.primary : theme.border
                }`,
                background: isActive ? `${theme.primary}10` : "transparent",
                color: isActive ? theme.primary : theme.textMuted,
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.2s",
                marginBottom: 6,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.borderColor = theme.primary;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.borderColor = theme.border;
                }
              }}
            >
              <Icon size={15} strokeWidth={2} />
              {label}
              {isActive && (
                <Icons.CheckCircle
                  size={15}
                  style={{ marginLeft: "auto" }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Sidebar avec stats */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: `1px solid ${theme.border}`,
          background: theme.bgHover,
        }}
      >
        {/* Stats rapides */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              padding: 10,
              borderRadius: 8,
              background: theme.bgCard,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: theme.textMuted,
                fontWeight: 600,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Total
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: theme.primary,
              }}
            >
              {totalCount}
            </div>
          </div>
          <div
            style={{
              padding: 10,
              borderRadius: 8,
              background: theme.bgCard,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: theme.textMuted,
                fontWeight: 600,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Filtrés
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: theme.success,
              }}
            >
              {filteredCount}
            </div>
          </div>
        </div>

        {/* Toggle Theme */}
        <button
          onClick={toggleTheme}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 14px",
            borderRadius: 8,
            background: theme.bgCard,
            border: `1px solid ${theme.border}`,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = theme.primary;
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = theme.border;
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: darkMode ? theme.primary : theme.gold,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {darkMode ? (
                <Icons.Moon size={16} color="#fff" />
              ) : (
                <Icons.Sun size={16} color="#fff" />
              )}
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: theme.text,
              }}
            >
              {darkMode ? "Mode sombre" : "Mode clair"}
            </span>
          </div>
          <div
            style={{
              width: 40,
              height: 22,
              borderRadius: 11,
              background: darkMode ? theme.primary : theme.border,
              position: "relative",
              transition: "background 0.3s",
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#fff",
                position: "absolute",
                top: 3,
                left: darkMode ? 21 : 3,
                transition: "left 0.3s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
