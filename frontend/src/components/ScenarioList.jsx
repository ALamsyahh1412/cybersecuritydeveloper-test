// import { useEffect, useState } from "react";
// import api from "../services/api";

// function ScenarioList() {
//   const [scenarios, setScenarios] = useState([]);

//   const [search, setSearch] = useState("");
//   const [difficulty, setDifficulty] = useState("");
//   const [status, setStatus] = useState("");
//   const [category, setCategory] = useState("");
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");

//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);

//   const [total, setTotal] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchScenarios = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const params = {
//         page,
//         limit,
//       };

//       if (search.trim()) {
//         params.search = search.trim();
//       }

//       if (difficulty) {
//         params.difficulty = difficulty;
//       }

//       if (status) {
//         params.status = status;
//       }

//       if (category) {
//         params.category = category;
//       }

//       if (dateFrom) {
//         params.date_from = dateFrom;
//       }

//       if (dateTo) {
//         params.date_to = dateTo;
//       }

//       const response = await api.get("/scenarios", {
//         params,
//       });

//       setScenarios(response.data.items || []);
//       setTotal(response.data.total || 0);
//       setTotalPages(response.data.total_pages || 1);
//     } catch (error) {
//       console.error(error);
//       setError("Gagal mengambil data scenarios.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchScenarios();
//   }, [
//     page,
//     search,
//     difficulty,
//     status,
//     category,
//     dateFrom,
//     dateTo,
//   ]);

//   const handleFilterChange = () => {
//     setPage(1);
//   };

//   return (
//     <section className="scenario-section">
//       <div className="section-header">
//         <div>
//           <h2>Scenarios</h2>
//           <p>{total} scenario ditemukan</p>
//         </div>
//       </div>

//       <div className="scenario-filters">

//         <input
//           type="text"
//           placeholder="Search scenario..."
//           value={search}
//           onChange={(event) => {
//             setSearch(event.target.value);
//             handleFilterChange();
//           }}
//         />

//         <select
//           value={difficulty}
//           onChange={(event) => {
//             setDifficulty(event.target.value);
//             handleFilterChange();
//           }}
//         >
//           <option value="">All Difficulty</option>
//           <option value="Easy">Easy</option>
//           <option value="Medium">Medium</option>
//           <option value="Hard">Hard</option>
//           <option value="Expert">Expert</option>
//         </select>

//         <select
//           value={status}
//           onChange={(event) => {
//             setStatus(event.target.value);
//             handleFilterChange();
//           }}
//         >
//           <option value="">All Status</option>
//           <option value="Draft">Draft</option>
//           <option value="Review">Review</option>
//           <option value="Released">Released</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Category"
//           value={category}
//           onChange={(event) => {
//             setCategory(event.target.value);
//             handleFilterChange();
//           }}
//         />

//         <input
//           type="date"
//           value={dateFrom}
//           onChange={(event) => {
//             setDateFrom(event.target.value);
//             handleFilterChange();
//           }}
//         />

//         <input
//           type="date"
//           value={dateTo}
//           onChange={(event) => {
//             setDateTo(event.target.value);
//             handleFilterChange();
//           }}
//         />

//       </div>

//       {loading && (
//         <p>Loading scenarios...</p>
//       )}

//       {error && (
//         <p className="error-message">
//           {error}
//         </p>
//       )}

//       {!loading && !error && scenarios.length === 0 && (
//         <div className="empty-state">
//           Tidak ada scenario ditemukan.
//         </div>
//       )}

//       {!loading && scenarios.length > 0 && (
//         <div className="scenario-table-wrapper">
//           <table className="scenario-table">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Category</th>
//                 <th>Difficulty</th>
//                 <th>Status</th>
//                 <th>Target IP</th>
//                 <th>Target Host</th>
//                 <th>Arranged Date</th>
//               </tr>
//             </thead>

//             <tbody>
//               {scenarios.map((scenario) => (
//                 <tr key={scenario.id}>
//                   <td>
//                     <strong>{scenario.title}</strong>
//                     <small>{scenario.description}</small>
//                   </td>

//                   <td>
//                     {scenario.category}
//                   </td>

//                   <td>
//                     <span className="badge">
//                       {scenario.difficulty}
//                     </span>
//                   </td>

