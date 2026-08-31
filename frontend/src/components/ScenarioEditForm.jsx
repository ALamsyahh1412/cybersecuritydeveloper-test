
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ScenarioEditForm({ scenario, onSuccess, onCancel }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: scenario.title || "",
    description: scenario.description || "",
    difficulty: scenario.difficulty || "Beginner",
    category: scenario.category || "",
    status: scenario.status || "Draft",
    target_ip: scenario.target_ip || "",
    target_host: scenario.target_host || "",
    arranged_date: scenario.arranged_date || "",
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

    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        target_ip: formData.target_ip || null,
        target_host: formData.target_host || null,
      };

      const response = await api.put(
        `/scenarios/${scenario.id}`,
        payload
      );

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

      const detail = error.response?.data?.detail;

      if (Array.isArray(detail)) {
        setError(
          detail.map((item) => item.msg).join(", ")
        );
      } else if (detail) {
        setError(detail);
      } else {
        setError("Gagal mengubah scenario.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="scenario-form-section">
      <div className="section-header">
        <div>
          <h2>Edit Scenario</h2>
          <p>Ubah data cybersecurity scenario.</p>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="edit-title">
            Title
          </label>

          <input
            id="edit-title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            minLength={3}
            maxLength={200}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-description">
            Description
          </label>

          <textarea
            id="edit-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            minLength={10}
            rows={5}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-difficulty">
            Difficulty
          </label>

          <select
            id="edit-difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="Beginner">
              Beginner
            </option>

            <option value="Intermediate">
              Intermediate
            </option>

            <option value="Advanced">
              Advanced
            </option>

            <option value="Expert">
              Expert
            </option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="edit-category">
            Category
          </label>

          <input
            id="edit-category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            minLength={2}
            maxLength={100}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-status">
            Status
          </label>

          <select
            id="edit-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Draft">
              Draft
            </option>

            <option value="Review">
              Review
            </option>

            <option value="Released">
              Released
            </option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="edit-target-ip">
            Target IP
          </label>

          <input
            id="edit-target-ip"
            name="target_ip"
            type="text"
            value={formData.target_ip}
            onChange={handleChange}
            placeholder="192.168.1.10"
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-target-host">
            Target Host
          </label>

          <input
            id="edit-target-host"
            name="target_host"
            type="text"
            value={formData.target_host}
            onChange={handleChange}
            maxLength={255}
            placeholder="web-server"
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-arranged-date">
            Arranged Date
          </label>

          <input
            id="edit-arranged-date"
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
            {loading ? "Updating..." : "Update Scenario"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ScenarioEditForm;