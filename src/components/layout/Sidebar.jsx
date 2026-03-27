import * as Icons from "lucide-react";
import { NAVIGATION_ITEMS, DATA_SOURCE_OPTIONS } from "../../config/constants";

/**
 * Composant Sidebar - Navigation latérale
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
      {/* Logo */}
      <div style={{ padding: "24px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.purple})`,
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
                fontWeight: 800,
                color: theme.text,
                letterSpacing: "-0.01em",
              }}
            >
              Xam Xam Elite
            </div>
            <div
              style={{
                fontSize: 11,
                color: theme.textMuted,
                fontWeight: 500,
                letterSpacing: "0.05em",
              }}
            >
              DASHBOARD
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
      <nav style={{ padding: "20px 16px", flex: 1 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: theme.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 12,
            paddingLeft: 12,
          }}
        >
          Navigation
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
                padding: "12px 16px",
                border: "none",
                background: isActive ? theme.primaryGlow : "transparent",
                color: isActive ? theme.primary : theme.textSub,
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                transition: "all 0.2s",
                marginBottom: 4,
              }}
            >
              <Icon size={18} strokeWidth={2.5} />
              {label}
              {isActive && (
                <Icons.ChevronRight
                  size={16}
                  style={{ marginLeft: "auto" }}
                />
              )}
            </button>
          );
        })}

        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: theme.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginTop: 28,
            marginBottom: 12,
            paddingLeft: 12,
          }}
        >
          Source de données
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
                padding: "10px 16px",
                border: `1px solid ${
                  isActive ? theme.primary : theme.border
                }`,
                background: isActive ? theme.primaryGlow : "transparent",
                color: isActive ? theme.primary : theme.textMuted,
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.2s",
                marginBottom: 6,
              }}
            >
              <Icon size={16} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Footer Sidebar */}
      <div
        style={{
          padding: "20px",
          borderTop: `1px solid ${theme.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {darkMode ? (
              <Icons.Moon size={16} color={theme.textSub} />
            ) : (
              <Icons.Sun size={16} color={theme.textSub} />
            )}
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: theme.textSub,
              }}
            >
              {darkMode ? "Mode sombre" : "Mode clair"}
            </span>
          </div>
          <button
            onClick={toggleTheme}
            style={{
              width: 48,
              height: 26,
              borderRadius: 13,
              background: darkMode ? theme.primary : theme.border,
              border: "none",
              cursor: "pointer",
              position: "relative",
              transition: "background 0.3s",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#fff",
                position: "absolute",
                top: 3,
                left: darkMode ? 25 : 3,
                transition: "left 0.3s",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            />
          </button>
        </div>
        <div
          style={{
            fontSize: 12,
            color: theme.textMuted,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Icons.Users size={14} />
          {filteredCount} / {totalCount} dossiers
        </div>
      </div>
    </div>
  );
}
