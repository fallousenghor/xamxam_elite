/**
 * Composant GlobalStyles - Injecte les styles globaux et animations
 */
export function GlobalStyles({ theme }) {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        background: ${theme.bg};
        color: ${theme.text};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-track { background: ${theme.bg}; }
      ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: ${theme.borderLight}; }

      @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      
      .fade-0 { animation: fadeIn 0.4s ease both 0ms; }
      .fade-1 { animation: fadeIn 0.4s ease both 60ms; }
      .fade-2 { animation: fadeIn 0.4s ease both 120ms; }
      .fade-3 { animation: fadeIn 0.4s ease both 180ms; }
      .fade-4 { animation: fadeIn 0.4s ease both 240ms; }
      .fade-5 { animation: fadeIn 0.4s ease both 300ms; }
      .fade-6 { animation: fadeIn 0.4s ease both 360ms; }
    `}</style>
  );
}
