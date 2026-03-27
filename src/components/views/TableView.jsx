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
    <Card className="fade-0">
      {/* Filters Bar */}
      <div
        style={{
          padding: "20px 28px",
          borderBottom: `1px solid ${theme.border}`,
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flex: "0 0 300px" }}>
          <Search
            size={18}
            color={theme.textMuted}
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Rechercher un candidat..."
            style={{
              width: "100%",
              padding: "11px 14px 11px 44px",
              border: `1.5px solid ${theme.border}`,
              borderRadius: 10,
              background: theme.bg,
              color: theme.text,
              fontSize: 14,
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = theme.primary)}
            onBlur={(e) => (e.target.style.borderColor = theme.border)}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: theme.textMuted,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Filter size={14} style={{ marginRight: 6 }} /> Formation:
          </div>
          {allFormations.map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilterFormation(f);
                setCurrentPage(1);
              }}
              style={{
                padding: "6px 14px",
                border: `1px solid ${
                  filterFormation === f ? theme.primary : theme.border
                }`,
                borderRadius: 20,
                background:
                  filterFormation === f ? theme.primaryGlow : "transparent",
                color: filterFormation === f ? theme.primary : theme.textMuted,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div
          style={{
            marginLeft: "auto",
            fontSize: 13,
            fontWeight: 600,
            color: theme.textSub,
          }}
        >
          <span style={{ color: theme.primary }}>{filteredData.length}</span>{" "}
          résultat{filteredData.length > 1 ? "s" : ""}
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
                      padding: "14px 20px",
                      textAlign: "left",
                      fontSize: 12,
                      fontWeight: 700,
                      color: theme.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      borderBottom: `1px solid ${theme.border}`,
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
                    background:
                      i % 2 === 0 ? "transparent" : `${theme.border}22`,
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = theme.bgHover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      i % 2 === 0 ? "transparent" : `${theme.border}22`)
                  }
                >
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: 13,
                      color: theme.textMuted,
                      fontWeight: 600,
                    }}
                  >
                    #{String(globalIndex + 1).padStart(2, "0")}
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${avatarColor}, ${avatarColor}88)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 16,
                          fontWeight: 700,
                          color: "#fff",
                          flexShrink: 0,
                        }}
                      >
                        {(r[SHEET_KEYS.nom] || "?")[0]}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: theme.text,
                            marginBottom: 2,
                          }}
                        >
                          {r[SHEET_KEYS.nom]}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: theme.textMuted,
                          }}
                        >
                          {r[SHEET_KEYS.naissance]}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 13,
                          color: theme.textSub,
                        }}
                      >
                        <Mail size={14} />
                        {r[SHEET_KEYS.emailAddr] || r[SHEET_KEYS.email]}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 13,
                          color: theme.textMuted,
                        }}
                      >
                        <Phone size={14} />
                        {r[SHEET_KEYS.telephone]}
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        display: "inline-block",
                        padding: "5px 12px",
                        borderRadius: 6,
                        background: theme.primaryGlow,
                        border: `1px solid ${theme.primary}`,
                        color: theme.primary,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {r._niveau || r[SHEET_KEYS.niveau] || "N/A"}
                    </div>
                  </td>

                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: 13,
                      color: theme.textSub,
                    }}
                  >
                    {r[SHEET_KEYS.filiere]}
                  </td>

                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: avatarColor,
                    }}
                  >
                    {r._formation}
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "5px 12px",
                        borderRadius: 6,
                        background: isOnline
                          ? `${theme.success}18`
                          : `${theme.warning}18`,
                        border: `1px solid ${
                          isOnline ? theme.success : theme.warning
                        }`,
                        color: isOnline ? theme.success : theme.warning,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {isOnline ? (
                        <Monitor size={14} />
                      ) : (
                        <Building2 size={14} />
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
              padding: "60px 0",
              color: theme.textMuted,
            }}
          >
            <Search size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Aucun résultat trouvé
            </div>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {filteredData.length > 0 && (
        <div
          style={{
            padding: "16px 28px",
            borderTop: `1px solid ${theme.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          {/* Informations */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 13,
              color: theme.textMuted,
            }}
          >
            <div>
              Affichage de{" "}
              <span style={{ color: theme.primary, fontWeight: 600 }}>
                {startIndex + 1}
              </span>{" "}
              à{" "}
              <span style={{ color: theme.primary, fontWeight: 600 }}>
                {Math.min(endIndex, filteredData.length)}
              </span>{" "}
              sur{" "}
              <span style={{ color: theme.primary, fontWeight: 600 }}>
                {filteredData.length}
              </span>{" "}
              candidats
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Clock size={14} />
              {new Date().toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
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
                gap: 8,
                fontSize: 13,
                color: theme.textSub,
              }}
            >
              <span>Afficher :</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: `1px solid ${theme.border}`,
                  background: theme.bg,
                  color: theme.text,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span>par page</span>
            </div>

            {/* Boutons de navigation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginLeft: 16,
              }}
            >
              {/* Première page */}
              <button
                onClick={handleFirstPage}
                disabled={currentPage === 1}
                style={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${theme.border}`,
                  borderRadius: 6,
                  background:
                    currentPage === 1 ? theme.bg : theme.bgHover,
                  color:
                    currentPage === 1 ? theme.textMuted : theme.text,
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  opacity: currentPage === 1 ? 0.5 : 1,
                  transition: "all 0.2s",
                }}
              >
                <ChevronsLeft size={16} />
              </button>

              {/* Page précédente */}
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                style={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${theme.border}`,
                  borderRadius: 6,
                  background:
                    currentPage === 1 ? theme.bg : theme.bgHover,
                  color:
                    currentPage === 1 ? theme.textMuted : theme.text,
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  opacity: currentPage === 1 ? 0.5 : 1,
                  transition: "all 0.2s",
                }}
              >
                <ChevronLeft size={16} />
              </button>

              {/* Numéros de page */}
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  style={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${
                      currentPage === page ? theme.primary : theme.border
                    }`,
                    borderRadius: 6,
                    background:
                      currentPage === page
                        ? theme.primaryGlow
                        : theme.bg,
                    color:
                      currentPage === page ? theme.primary : theme.text,
                    fontWeight: currentPage === page ? 600 : 500,
                    cursor: "pointer",
                    transition: "all 0.2s",
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
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${theme.border}`,
                  borderRadius: 6,
                  background:
                    currentPage === totalPages ? theme.bg : theme.bgHover,
                  color:
                    currentPage === totalPages ? theme.textMuted : theme.text,
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  transition: "all 0.2s",
                }}
              >
                <ChevronRight size={16} />
              </button>

              {/* Dernière page */}
              <button
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
                style={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${theme.border}`,
                  borderRadius: 6,
                  background:
                    currentPage === totalPages ? theme.bg : theme.bgHover,
                  color:
                    currentPage === totalPages ? theme.textMuted : theme.text,
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  transition: "all 0.2s",
                }}
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
