/**
 * Définition des thèmes (Dark / Light) - Design Professionnel Premium
 */
export const THEMES = {
  dark: {
    bg: "#0A0E1A",
    bgCard: "#111827",
    bgSidebar: "#0D111C",
    bgHover: "#1F2937",
    border: "#1F2937",
    borderLight: "#374151",
    text: "#F9FAFB",
    textSub: "#9CA3AF",
    textMuted: "#6B7280",
    primary: "#6366F1",
    primaryGlow: "rgba(99,102,241,0.25)",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    purple: "#A855F7",
    cyan: "#06B6D4",
    pink: "#EC4899",
    chart1: "#6366F1",
    chart2: "#10B981",
    chart3: "#F59E0B",
    chart4: "#A855F7",
    chart5: "#06B6D4",
    chart6: "#EC4899",
    chart7: "#EF4444",
    shadow: "0 8px 32px rgba(0,0,0,0.5)",
    shadowSm: "0 4px 16px rgba(0,0,0,0.4)",
    shadowLg: "0 20px 60px rgba(0,0,0,0.6)",
    gradientPrimary: "linear-gradient(135deg, #6366F1 0%, #A855F7 100%)",
    gradientSuccess: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    gradientCard: "linear-gradient(180deg, rgba(99,102,241,0.08) 0%, transparent 100%)",
  },
  light: {
    bg: "#F8FAFC",
    bgCard: "#FFFFFF",
    bgSidebar: "#FFFFFF",
    bgHover: "#F1F5F9",
    border: "#E2E8F0",
    borderLight: "#CBD5E1",
    text: "#1E293B",
    textSub: "#64748B",
    textMuted: "#94A3B8",
    primary: "#6366F1",
    primaryGlow: "rgba(99,102,241,0.15)",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    purple: "#A855F7",
    cyan: "#06B6D4",
    pink: "#EC4899",
    chart1: "#6366F1",
    chart2: "#10B981",
    chart3: "#F59E0B",
    chart4: "#A855F7",
    chart5: "#06B6D4",
    chart6: "#EC4899",
    chart7: "#EF4444",
    shadow: "0 8px 32px rgba(0,0,0,0.12)",
    shadowSm: "0 4px 16px rgba(0,0,0,0.08)",
    shadowLg: "0 20px 60px rgba(0,0,0,0.16)",
    gradientPrimary: "linear-gradient(135deg, #6366F1 0%, #A855F7 100%)",
    gradientSuccess: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    gradientCard: "linear-gradient(180deg, rgba(99,102,241,0.05) 0%, transparent 100%)",
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
