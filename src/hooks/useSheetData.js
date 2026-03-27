import { useEffect, useState } from "react";
import { fetchSheetData } from "../utils/api";
import { DEMO_DATA } from "../config/demoData";

/**
 * Hook personnalisé pour charger les données (Démo ou Google Sheets)
 */
export function useSheetData(useDemo = true) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      if (useDemo) {
        // Simulation d'un délai réseau pour la démo
        const timer = setTimeout(() => {
          setRows(DEMO_DATA);
          setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
      }

      try {
        const data = await fetchSheetData();
        setRows(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [useDemo]);

  return { rows, loading, error };
}
