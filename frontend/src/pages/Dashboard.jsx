// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import ScenarioList from "../components/ScenarioList";

// function Dashboard() {
//   const navigate = useNavigate();

//   const [summary, setSummary] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login", { replace: true });
//   };

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const response = await api.get("/stats/summary");
//         setSummary(response.data);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login", { replace: true });
//           return;
//         }

//         setError("Gagal mengambil data dashboard.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSummary();
//   }, [navigate]);

//   return (
//     <div className="dashboard-page">

//         <header className="dashboard-header">
//             <div>
//                 <h1>Cybersecurity Scenario Manager</h1>
//                 <p>Dashboard</p>
//             </div>

//             <div>
//                 <button onClick={() => navigate("/scenarios")}>
//                 Scenarios
//                 </button>

//                 <button onClick={handleLogout}>
//                 Logout
//                 </button>
//             </div>
//         </header>

//       <main className="dashboard-content">

//         <section>
//           <h2>Overview</h2>

//           {loading && (
//             <p>Loading dashboard...</p>
//           )}

//           {error && (
//             <p className="error-message">
//               {error}
//             </p>
//           )}

//           {summary && (
//             <div className="summary-grid">

//               <div className="summary-card">
//                 <span>Total Scenarios</span>
//                 <strong>
//                   {summary.total_scenarios}
//                 </strong>
//               </div>

//               <div className="summary-card">
//                 <span>Draft</span>
//                 <strong>
//                   {summary.draft}
//                 </strong>
//               </div>

//               <div className="summary-card">
//                 <span>Expert</span>
//                 <strong>
//                   {summary.expert}
//                 </strong>
//               </div>

//               <div className="summary-card">
//                 <span>Released Today</span>
//                 <strong>
//                   {summary.released_today}
//                 </strong>
//               </div>

//             </div>
//           )}
//         </section>

//         <ScenarioList />

//       </main>
//     </div>
//   );
// }

// export default Dashboard;

// ==================================================================

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import ScenarioList from "../components/ScenarioList";
// import DifficultyPieChart from "../components/DifficultyPieChart";

// function Dashboard() {
//   const navigate = useNavigate();

//   const [summary, setSummary] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login", { replace: true });
//   };

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const response = await api.get("/stats/summary");
//         setSummary(response.data);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login", { replace: true });
//           return;
//         }

//         setError("Gagal mengambil data dashboard.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSummary();
//   }, [navigate]);

//   return (
//     <div className="dashboard-page">

//       <header className="dashboard-header">
//         <div>
//           <h1>Cybersecurity Scenario Manager</h1>
//           <p>Dashboard</p>
//         </div>

//         <div>
//           <button onClick={() => navigate("/scenarios")}>
//             Scenarios
//           </button>

//           <button onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </header>

//       <main className="dashboard-content">

//         <section>
//           <h2>Overview</h2>

//           {loading && (
//             <p>Loading dashboard...</p>
//           )}

//           {error && (
//             <p className="error-message">
//               {error}
//             </p>
//           )}

//           {summary && (
//             <div className="summary-grid">

//               <div className="summary-card">
//                 <span>Total Scenarios</span>
//                 <strong>
//                   {summary.total_scenarios}
//                 </strong>
//               </div>

//               <div className="summary-card">
//                 <span>Draft</span>
//                 <strong>
//                   {summary.draft}
//                 </strong>
//               </div>

//               <div className="summary-card">
//                 <span>Expert</span>
//                 <strong>
//                   {summary.expert}
//                 </strong>
//               </div>

//               <div className="summary-card">
//                 <span>Released Today</span>
//                 <strong>
//                   {summary.released_today}
//                 </strong>
//               </div>

//             </div>
//           )}
//         </section>

//         <DifficultyPieChart />

//         <ScenarioList />

//       </main>
//     </div>
//   );
// }
// 
// export default Dashboard;

// =========================================================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ScenarioList from "../components/ScenarioList";
import DifficultyPieChart from "../components/DifficultyPieChart";

function Dashboard() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get("/stats/summary");
        setSummary(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        setError("Gagal mengambil data dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [navigate]);

  return (
    <div className="dashboard-page">

      <header className="dashboard-header">
        <div>
          <h1>CRMS (Cyber Range Management System)</h1>
          <p>Dashboard</p>
        </div>

        <div>
          <button onClick={() => navigate("/scenarios")}>
            Scenarios
          </button>

          <button onClick={() => navigate("/reports")}>
            Reports
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">

        <section>
          <h2>Overview</h2>

          {loading && (
            <p>Loading dashboard...</p>
          )}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {summary && (
            <div className="summary-grid">

              <div className="summary-card summary-card-blue">
                <div className="summary-icon">📊</div>
                <span>Total Scenarios</span>
                <strong>
                  {summary.total_scenarios}
                </strong>
              </div>

              <div className="summary-card summary-card-red">
                <div className="summary-icon">⚠️</div>
                <span>Draft</span>
                <strong>
                  {summary.draft}
                </strong>
              </div>

              <div className="summary-card summary-card-purple">
                <div className="summary-icon">🛡️</div>
                <span>Expert</span>
                <strong>
                  {summary.expert}
                </strong>
              </div>

              <div className="summary-card summary-card-green">
                <div className="summary-icon">🚀</div>
                <span>Released Today</span>
                <strong>
                  {summary.released_today}
                </strong>
              </div>

            </div>
          )}
        </section>

        <DifficultyPieChart />

        <ScenarioList />

      </main>
    </div>
  );
}

export default Dashboard;