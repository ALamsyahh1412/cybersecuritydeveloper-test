
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ScenarioForm({ onSuccess, onCancel }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "Beginner",
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

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        difficulty: formData.difficulty,
        category: formData.category,
        status: formData.status,
        target_ip: formData.target_ip || null,
        target_host: formData.target_host || null,
        arranged_date: formData.arranged_date,
      };

      const response = await api.post("/scenarios", payload);

      if (onSuccess) {
        onSuccess(response.data);
      }
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
    <section className="scenario-form-section">
      <div className="section-header">
        <div>
          <h2>Create Scenario</h2>
          <p>Buat cybersecurity scenario baru.</p>
        </div>
      </div>

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
            value={formData.title}
            onChange={handleChange}
            placeholder="SQL Injection Advanced Lab"
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
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the cybersecurity scenario..."
            minLength={10}
            rows={5}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">
            Difficulty
          </label>

          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
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
            value={formData.category}
            onChange={handleChange}
            placeholder="Web Security"
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
            value={formData.status}
            onChange={handleChange}
            required
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
            value={formData.target_ip}
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
            value={formData.target_host}
            onChange={handleChange}
            placeholder="web-server"
            maxLength={255}
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
            value={formData.arranged_date}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
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
  );
}

export default ScenarioForm;
         