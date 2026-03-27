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
  FileSpreadsheet,
  FileText,
  X,
} from "lucide-react";
import { Card } from "../ui/Card";
import { SHEET_KEYS } from "../../config/constants";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];
const DEFAULT_ITEMS_PER_PAGE = 10;

/**
 * Composant TableView - Tableau des candidats avec filtres et pagination
 */
export function TableView({ data, allFormations, theme }) {
  // États pour la recherche et les filtres
  const [search, setSearch] = useState("");
  const [filterFormation, setFilterFormation] = useState("Tous");
  const [showExportMenu, setShowExportMenu] = useState(false);

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

  // Fonction pour préparer les données d'export
  const prepareExportData = () => {
    return filteredData.map((r, index) => ({
      "No": index + 1,
      "Candidat": r[SHEET_KEYS.nom],
      "Email": r[SHEET_KEYS.emailAddr] || r[SHEET_KEYS.email],
      "Téléphone": r[SHEET_KEYS.telephone],
      "Né(e) le": r[SHEET_KEYS.naissance],
      "Niveau": r._niveau || r[SHEET_KEYS.niveau] || "N/A",
      "Filière": r[SHEET_KEYS.filiere],
      "Formation": r._formation,
      "Mode": r._mode,
    }));
  };

  // Export Excel
  const exportToExcel = () => {
    const exportData = prepareExportData();
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    
    // Ajuster la largeur des colonnes
    const colWidths = [
      { wch: 5 }, { wch: 30 }, { wch: 35 }, { wch: 15 }, { wch: 15 },
      { wch: 15 }, { wch: 25 }, { wch: 30 }, { wch: 12 }
    ];
    worksheet["!cols"] = colWidths;

    // Style des en-têtes
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_col(C) + "1";
      if (!worksheet[address]) continue;
      worksheet[address].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "15803D" } },
        alignment: { horizontal: "center", vertical: "center" },
      };
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidats");
    
    const fileName = `candidats_${new Date().toISOString().split("T")[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    setShowExportMenu(false);
  };

  // Export PDF
  const exportToPDF = () => {
    const doc = new jsPDF("l", "mm", "a4");
    
    // Charger et ajouter le logo
    const logoPath = "/logoxamxam.jpg";
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoHeight = 35;
    const logoMargin = 10;
    const logoWidth = pageWidth - (logoMargin * 2);
    
    // Créer un élément image temporaire pour charger le logo
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = logoPath;
    
    img.onload = () => {
      // Convertir l'image en base64
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const logoData = canvas.toDataURL("image/jpeg");
      
      // Ajouter le logo en pleine largeur en haut
      doc.addImage(logoData, "JPEG", logoMargin, 10, logoWidth, logoHeight);
      
      // Titre (en dessous du logo, centré)
      const titleY = 10 + logoHeight + 12;
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(21, 128, 61); // Vert entreprise
      const titleWidth = doc.getTextWidth("Liste des candidats - Xam Xam Elite");
      doc.text("Liste des candidats - Xam Xam Elite", (pageWidth - titleWidth) / 2, titleY);
      
      // Date (en dessous du titre)
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      const dateText = `Exporté le ${new Date().toLocaleDateString("fr-FR")}`;
      const dateWidth = doc.getTextWidth(dateText);
      doc.text(dateText, (pageWidth - dateWidth) / 2, titleY + 7);
      
      // Statistiques (en dessous de la date)
      const statsText = `Total: ${filteredData.length} candidat(s)`;
      const statsWidth = doc.getTextWidth(statsText);
      doc.setFontSize(10);
      doc.text(statsText, (pageWidth - statsWidth) / 2, titleY + 14);
      
      // Tableau
      const exportData = prepareExportData();
      const tableColumn = ["#", "Candidat", "Email", "Téléphone", "Niveau", "Filière", "Formation", "Mode"];
      const tableRows = exportData.map(row => [
        row["#"],
        row["Candidat"],
        row["Email"],
        row["Téléphone"],
        row["Niveau"],
        row["Filière"],
        row["Formation"],
        row["Mode"],
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 10 + logoHeight + 35,
        theme: "striped",
        headStyles: {
          fillColor: [21, 128, 61], // Vert entreprise
          textColor: 255,
          fontStyle: "bold",
          fontSize: 9,
        },
        bodyStyles: {
          fontSize: 8,
          textColor: 50,
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        columnStyles: {
          0: { cellWidth: 15, halign: "center" },
          1: { cellWidth: 40 },
          2: { cellWidth: 50 },
          3: { cellWidth: 30 },
          4: { cellWidth: 25, halign: "center" },
          5: { cellWidth: 35 },
          6: { cellWidth: 40 },
          7: { cellWidth: 25, halign: "center" },
        },
        margin: { top: 10 + logoHeight + 35, left: 14, right: 14 },
      });

      const fileName = `candidats_${new Date().toISOString().split("T")[0]}.pdf`;
      doc.save(fileName);
    };
    
    // Si l'image n'est pas chargée, exporter sans logo
    img.onerror = () => {
      // Titre sans logo
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(21, 128, 61);
      const titleWidth = doc.getTextWidth("Liste des candidats - Xam Xam Elite");
      doc.text("Liste des candidats - Xam Xam Elite", (pageWidth - titleWidth) / 2, 15);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      const dateText = `Exporté le ${new Date().toLocaleDateString("fr-FR")}`;
      const dateWidth = doc.getTextWidth(dateText);
      doc.text(dateText, (pageWidth - dateWidth) / 2, 22);
      
      doc.setFontSize(10);
      const statsText = `Total: ${filteredData.length} candidat(s)`;
      const statsWidth = doc.getTextWidth(statsText);
      doc.text(statsText, (pageWidth - statsWidth) / 2, 28);
      
      const exportData = prepareExportData();
      const tableColumn = ["#", "Candidat", "Email", "Téléphone", "Niveau", "Filière", "Formation", "Mode"];
      const tableRows = exportData.map(row => [
        row["#"],
        row["Candidat"],
        row["Email"],
        row["Téléphone"],
        row["Niveau"],
        row["Filière"],
        row["Formation"],
        row["Mode"],
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        theme: "striped",
        headStyles: {
          fillColor: [21, 128, 61],
          textColor: 255,
          fontStyle: "bold",
          fontSize: 9,
        },
        bodyStyles: {
          fontSize: 8,
          textColor: 50,
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        columnStyles: {
          0: { cellWidth: 15, halign: "center" },
          1: { cellWidth: 40 },
          2: { cellWidth: 50 },
          3: { cellWidth: 30 },
          4: { cellWidth: 25, halign: "center" },
          5: { cellWidth: 35 },
          6: { cellWidth: 40 },
          7: { cellWidth: 25, halign: "center" },
        },
        margin: { top: 35, left: 14, right: 14 },
      });

      const fileName = `candidats_${new Date().toISOString().split("T")[0]}.pdf`;
      doc.save(fileName);
    };
    
    setShowExportMenu(false);
  };

  return (
    <Card className="fade-0" style={{ overflow: "hidden" }}>
      {/* Header avec titre */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: `1px solid ${theme.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: theme.text,
              marginBottom: 4,
            }}
          >
            Liste des candidats
          </h2>
          <p
            style={{
              fontSize: 12,
              color: theme.textMuted,
              fontWeight: 500,
            }}
          >
            Gérez et consultez tous les candidats inscrits
          </p>
        </div>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 8,
              background: theme.primary,
              border: "none",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = "1";
            }}
          >
            <Download size={16} strokeWidth={2.5} />
            Exporter
          </button>

          {/* Menu d'export */}
          {showExportMenu && (
            <>
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1000,
                }}
                onClick={() => setShowExportMenu(false)}
              />
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: 8,
                  minWidth: 200,
                  background: theme.bgCard,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 8,
                  boxShadow: theme.shadowLg,
                  zIndex: 1001,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "8px 12px",
                    borderBottom: `1px solid ${theme.border}`,
                    fontSize: 11,
                    fontWeight: 600,
                    color: theme.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Format d'export
                </div>
                <button
                  onClick={exportToExcel}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    border: "none",
                    background: "transparent",
                    color: theme.text,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background 0.2s",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = theme.bgHover;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      background: "#1D6F42",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FileSpreadsheet size={18} color="#fff" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Excel</div>
                    <div style={{ fontSize: 11, color: theme.textMuted }}>
                      Format .xlsx
                    </div>
                  </div>
                </button>
                <button
                  onClick={exportToPDF}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    border: "none",
                    background: "transparent",
                    color: theme.text,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background 0.2s",
                    textAlign: "left",
                    borderTop: `1px solid ${theme.border}`,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = theme.bgHover;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      background: "#DC2626",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FileText size={18} color="#fff" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>PDF</div>
                    <div style={{ fontSize: 11, color: theme.textMuted }}>
                      Format .pdf
                    </div>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Filters Bar */}
      <div
        style={{
          padding: "16px 24px",
          borderBottom: `1px solid ${theme.border}`,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* Search Input */}
        <div style={{ position: "relative", flex: "0 0 280px" }}>
          <div
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Search
              size={16}
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
              padding: "10px 12px 10px 90px",
              border: `1.5px solid ${theme.border}`,
              borderRadius: 8,
              background: theme.bg,
              color: theme.text,
              fontSize: 13,
              fontWeight: 500,
              outline: "none",
              transition: "all 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = theme.primary;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme.border;
            }}
          />
        </div>

        {/* Filter Chips */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            flex: 1,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 16,
              background: theme.bgHover,
              border: `1px solid ${theme.border}`,
            }}
          >
            <Filter size={12} color={theme.textMuted} />
            <span
              style={{
                fontSize: 11,
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
                padding: "6px 14px",
                border: `1.5px solid ${
                  filterFormation === f ? theme.primary : theme.border
                }`,
                borderRadius: 16,
                background:
                  filterFormation === f ? `${theme.primary}10` : theme.bgHover,
                color: filterFormation === f ? theme.primary : theme.textSub,
                fontSize: 12,
                fontWeight: filterFormation === f ? 600 : 500,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (filterFormation !== f) {
                  e.target.style.borderColor = theme.primary;
                }
              }}
              onMouseLeave={(e) => {
                if (filterFormation !== f) {
                  e.target.style.borderColor = theme.border;
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
            gap: 8,
            padding: "8px 14px",
            borderRadius: 20,
            background: `${theme.primary}15`,
            border: `1.5px solid ${theme.primary}`,
          }}
        >
          <Users size={14} color={theme.primary} strokeWidth={2.5} />
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: theme.primary,
            }}
          >
            {filteredData.length}
          </span>
          <span
            style={{
              fontSize: 12,
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
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
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
                          background: avatarColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 15,
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
                            fontSize: 13,
                            fontWeight: 700,
                            color: theme.text,
                            marginBottom: 2,
                          }}
                        >
                          {r[SHEET_KEYS.nom]}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
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

                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        padding: "6px 12px",
                        borderRadius: 8,
                        background: `${theme.primary}10`,
                        border: `1.5px solid ${theme.primary}`,
                        color: theme.primary,
                        fontSize: 11,
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
            padding: "16px 24px",
            borderTop: `2px solid ${theme.border}`,
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
                    e.target.style.background = `${theme.primary}10`;
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
                    e.target.style.background = `${theme.primary}10`;
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
                        ? theme.primary
                        : theme.bg,
                    color:
                      currentPage === page ? "#fff" : theme.text,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== page) {
                      e.target.style.borderColor = theme.primary;
                      e.target.style.background = `${theme.primary}10`;
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
                    e.target.style.background = `${theme.primary}10`;
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
                    e.target.style.background = `${theme.primary}10`;
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
