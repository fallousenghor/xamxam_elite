/**
 * Composant LoadingScreen - Écran de chargement
 */
export function LoadingScreen({ theme }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: theme.bg,
          gap: 20,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: `3px solid ${theme.border}`,
            borderTop: `3px solid ${theme.primary}`,
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <div
          style={{
            fontSize: 14,
            color: theme.textMuted,
            fontWeight: 500,
          }}
        >
          Chargement des données...
        </div>
      </div>
    </>
  );
}
