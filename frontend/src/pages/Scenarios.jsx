

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScenarioList from "../components/ScenarioList";
import ScenarioForm from "../components/ScenarioForm";

function Scenarios() {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const handleCreateSuccess = () => {
    setShowForm(false);
    setRefreshKey((current) => current + 1);
  };

  return (
    <div className="dashboard-page">

      <header className="dashboard-header">
        <div>
          <h1>Cybersecurity Scenario Manager</h1>
          <p>Scenario Management</p>
        </div>

        <div>
          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">

        <div className="scenario-page-actions">
          <button onClick={() => setShowForm(true)}>
            + Create Scenario
          </button>
        </div>

        {showForm && (
          <ScenarioForm
            onSuccess={handleCreateSuccess}
            onCancel={() => setShowForm(false)}
          />
        )}
        
        <ScenarioList key={refreshKey} />

        {/* <ScenarioList /> */}

      </main>

    </div>
  );
}

export default Scenarios;