//                   <td>
//                     <span className="badge">
//                       {scenario.status}
//                     </span>
//                   </td>

//                   <td>
//                     {scenario.target_ip || "-"}
//                   </td>

//                   <td>
//                     {scenario.target_host || "-"}
//                   </td>

//                   <td>
//                     {scenario.arranged_date || "-"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div className="pagination">
//         <button
//           disabled={page <= 1 || loading}
//           onClick={() => setPage((current) => current - 1)}
//         >
//           Previous
//         </button>

//         <span>
//           Page {page} of {totalPages}
//         </span>

//         <button
//           disabled={page >= totalPages || loading}
//           onClick={() => setPage((current) => current + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </section>
//   );
// }

// export default ScenarioList;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import ScenarioEditForm from "./ScenarioEditForm";

// function ScenarioList() {
//   const navigate = useNavigate();

//   const [scenarios, setScenarios] = useState([]);

//   const [search, setSearch] = useState("");
//   const [difficulty, setDifficulty] = useState("");
//   const [status, setStatus] = useState("");
//   const [category, setCategory] = useState("");
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");

//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const [total, setTotal] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [editingScenario, setEditingScenario] = useState(null);

//   useEffect(() => {
//     let cancelled = false;

//     const fetchScenarios = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const params = {
//           page,
//           limit,
//         };

//         if (search.trim()) {
//           params.search = search.trim();
//         }

//         if (difficulty) {
//           params.difficulty = difficulty;
//         }

//         if (status) {
//           params.status = status;
//         }

//         if (category.trim()) {
//           params.category = category.trim();
//         }

//         if (dateFrom) {
//           params.date_from = dateFrom;
//         }

//         if (dateTo) {
//           params.date_to = dateTo;
//         }

//         const response = await api.get("/scenarios", {
//           params,
//         });

//         if (cancelled) {
//           return;
//         }

//         setScenarios(response.data.items || []);
//         setTotal(response.data.total || 0);
//         setTotalPages(response.data.total_pages || 1);
//       } catch (error) {
//         if (cancelled) {
//           return;
//         }

//         console.error(error);

//         if (error.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login", { replace: true });
//           return;
//         }

//         setError("Gagal mengambil data scenarios.");
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchScenarios();

//     return () => {
//       cancelled = true;
//     };
//   }, [
//     page,
//     search,
//     difficulty,
//     status,
//     category,
//     dateFrom,
//     dateTo,
//     navigate,
//   ]);

//   const resetToFirstPage = () => {
//     setPage(1);
//   };

//   const handleDelete = async (scenarioId) => {
//     const confirmed = window.confirm(
//       "Apakah kamu yakin ingin menghapus scenario ini?"
//     );

//     if (!confirmed) {
//       return;
//     }

//     setError("");

//     try {
//       await api.delete(`/scenarios/${scenarioId}`);

//       setScenarios((current) =>
//         current.filter(
//           (scenario) => scenario.id !== scenarioId
//         )
//       );

//       setTotal((current) => Math.max(0, current - 1));
//     } catch (error) {
//       console.error(error);

//       if (error.response?.status === 401) {
//         localStorage.removeItem("token");
//         navigate("/login", { replace: true });
//         return;
//       }

//       const detail = error.response?.data?.detail;

//       if (Array.isArray(detail)) {
//         setError(
//           detail
//             .map((item) => item.msg)
//             .join(", ")
//         );
//       } else if (detail) {
//         setError(detail);
//       } else {
//         setError("Gagal menghapus scenario.");
//       }
//     }
//   };

//   const handleEditSuccess = (updatedScenario) => {
//     setScenarios((current) =>
//       current.map((scenario) =>
//         scenario.id === updatedScenario.id
//           ? updatedScenario
//           : scenario
//       )
//     );

//     setEditingScenario(null);
//   };

//   return (
//     <section className="scenario-section">

//       {editingScenario && (
//         <ScenarioEditForm
//           scenario={editingScenario}
//           onSuccess={handleEditSuccess}
//           onCancel={() => setEditingScenario(null)}
//         />
//       )}

//       <div className="section-header">
//         <div>
//           <h2>Scenarios</h2>
//           <p>{total} scenario ditemukan</p>
//         </div>
//       </div>

