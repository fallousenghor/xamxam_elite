/**
 * Définition des thèmes - Couleurs entreprise (Vert, Gold, Blanc, Bleu)
 * Design simple et professionnel sans gradients
 */
export const THEMES = {
  dark: {
    bg: "#0D1115",
    bgCard: "#151A1F",
    bgSidebar: "#0F1418",
    bgHover: "#1A2229",
    border: "#2A323A",
    borderLight: "#3A4450",
    text: "#FFFFFF",
    textSub: "#B0B8C0",
    textMuted: "#6B7680",
    // Couleurs entreprise
    primary: "#15803D",    // Vert entreprise sombre
    primarySolid: "#166534", // Vert plus foncé pour hover
    gold: "#D4AF37",       // Gold entreprise
    blue: "#2563EB",       // Bleu entreprise
    success: "#15803D",
    warning: "#D4AF37",
    danger: "#EF4444",
    // Couleurs pour charts (variées)
    chart1: "#15803D",  // Vert sombre
    chart2: "#D4AF37",  // Gold
    chart3: "#2563EB",  // Bleu
    chart4: "#16A34A",  // Vert moyen
    chart5: "#1E40AF",  // Bleu foncé
    chart6: "#B8960C",  // Gold foncé
    chart7: "#EF4444",  // Rouge
    shadow: "0 4px 20px rgba(0,0,0,0.4)",
    shadowSm: "0 2px 8px rgba(0,0,0,0.3)",
    shadowLg: "0 8px 32px rgba(0,0,0,0.5)",
    // Suppression des gradients - couleurs solides
    gradientPrimary: "#15803D",
    gradientSuccess: "#15803D",
    gradientCard: "#151A1F",
  },
  light: {
    bg: "#F8FAFB",
    bgCard: "#FFFFFF",
    bgSidebar: "#FFFFFF",
    bgHover: "#F2F5F7",
    border: "#E0E5E8",
    borderLight: "#CBD2D8",
    text: "#1A1F24",
    textSub: "#5A6570",
    textMuted: "#889098",
    // Couleurs entreprise
    primary: "#15803D",    // Vert entreprise sombre
    primarySolid: "#166534", // Vert plus foncé pour hover
    gold: "#D4AF37",       // Gold entreprise
    blue: "#2563EB",       // Bleu entreprise
    success: "#15803D",
    warning: "#D4AF37",
    danger: "#EF4444",
    // Couleurs pour charts (variées)
    chart1: "#15803D",  // Vert sombre
    chart2: "#D4AF37",  // Gold
    chart3: "#2563EB",  // Bleu
    chart4: "#16A34A",  // Vert moyen
    chart5: "#1E40AF",  // Bleu foncé
    chart6: "#B8960C",  // Gold foncé
    chart7: "#EF4444",  // Rouge
    shadow: "0 4px 20px rgba(0,0,0,0.08)",
    shadowSm: "0 2px 8px rgba(0,0,0,0.05)",
    shadowLg: "0 8px 32px rgba(0,0,0,0.1)",
    // Suppression des gradients - couleurs solides
    gradientPrimary: "#15803D",
    gradientSuccess: "#15803D",
    gradientCard: "#FFFFFF",
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
