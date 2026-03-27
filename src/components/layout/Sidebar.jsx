import * as Icons from "lucide-react";
import { NAVIGATION_ITEMS, DATA_SOURCE_OPTIONS } from "../../config/constants";

/**
 * Composant Sidebar - Navigation latérale avec design premium
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
        width: 280,
        background: theme.bgSidebar,
        borderRight: `1px solid ${theme.border}`,
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        height: "100vh",
        zIndex: 100,
        boxShadow: theme.shadowLg,
      }}
    >
      {/* Logo avec gradient */}
      <div style={{ padding: "28px 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 16px",
            borderRadius: 16,
            background: theme.gradientPrimary,
            boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icons.GraduationCap size={24} color="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              Xam Xam Elite
            </div>
            <div
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.8)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Dashboard Pro
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${theme.border}, transparent)`,
          margin: "0 20px",
        }}
      />

      {/* Navigation */}
      <nav style={{ padding: "24px 16px", flex: 1 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: theme.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: 16,
            paddingLeft: 16,
          }}
        >
          Menu Principal
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
                gap: 14,
                padding: "14px 18px",
                border: "none",
                background: isActive ? theme.gradientPrimary : "transparent",
                color: isActive ? "#fff" : theme.textSub,
                borderRadius: 12,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                marginBottom: 6,
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.background = theme.bgHover;
                  e.target.style.transform = "translateX(4px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.background = "transparent";
                  e.target.style.transform = "translateX(0)";
                }
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: "rgba(255,255,255,0.3)",
                  }}
                />
              )}
              <Icon size={19} strokeWidth={2.5} />
              {label}
              {isActive && (
                <Icons.ChevronRight
                  size={16}
                  style={{ marginLeft: "auto", opacity: 0.8 }}
                />
              )}
            </button>
          );
        })}

        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: theme.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginTop: 32,
            marginBottom: 16,
            paddingLeft: 16,
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
                gap: 12,
                padding: "12px 16px",
                border: `1.5px solid ${
                  isActive ? theme.primary : theme.border
                }`,
                background: isActive ? theme.primaryGlow : "transparent",
                color: isActive ? theme.primary : theme.textMuted,
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.2s",
                marginBottom: 8,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.borderColor = theme.primary;
                  e.target.style.background = theme.primaryGlow;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.borderColor = theme.border;
                  e.target.style.background = "transparent";
                }
              }}
            >
              <Icon size={16} strokeWidth={2.5} />
              {label}
              {isActive && (
                <Icons.CheckCircle
                  size={16}
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
          padding: "20px 24px",
          borderTop: `1px solid ${theme.border}`,
          background: `linear-gradient(180deg, transparent 0%, ${theme.bgHover} 100%)`,
        }}
      >
        {/* Stats rapides */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              background: theme.bgHover,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div
              style={{
                fontSize: 10,
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
                fontSize: 20,
                fontWeight: 700,
                color: theme.primary,
              }}
            >
              {totalCount}
            </div>
          </div>
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              background: theme.bgHover,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div
              style={{
                fontSize: 10,
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
                fontSize: 20,
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
            padding: "14px 16px",
            borderRadius: 12,
            background: theme.bgHover,
            border: `1px solid ${theme.border}`,
            cursor: "pointer",
            transition: "all 0.2s",
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
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: darkMode
                  ? `linear-gradient(135deg, ${theme.primary}, ${theme.purple})`
                  : `linear-gradient(135deg, ${theme.warning}, ${theme.primary})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {darkMode ? (
                <Icons.Moon size={18} color="#fff" />
              ) : (
                <Icons.Sun size={18} color="#fff" />
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
              width: 44,
              height: 24,
              borderRadius: 12,
              background: darkMode ? theme.primary : theme.border,
              position: "relative",
              transition: "background 0.3s",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#fff",
                position: "absolute",
                top: 3,
                left: darkMode ? 23 : 3,
                transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
              }}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