//       <div className="scenario-filters">

//         <input
//           type="text"
//           placeholder="Search scenario..."
//           value={search}
//           onChange={(event) => {
//             setSearch(event.target.value);
//             resetToFirstPage();
//           }}
//         />

//         <select
//           value={difficulty}
//           onChange={(event) => {
//             setDifficulty(event.target.value);
//             resetToFirstPage();
//           }}
//         >
//           <option value="">All Difficulty</option>
//           <option value="Easy">Easy</option>
//           <option value="Medium">Medium</option>
//           <option value="Hard">Hard</option>
//           <option value="Expert">Expert</option>
//         </select>

//         <select
//           value={status}
//           onChange={(event) => {
//             setStatus(event.target.value);
//             resetToFirstPage();
//           }}
//         >
//           <option value="">All Status</option>
//           <option value="Draft">Draft</option>
//           <option value="Review">Review</option>
//           <option value="Released">Released</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Category"
//           value={category}
//           onChange={(event) => {
//             setCategory(event.target.value);
//             resetToFirstPage();
//           }}
//         />

//         <input
//           type="date"
//           value={dateFrom}
//           onChange={(event) => {
//             setDateFrom(event.target.value);
//             resetToFirstPage();
//           }}
//         />

//         <input
//           type="date"
//           value={dateTo}
//           onChange={(event) => {
//             setDateTo(event.target.value);
//             resetToFirstPage();
//           }}
//         />

//       </div>

//       {loading && (
//         <p>Loading scenarios...</p>
//       )}

//       {error && (
//         <p className="error-message">
//           {error}
//         </p>
//       )}

//       {!loading && !error && scenarios.length === 0 && (
//         <div className="empty-state">
//           Tidak ada scenario ditemukan.
//         </div>
//       )}

//       {!loading && scenarios.length > 0 && (
//         <div className="scenario-table-wrapper">
//           <table className="scenario-table">

//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Category</th>
//                 <th>Difficulty</th>
//                 <th>Status</th>
//                 <th>Target IP</th>
//                 <th>Target Host</th>
//                 <th>Arranged Date</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {scenarios.map((scenario) => (
//                 <tr key={scenario.id}>

//                   <td>
//                     <strong>{scenario.title}</strong>
//                     <small>{scenario.description}</small>
//                   </td>

//                   <td>
//                     {scenario.category}
//                   </td>

//                   <td>
//                     <span className="badge">
//                       {scenario.difficulty}
//                     </span>
//                   </td>

//                   <td>
//                     <span className="badge">
//                       {scenario.status}
//                     </span>
//                   </td>

//                   <td>
//                     {scenario.target_ip || "-"}
//                   </td>

//                   <td>
//                     {scenario.target_host || "-"}
//                   </td>

//                   <td>
//                     {scenario.arranged_date || "-"}
//                   </td>

//                   <td>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setEditingScenario(scenario)
//                       }
//                     >
//                       Edit
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() =>
//                         handleDelete(scenario.id)
//                       }
//                     >
//                       Delete
//                     </button>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         </div>
//       )}

//       <div className="pagination">

//         <button
//           disabled={page <= 1 || loading}
//           onClick={() =>
//             setPage((current) => current - 1)
//           }
//         >
//           Previous
//         </button>

//         <span>
//           Page {page} of {totalPages}
//         </span>

//         <button
//           disabled={page >= totalPages || loading}
//           onClick={() =>
//             setPage((current) => current + 1)
//           }
//         >
//           Next
//         </button>

//       </div>

//     </section>
//   );
// }

// export default ScenarioList;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ScenarioEditForm from "./ScenarioEditForm";

