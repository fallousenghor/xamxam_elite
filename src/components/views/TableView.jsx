import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Mail,
  Phone,
  Monitor,
  Building2,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Users,
  Download,
} from "lucide-react";
import { Card } from "../ui/Card";
import { SHEET_KEYS } from "../../config/constants";

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];
const DEFAULT_ITEMS_PER_PAGE = 10;

/**
 * Composant TableView - Tableau des candidats avec filtres et pagination
 */
export function TableView({ data, allFormations, theme }) {
  // États pour la recherche et les filtres
  const [search, setSearch] = useState("");
  const [filterFormation, setFilterFormation] = useState("Tous");

  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  // Filtrage des données
  const filteredData = useMemo(() => {
    return data.filter((r) => {
      const s = search.toLowerCase();
      const matchSearch =
        !s ||
        [
          r[SHEET_KEYS.nom],
          r[SHEET_KEYS.email],
          r[SHEET_KEYS.emailAddr],
          r[SHEET_KEYS.filiere],
          r[SHEET_KEYS.niveau],
          r._formation,
        ]
          .join(" ")
          .toLowerCase()
          .includes(s);

      const matchFormation =
        filterFormation === "Tous" || r._formation === filterFormation;

      return matchSearch && matchFormation;
    });
  }, [data, search, filterFormation]);

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Réinitialiser la page quand les filtres changent
  useState(() => {
    setCurrentPage(1);
  });

  // Gestionnaires de pagination
  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  const handlePageChange = (page) => setCurrentPage(page);

  // Génération des numéros de page à afficher
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  const chartColors = [
    theme.chart1,
    theme.chart2,
    theme.chart3,
    theme.chart4,
    theme.chart5,
  ];

  return (
    <Card className="fade-0" style={{ overflow: "hidden" }}>
      {/* Header avec titre */}
      <div
        style={{
          padding: "24px 28px",
          borderBottom: `1px solid ${theme.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: `linear-gradient(180deg, ${theme.bgHover} 0%, transparent 100%)`,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: theme.text,
              marginBottom: 4,
            }}
          >
            Liste des candidats
          </h2>
          <p
            style={{
              fontSize: 13,
              color: theme.textMuted,
              fontWeight: 500,
            }}
          >
            Gérez et consultez tous les candidats inscrits
          </p>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 20px",
            borderRadius: 12,
            background: theme.gradientPrimary,
            border: "none",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          <Download size={18} strokeWidth={2.5} />
          Exporter
        </button>
      </div>

      {/* Filters Bar */}
      <div
        style={{
          padding: "20px 28px",
          borderBottom: `1px solid ${theme.border}`,
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "center",
          background: theme.bgCard,
        }}
      >
        {/* Search Input */}
        <div style={{ position: "relative", flex: "0 0 320px" }}>
          <div
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Search
              size={18}
              color={theme.textMuted}
            />
            <span
              style={{
                fontSize: 12,
                color: theme.textMuted,
                fontWeight: 500,
              }}
            >
              Rechercher
            </span>
          </div>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Nom, email, filière..."
            style={{
              width: "100%",
              padding: "12px 16px 12px 110px",
              border: `1.5px solid ${theme.border}`,
              borderRadius: 12,
              background: theme.bg,
              color: theme.text,
              fontSize: 14,
              fontWeight: 500,
              outline: "none",
              transition: "all 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = theme.primary;
              e.target.style.boxShadow = `0 0 0 4px ${theme.primaryGlow}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme.border;
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Filter Chips */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            flex: 1,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              borderRadius: 20,
              background: theme.bgHover,
              border: `1px solid ${theme.border}`,
            }}
          >
            <Filter size={14} color={theme.textMuted} />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: theme.textMuted,
              }}
            >
              Formation:
            </span>
          </div>
          {allFormations.map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilterFormation(f);
                setCurrentPage(1);
              }}
              style={{
                padding: "8px 16px",
                border: `1.5px solid ${
                  filterFormation === f ? theme.primary : theme.border
                }`,
                borderRadius: 20,
                background:
                  filterFormation === f ? theme.primaryGlow : theme.bgHover,
                color: filterFormation === f ? theme.primary : theme.textSub,
                fontSize: 13,
                fontWeight: filterFormation === f ? 600 : 500,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (filterFormation !== f) {
                  e.target.style.borderColor = theme.primary;
                  e.target.style.background = theme.primaryGlow;
                }
              }}
              onMouseLeave={(e) => {
                if (filterFormation !== f) {
                  e.target.style.borderColor = theme.border;
                  e.target.style.background = theme.bgHover;
                }
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Result Count Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 18px",
            borderRadius: 24,
            background: `${theme.primary}15`,
            border: `1.5px solid ${theme.primary}`,
          }}
        >
          <Users size={16} color={theme.primary} strokeWidth={2.5} />
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: theme.primary,
            }}
          >
            {filteredData.length}
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: theme.textSub,
            }}
          >
            résultat{filteredData.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: theme.bg }}>
              {["#", "Candidat", "Contact", "Niveau", "Filière", "Formation", "Mode"].map(
                (col) => (
                  <th
                    key={col}
                    style={{
                      padding: "16px 20px",
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 700,
                      color: theme.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      borderBottom: `2px solid ${theme.border}`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((r, i) => {
              const avatarColor = chartColors[i % chartColors.length];
              const isOnline = r._mode === "En ligne";
              const globalIndex = startIndex + i;

              return (
                <tr
                  key={i}
                  style={{
                    borderBottom: `1px solid ${theme.border}`,
                    background: "transparent",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme.bgHover;
                    e.currentTarget.style.transform = "scale(1.005)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <td
                    style={{
                      padding: "18px 20px",
                      fontSize: 13,
                      color: theme.textMuted,
                      fontWeight: 600,
                    }}
                  >
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        background: theme.bgHover,
                        border: `1px solid ${theme.border}`,
                      }}
                    >
                      #{String(globalIndex + 1).padStart(3, "0")}
                    </span>
                  </td>

                  <td style={{ padding: "18px 20px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${avatarColor}, ${avatarColor}CC)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 17,
                          fontWeight: 700,
                          color: "#fff",
                          flexShrink: 0,
                          boxShadow: `0 4px 12px ${avatarColor}50`,
                        }}
                      >
                        {(r[SHEET_KEYS.nom] || "?")[0]}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: theme.text,
                            marginBottom: 3,
                          }}
                        >
                          {r[SHEET_KEYS.nom]}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: theme.textMuted,
                            fontWeight: 500,
                          }}
                        >
                          Né(e) le {r[SHEET_KEYS.naissance]}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: "18px 20px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontSize: 13,
                          color: theme.textSub,
                          fontWeight: 500,
                        }}
                      >
                        <Mail size={14} />
                        {r[SHEET_KEYS.emailAddr] || r[SHEET_KEYS.email]}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontSize: 13,
                          color: theme.textMuted,
                          fontWeight: 500,
                        }}
                      >
                        <Phone size={14} />
                        {r[SHEET_KEYS.telephone]}
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: "18px 20px" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        padding: "6px 14px",
                        borderRadius: 8,
                        background: theme.primaryGlow,
                        border: `1.5px solid ${theme.primary}`,
                        color: theme.primary,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {r._niveau || r[SHEET_KEYS.niveau] || "N/A"}
                    </div>
                  </td>

                  <td
                    style={{
                      padding: "18px 20px",
                      fontSize: 13,
                      color: theme.textSub,
                      fontWeight: 500,
                    }}
                  >
                    {r[SHEET_KEYS.filiere]}
                  </td>

                  <td
                    style={{
                      padding: "18px 20px",
                      fontSize: 13,
                      fontWeight: 700,
                      color: avatarColor,
                    }}
                  >
                    {r._formation}
                  </td>

                  <td style={{ padding: "18px 20px" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "6px 14px",
                        borderRadius: 8,
                        background: isOnline
                          ? `${theme.success}18`
                          : `${theme.warning}18`,
                        border: `1.5px solid ${
                          isOnline ? theme.success : theme.warning
                        }`,
                        color: isOnline ? theme.success : theme.warning,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {isOnline ? (
                        <Monitor size={14} strokeWidth={2.5} />
                      ) : (
                        <Building2 size={14} strokeWidth={2.5} />
                      )}
                      {r._mode}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              color: theme.textMuted,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: theme.bgHover,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <Search size={36} style={{ opacity: 0.4 }} />
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: theme.text,
                marginBottom: 6,
              }}
            >
              Aucun résultat trouvé
            </div>
            <div
              style={{
                fontSize: 14,
                color: theme.textMuted,
              }}
            >
              Essayez de modifier vos filtres de recherche
            </div>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {filteredData.length > 0 && (
        <div
          style={{
            padding: "20px 28px",
            borderTop: `2px solid ${theme.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            background: `linear-gradient(180deg, transparent 0%, ${theme.bgHover} 100%)`,
          }}
        >
          {/* Informations */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              fontSize: 13,
              color: theme.textMuted,
            }}
          >
            <div>
              Affichage de{" "}
              <span style={{ color: theme.primary, fontWeight: 700 }}>
                {startIndex + 1}
              </span>{" "}
              à{" "}
              <span style={{ color: theme.primary, fontWeight: 700 }}>
                {Math.min(endIndex, filteredData.length)}
              </span>{" "}
              sur{" "}
              <span style={{ color: theme.primary, fontWeight: 700 }}>
                {filteredData.length}
              </span>{" "}
              candidats
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 10,
                background: theme.bg,
                border: `1px solid ${theme.border}`,
              }}
            >
              <Clock size={14} color={theme.textMuted} />
              <span style={{ fontWeight: 600 }}>
                {new Date().toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          {/* Contrôles de pagination */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* Sélecteur nombre d'éléments par page */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 13,
                color: theme.textSub,
                marginRight: 12,
              }}
            >
              <span style={{ fontWeight: 500 }}>Afficher :</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: `1.5px solid ${theme.border}`,
                  background: theme.bg,
                  color: theme.text,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  outline: "none",
                  transition: "all 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.primary;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme.border;
                }}
              >
                {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span style={{ fontWeight: 500 }}>par page</span>
            </div>

            {/* Boutons de navigation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {/* Première page */}
              <button
                onClick={handleFirstPage}
                disabled={currentPage === 1}
                style={{
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1.5px solid ${theme.border}`,
                  borderRadius: 10,
                  background: currentPage === 1 ? theme.bg : theme.bgHover,
                  color: currentPage === 1 ? theme.textMuted : theme.text,
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  opacity: currentPage === 1 ? 0.5 : 1,
                  transition: "all 0.2s",
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 1) {
                    e.target.style.borderColor = theme.primary;
                    e.target.style.background = theme.primaryGlow;
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 1) {
                    e.target.style.borderColor = theme.border;
                    e.target.style.background = theme.bgHover;
                  }
                }}
              >
                <ChevronsLeft size={18} />
              </button>

              {/* Page précédente */}
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                style={{
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1.5px solid ${theme.border}`,
                  borderRadius: 10,
                  background: currentPage === 1 ? theme.bg : theme.bgHover,
                  color: currentPage === 1 ? theme.textMuted : theme.text,
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  opacity: currentPage === 1 ? 0.5 : 1,
                  transition: "all 0.2s",
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 1) {
                    e.target.style.borderColor = theme.primary;
                    e.target.style.background = theme.primaryGlow;
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 1) {
                    e.target.style.borderColor = theme.border;
                    e.target.style.background = theme.bgHover;
                  }
                }}
              >
                <ChevronLeft size={18} />
              </button>

              {/* Numéros de page */}
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  style={{
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1.5px solid ${
                      currentPage === page ? theme.primary : theme.border
                    }`,
                    borderRadius: 10,
                    background:
                      currentPage === page
                        ? theme.gradientPrimary
                        : theme.bg,
                    color:
                      currentPage === page ? "#fff" : theme.text,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: currentPage === page ? `0 4px 12px ${theme.primary}40` : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== page) {
                      e.target.style.borderColor = theme.primary;
                      e.target.style.background = theme.primaryGlow;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== page) {
                      e.target.style.borderColor = theme.border;
                      e.target.style.background = theme.bg;
                    }
                  }}
                >
                  {page}
                </button>
              ))}

              {/* Page suivante */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                style={{
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1.5px solid ${theme.border}`,
                  borderRadius: 10,
                  background: currentPage === totalPages ? theme.bg : theme.bgHover,
                  color: currentPage === totalPages ? theme.textMuted : theme.text,
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  transition: "all 0.2s",
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== totalPages) {
                    e.target.style.borderColor = theme.primary;
                    e.target.style.background = theme.primaryGlow;
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== totalPages) {
                    e.target.style.borderColor = theme.border;
                    e.target.style.background = theme.bgHover;
                  }
                }}
              >
                <ChevronRight size={18} />
              </button>

              {/* Dernière page */}
              <button
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
                style={{
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1.5px solid ${theme.border}`,
                  borderRadius: 10,
                  background: currentPage === totalPages ? theme.bg : theme.bgHover,
                  color: currentPage === totalPages ? theme.textMuted : theme.text,
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  transition: "all 0.2s",
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== totalPages) {
                    e.target.style.borderColor = theme.primary;
                    e.target.style.background = theme.primaryGlow;
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== totalPages) {
                    e.target.style.borderColor = theme.border;
                    e.target.style.background = theme.bgHover;
                  }
                }}
              >
                <ChevronsRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
