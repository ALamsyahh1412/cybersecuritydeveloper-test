import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const DIFFICULTY_ORDER = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
];

function DifficultyPieChart() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchDifficultyStats = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/stats/by-difficulty");

        if (cancelled) {
          return;
        }

        const stats = response.data || [];

        const formattedData = DIFFICULTY_ORDER.map(
          (difficulty) => {
            const item = stats.find(
              (stat) => stat.difficulty === difficulty
            );

            return {
              name: difficulty,
              value: item?.count || 0,
            };
          }
        );

        setData(formattedData);
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

        setError(
          "Gagal mengambil statistik difficulty."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchDifficultyStats();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <section className="chart-section">
      <div className="section-header">
        <div>
          <h2>Scenario Difficulty</h2>

          <p>
            Distribusi scenario berdasarkan tingkat kesulitan.
          </p>
        </div>
      </div>

      {loading && (
        <p>Loading chart...</p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {!loading && !error && data.length > 0 && (
        <div
          className="difficulty-chart"
          style={{
            width: "100%",
            height: 350,
          }}
        >
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {!loading && !error && data.every(
        (item) => item.value === 0
      ) && (
        <div className="empty-state">
          Belum ada data difficulty.
        </div>
      )}
    </section>
  );
}

export default DifficultyPieChart;