function ScenarioList() {
  const navigate = useNavigate();

  const [scenarios, setScenarios] = useState([]);

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editingScenario, setEditingScenario] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchScenarios = async () => {
      setLoading(true);
      setError("");

      try {
        const params = {
          page,
          limit,
        };

        if (search.trim()) {
          params.search = search.trim();
        }

        if (difficulty) {
          params.difficulty = difficulty;
        }

        if (status) {
          params.status = status;
        }

        if (category.trim()) {
          params.category = category.trim();
        }

        if (dateFrom) {
          params.date_from = dateFrom;
        }

        if (dateTo) {
          params.date_to = dateTo;
        }

        const response = await api.get("/scenarios", {
          params,
        });

        if (cancelled) {
          return;
        }

        setScenarios(response.data.items || []);
        setTotal(response.data.total || 0);
        setTotalPages(response.data.total_pages || 1);
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

        setError("Gagal mengambil data scenarios.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchScenarios();

    return () => {
      cancelled = true;
    };
  }, [
    page,
    search,
    difficulty,
    status,
    category,
    dateFrom,
    dateTo,
    navigate,
  ]);

  const resetToFirstPage = () => {
    setPage(1);
  };

  const handleDelete = async (scenarioId) => {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus scenario ini?"
    );

    if (!confirmed) {
      return;
    }

    setError("");

    try {
      await api.delete(`/scenarios/${scenarioId}`);

      setScenarios((current) =>
        current.filter(
          (scenario) => scenario.id !== scenarioId
        )
      );

      setTotal((current) => Math.max(0, current - 1));
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
          detail
            .map((item) => item.msg)
            .join(", ")
        );
      } else if (detail) {
        setError(detail);
      } else {
        setError("Gagal menghapus scenario.");
      }
    }
  };

  const handleEditSuccess = (updatedScenario) => {
    setScenarios((current) =>
      current.map((scenario) =>
        scenario.id === updatedScenario.id
          ? updatedScenario
          : scenario
      )
    );

    setEditingScenario(null);
  };

  return (
    <section className="scenario-section">

      {editingScenario && (
        <ScenarioEditForm
          scenario={editingScenario}
          onSuccess={handleEditSuccess}
          onCancel={() => setEditingScenario(null)}
        />
      )}

      <div className="section-header">
        <div>
          <h2>Scenarios</h2>
          <p>{total} scenario ditemukan</p>
        </div>
      </div>

      <div className="scenario-filters">

        <input
          type="text"
          placeholder="Search scenario..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            resetToFirstPage();
          }}
        />

        <select
          value={difficulty}
          onChange={(event) => {
            setDifficulty(event.target.value);
            resetToFirstPage();
          }}
        >
          <option value="">All Difficulty</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>

        <select
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            resetToFirstPage();
          }}
        >
          <option value="">All Status</option>
          <option value="Draft">Draft</option>
          <option value="Review">Review</option>
          <option value="Released">Released</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            resetToFirstPage();
          }}
        />

        <input
          type="date"
          value={dateFrom}
          onChange={(event) => {
            setDateFrom(event.target.value);
            resetToFirstPage();
          }}
        />

        <input
          type="date"
          value={dateTo}
          onChange={(event) => {
            setDateTo(event.target.value);
            resetToFirstPage();
          }}
        />

      </div>

      {loading && (
        <p>Loading scenarios...</p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {!loading && !error && scenarios.length === 0 && (
        <div className="empty-state">
          Tidak ada scenario ditemukan.
        </div>
      )}

      {!loading && scenarios.length > 0 && (
        <div className="scenario-table-wrapper">
          <table className="scenario-table">

            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Status</th>
                <th>Target IP</th>
                <th>Target Host</th>
                <th>Arranged Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {scenarios.map((scenario) => (
                <tr key={scenario.id}>

                  <td>
                    <strong>{scenario.title}</strong>
                    <small>{scenario.description}</small>
                  </td>

                  <td>
                    {scenario.category}
                  </td>

                  <td>
                    <span className="badge">
                      {scenario.difficulty}
                    </span>
                  </td>

                  <td>
                    <span className="badge">
                      {scenario.status}
                    </span>
                  </td>

                  <td>
                    {scenario.target_ip || "-"}
                  </td>

                  <td>
                    {scenario.target_host || "-"}
                  </td>

                  <td>
                    {scenario.arranged_date || "-"}
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingScenario(scenario)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(scenario.id)
                      }
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      <div className="pagination">

        <button
          disabled={page <= 1 || loading}
          onClick={() =>
            setPage((current) => current - 1)
          }
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages || loading}
          onClick={() =>
            setPage((current) => current + 1)
          }
        >
          Next
        </button>

      </div>

    </section>
  );
}

export default ScenarioList;