import { useEffect, useState } from "react";
import { THEMES, themeToCssVariables } from "../config/themes";

/**
 * Hook personnalisé pour gérer le thème et appliquer les variables CSS
 */
export function useTheme(initialDarkMode = true) {
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  const theme = darkMode ? THEMES.dark : THEMES.light;

  useEffect(() => {
    const root = document.documentElement;
    const cssVariables = themeToCssVariables(theme);
    Object.entries(cssVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [theme]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return { theme, darkMode, toggleTheme };
}
