import { useState } from "react";
import { GlobalStyles } from "./ui/GlobalStyles";
import { LoadingScreen } from "./ui/LoadingScreen";
import { Sidebar } from "./layout/Sidebar";
import { Topbar } from "./layout/Topbar";
import { DashboardView } from "./views/DashboardView";
import { TableView } from "./views/TableView";
import { useTheme } from "../hooks/useTheme";
import { useSheetData } from "../hooks/useSheetData";
import { useFilteredData } from "../hooks/useFilteredData";

/**
 * Composant principal FormationsDashboard
 * Orchestre l'ensemble des composants et hooks
 */
export default function FormationsDashboard() {
  // États locaux
  const [activeTab, setActiveTab] = useState("dashboard");

  // Hooks personnalisés
  const { theme, darkMode, toggleTheme } = useTheme(true);
  const { rows, loading, error } = useSheetData(false); // false = données réelles (Google Sheets)
  const {
    enriched,
    allFormations,
    filtered,
    formationData,
    modeData,
    niveauData,
    filiereData,
    stats,
  } = useFilteredData(rows, "", "Tous", "Tous");

  // Affichage de l'écran de chargement
  if (loading) {
    return (
      <>
        <GlobalStyles theme={theme} />
        <LoadingScreen theme={theme} />
      </>
    );
  }

  return (
    <>
      <GlobalStyles theme={theme} />
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: theme.bg,
        }}
      >
        {/* Sidebar */}
        <Sidebar
          theme={theme}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          useDemo={false}
          onDataSourceChange={() => {}}
          filteredCount={filtered.length}
          totalCount={rows.length}
        />

        {/* Main Content */}
        <div
          style={{
            marginLeft: 280,
            flex: 1,
            minHeight: "100vh",
            background: `linear-gradient(180deg, ${theme.bg} 0%, ${theme.bgCard} 100%)`,
          }}
        >
          {/* Topbar */}
          <Topbar theme={theme} activeTab={activeTab} useDemo={false} />

          {/* Error Message */}
          {error && (
            <div
              style={{
                margin: "20px 32px",
                padding: "16px 20px",
                background: `${theme.danger}18`,
                border: `1px solid ${theme.danger}`,
                borderRadius: 12,
                color: theme.danger,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Content */}
          <div style={{ padding: "32px 40px" }}>
            {activeTab === "dashboard" && (
              <DashboardView
                theme={theme}
                filtered={filtered}
                formationData={formationData}
                modeData={modeData}
                niveauData={niveauData}
                filiereData={filiereData}
                stats={stats}
                allFormations={allFormations}
              />
            )}

            {activeTab === "table" && (
              <TableView
                data={enriched}
                allFormations={allFormations}
                theme={theme}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
