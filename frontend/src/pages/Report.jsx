import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Report() {
  const navigate = useNavigate();

  const [report, setReport] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadReport = async (from = "", to = "") => {
    setLoading(true);
    setError("");

    try {
      const params = {};

      if (from) {
        params.date_from = from;
      }

      if (to) {
        params.date_to = to;
      }

      const response = await api.get("/stats/report", {
        params,
      });

      setReport(response.data || []);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }

      setError("Gagal mengambil laporan skenario.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialReport = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/stats/report");

        if (!cancelled) {
          setReport(response.data || []);
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        setError("Gagal mengambil laporan skenario.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialReport();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleFilter = (event) => {
    event.preventDefault();

    if (dateFrom && dateTo && dateFrom > dateTo) {
      setError(
        "Tanggal awal tidak boleh melebihi tanggal akhir."
      );
      return;
    }

    loadReport(dateFrom, dateTo);
  };

  const handleReset = () => {
    setDateFrom("");
    setDateTo("");
    loadReport();
  };

  const handleExport = async () => {
    try {
      const params = {};

      if (dateFrom) {
        params.date_from = dateFrom;
      }

      if (dateTo) {
        params.date_to = dateTo;
      }

      const response = await api.get(
        "/stats/report/csv",
        {
          params,
          responseType: "blob",
        }
      );

      const blob = new Blob(
        [response.data],
        { type: "text/csv" }
      );

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "scenario_report.csv";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }

      setError("Gagal melakukan export CSV.");
    }
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>Laporan Skenario</h1>
          <p>Report</p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => navigate("/")}
          >
            Dashboard
          </button>

          <button
            type="button"
            onClick={() => navigate("/scenarios")}
          >
            Scenarios
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="report-section">
          <div className="section-header">
            <div>
              <h2>Laporan Skenario</h2>
              <p>
                Ringkasan scenario berdasarkan kategori dan
                difficulty.
              </p>
            </div>
          </div>

          <form
            className="report-filters"
            onSubmit={handleFilter}
          >
            <div className="form-group">
              <label htmlFor="date-from">
                Dari
              </label>

              <input
                id="date-from"
                type="date"
                value={dateFrom}
                onChange={(event) =>
                  setDateFrom(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="date-to">
                Sampai
              </label>

              <input
                id="date-to"
                type="date"
                value={dateTo}
                onChange={(event) =>
                  setDateTo(event.target.value)
                }
              />
            </div>

            <div className="report-actions">
              <button type="submit">
                Terapkan Filter
              </button>

              <button
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>

              <button
                type="button"
                onClick={handleExport}
              >
                Export CSV
              </button>
            </div>
          </form>

          {loading && (
            <p>Loading report...</p>
          )}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {!loading && !error && report.length === 0 && (
            <div className="empty-state">
              Tidak ada data laporan.
            </div>
          )}

          {!loading && report.length > 0 && (
            <div className="scenario-table-wrapper">
              <table className="scenario-table">
                <thead>
                  <tr>
                    <th>Kategori</th>
                    <th>Total</th>
                    <th>Expert</th>
                    <th>Advanced</th>
                    <th>Intermediate</th>
                    <th>Beginner</th>
                    <th>Published</th>
                  </tr>
                </thead>

                <tbody>
                  {report.map((row) => (
                    <tr key={row.category}>
                      <td>
                        <strong>
                          {row.category}
                        </strong>
                      </td>

                      <td>{row.total}</td>
                      <td>{row.expert}</td>
                      <td>{row.advanced}</td>
                      <td>{row.intermediate}</td>
                      <td>{row.beginner}</td>
                      <td>{row.published}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Report;