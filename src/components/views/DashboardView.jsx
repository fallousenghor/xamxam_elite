import { Users, Monitor, Building2, Award, TrendingUp } from "lucide-react";
import { StatCard } from "../ui/StatCard";
import { FormationBarChart } from "../charts/FormationBarChart";
import { ModePieChart } from "../charts/ModePieChart";
import { NiveauDonutChart } from "../charts/NiveauBarChart";
import { FiliereProgressList } from "../charts/FiliereProgressList";
import { Card } from "../ui/Card";

/**
 * Composant DashboardView - Vue d'ensemble avec statistiques et graphiques
 * Design simple et professionnel
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
    <div style={{ animation: "fadeIn 0.4s ease both" }}>
      {/* Header avec titre de section */}
      <div
        style={{
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: theme.text,
              marginBottom: 6,
            }}
          >
            Tableau de bord
          </h2>
          <p
            style={{
              fontSize: 13,
              color: theme.textMuted,
              fontWeight: 500,
            }}
          >
            Statistiques en temps réel des inscriptions
          </p>
        </div>
        <Card
          style={{
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: theme.primary,
            border: "none",
          }}
        >
          <TrendingUp size={16} color="#fff" strokeWidth={2.5} />
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#fff",
            }}
          >
            +12% cette semaine
          </span>
        </Card>
      </div>

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
          color={theme.gold}
          delay={2}
        />
        <StatCard
          icon={Award}
          label="Formations"
          value={allFormations.length - 1}
          color={theme.blue}
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
    </div>
  );
}
