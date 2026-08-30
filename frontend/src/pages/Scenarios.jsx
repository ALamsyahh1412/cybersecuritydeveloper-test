// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// function Scenarios() {
//   const navigate = useNavigate();

//   const [scenarios, setScenarios] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchScenarios = async () => {
//       try {
//         const response = await api.get("/scenarios", {
//           params: {
//             page: 1,
//             limit: 10,
//           },
//         });

//         setScenarios(response.data.items);
//       } catch (error) {
//         console.error(error);

//         if (error.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login");
//           return;
//         }

//         setError("Gagal mengambil data scenarios.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchScenarios();
//   }, [navigate]);

//   return (
//     <div>
//       <h1>Scenarios</h1>

//       <p>Manage cybersecurity scenarios.</p>

//       <button onClick={() => navigate("/dashboard")}>
//         Back to Dashboard
//       </button>

//       {loading && <p>Loading scenarios...</p>}

//       {error && <p>{error}</p>}

//       {!loading && !error && (
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Title</th>
//               <th>Category</th>
//               <th>Difficulty</th>
//               <th>Status</th>
//               <th>Target</th>
//             </tr>
//           </thead>

//           <tbody>
//             {scenarios.map((scenario) => (
//               <tr key={scenario.id}>
//                 <td>{scenario.id}</td>
//                 <td>{scenario.title}</td>
//                 <td>{scenario.category}</td>
//                 <td>{scenario.difficulty}</td>
//                 <td>{scenario.status}</td>
//                 <td>{scenario.target_host}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Scenarios;

// =============================================================

// import { useNavigate } from "react-router-dom";
// import ScenarioList from "../components/ScenarioList";

// function Scenarios() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login", { replace: true });
//   };

//   return (
//     <div className="dashboard-page">

//       <header className="dashboard-header">
//         <div>
//           <h1>Cybersecurity Scenario Manager</h1>
//           <p>Scenario Management</p>
//         </div>

//         <div>
//           <button onClick={() => navigate("/dashboard")}>
//             Dashboard
//           </button>

//           <button onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </header>

//       <main className="dashboard-content">
//         <ScenarioList />
//       </main>

//     </div>
//   );
// }

// export default Scenarios;

// ==========================================================

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