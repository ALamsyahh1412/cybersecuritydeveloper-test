import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateScenario() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    category: "",
    status: "Draft",
    target_ip: "",
    target_host: "",
    arranged_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = {
        ...form,
        target_ip: form.target_ip || null,
        target_host: form.target_host || null,
      };

      await api.post("/scenarios", data);

      navigate("/scenarios");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }

      if (error.response?.data?.detail) {
        const detail = error.response.data.detail;

        if (Array.isArray(detail)) {
          setError(
            detail
              .map((item) => item.msg)
              .join(", ")
          );
        } else {
          setError(detail);
        }
      } else {
        setError("Gagal membuat scenario.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">

      <header className="dashboard-header">
        <div>
          <h1>Cybersecurity Scenario Manager</h1>
          <p>Create Scenario</p>
        </div>

        <div>
          <button onClick={() => navigate("/scenarios")}>
            Back to Scenarios
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">

        <section className="scenario-form-section">

          <h2>Create Scenario</h2>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="title">
                Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                minLength={3}
                maxLength={200}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                minLength={10}
                required
                rows={5}
              />
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">
                Difficulty
              </label>

              <select
                id="difficulty"
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category">
                Category
              </label>

              <input
                id="category"
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                minLength={2}
                maxLength={100}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Draft">Draft</option>
                <option value="Review">Review</option>
                <option value="Released">Released</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="target_ip">
                Target IP
              </label>

              <input
                id="target_ip"
                name="target_ip"
                type="text"
                value={form.target_ip}
                onChange={handleChange}
                placeholder="192.168.1.10"
              />
            </div>

            <div className="form-group">
              <label htmlFor="target_host">
                Target Host
              </label>

              <input
                id="target_host"
                name="target_host"
                type="text"
                value={form.target_host}
                onChange={handleChange}
                maxLength={255}
                placeholder="web-server"
              />
            </div>

            <div className="form-group">
              <label htmlFor="arranged_date">
                Arranged Date
              </label>

              <input
                id="arranged_date"
                name="arranged_date"
                type="date"
                value={form.arranged_date}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div>
              <button
                type="button"
                onClick={() => navigate("/scenarios")}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Scenario"}
              </button>
            </div>

          </form>

        </section>

      </main>
    </div>
  );
}

export default CreateScenario;