/**
 * Définition des thèmes (Dark / Light)
 */
export const THEMES = {
  dark: {
    bg: "#0B1120",
    bgCard: "#141B2D",
    bgSidebar: "#0D1424",
    bgHover: "#1A2235",
    border: "#1E293B",
    borderLight: "#2D3A52",
    text: "#F1F5F9",
    textSub: "#94A3B8",
    textMuted: "#64748B",
    primary: "#3B82F6",
    primaryGlow: "rgba(59,130,246,0.2)",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    purple: "#8B5CF6",
    cyan: "#06B6D4",
    pink: "#EC4899",
    chart1: "#3B82F6",
    chart2: "#10B981",
    chart3: "#F59E0B",
    chart4: "#8B5CF6",
    chart5: "#06B6D4",
    chart6: "#EC4899",
    chart7: "#EF4444",
    shadow: "0 4px 20px rgba(0,0,0,0.4)",
    shadowSm: "0 2px 8px rgba(0,0,0,0.3)",
  },
  light: {
    bg: "#F8FAFC",
    bgCard: "#FFFFFF",
    bgSidebar: "#FFFFFF",
    bgHover: "#F1F5F9",
    border: "#E2E8F0",
    borderLight: "#CBD5E1",
    text: "#0F172A",
    textSub: "#475569",
    textMuted: "#94A3B8",
    primary: "#3B82F6",
    primaryGlow: "rgba(59,130,246,0.12)",
    success: "#059669",
    warning: "#D97706",
    danger: "#DC2626",
    purple: "#7C3AED",
    cyan: "#0891B2",
    pink: "#DB2777",
    chart1: "#3B82F6",
    chart2: "#10B981",
    chart3: "#F59E0B",
    chart4: "#8B5CF6",
    chart5: "#06B6D4",
    chart6: "#EC4899",
    chart7: "#EF4444",
    shadow: "0 4px 20px rgba(0,0,0,0.08)",
    shadowSm: "0 2px 8px rgba(0,0,0,0.05)",
  },
};

/**
 * Helper pour convertir un objet de thème en variables CSS
 */
export const themeToCssVariables = (theme) => {
  const variables = {};
  Object.entries(theme).forEach(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    variables[`--${cssKey}`] = value;
  });
  return variables;
};
