import { Users, Monitor, Building2, Award } from "lucide-react";
import { StatCard } from "../ui/StatCard";
import { FormationBarChart } from "../charts/FormationBarChart";
import { ModePieChart } from "../charts/ModePieChart";
import { NiveauDonutChart } from "../charts/NiveauBarChart";
import { FiliereProgressList } from "../charts/FiliereProgressList";

/**
 * Composant DashboardView - Vue d'ensemble avec statistiques et graphiques
 */
export function DashboardView({
  theme,
  filtered,
  formationData,
  modeData,
  niveauData,
  filiereData,
  stats,
  allFormations,
}) {
  return (
    <>
      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          marginBottom: 28,
        }}
      >
        <StatCard
          icon={Users}
          label="Total candidats"
          value={filtered.length}
          change={12}
          color={theme.primary}
          delay={0}
        />
        <StatCard
          icon={Monitor}
          label="En ligne"
          value={stats.enLigne}
          change={18}
          color={theme.success}
          delay={1}
        />
        <StatCard
          icon={Building2}
          label="Présentiel"
          value={stats.presentiel}
          change={-5}
          color={theme.warning}
          delay={2}
        />
        <StatCard
          icon={Award}
          label="Formations"
          value={allFormations.length - 1}
          color={theme.purple}
          delay={3}
        />
      </div>

      {/* Charts Row 1 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <FormationBarChart data={formationData} theme={theme} />
        <ModePieChart data={modeData} theme={theme} />
      </div>

      {/* Charts Row 2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
        }}
      >
        <NiveauDonutChart data={niveauData} theme={theme} />
        <FiliereProgressList data={filiereData} total={stats.total} theme={theme} />
      </div>
    </>
  );
}
