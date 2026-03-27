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

      ::-webkit-scrollbar { width: 10px; height: 10px; }
      ::-webkit-scrollbar-track { background: ${theme.bg}; }
      ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, ${theme.primary}, ${theme.purple}); border-radius: 5px; }
      ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, ${theme.purple}, ${theme.primary}); }

      @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeInDown { from { opacity: 0; transform: translateY(-24px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.05); } }
      @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      @keyframes glow { 0%, 100% { box-shadow: 0 0 20px ${theme.primary}40; } 50% { box-shadow: 0 0 40px ${theme.primary}60, 0 0 60px ${theme.primary}40; } }

      .fade-0 { animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) both 0ms; }
      .fade-1 { animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) both 80ms; }
      .fade-2 { animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) both 160ms; }
      .fade-3 { animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) both 240ms; }
      .fade-4 { animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) both 320ms; }
      .fade-5 { animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) both 400ms; }
      .fade-6 { animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) both 480ms; }
      
      .scale-in { animation: scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) both; }
      .slide-in-left { animation: slideInLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) both; }
      .slide-in-right { animation: slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) both; }
      .float { animation: float 3s ease-in-out infinite; }
      .glow { animation: glow 2s ease-in-out infinite; }
      
      .shimmer {
        background: linear-gradient(90deg, ${theme.bgCard} 0%, ${theme.bgHover} 50%, ${theme.bgCard} 100%);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite;
      }
    `}</style>
  );
}
