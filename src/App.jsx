import { useEffect, useState } from "react";

function App() {
  const [tutors, setTutors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_BASE;

    fetch(`${API_BASE}/api/tutors`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data.ok) {
          setTutors(data.data);
        } else {
          setError(data.error || "Unknown API error");
        }
      })
      .catch(err => setError(err.message));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Tutors</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {tutors.length === 0 && !error ? (
        <p>No tutors found.</p>
      ) : (
        <ul>
          {tutors.map(t => (
            <li key={t._id}>
              <strong>{t.name}</strong> — {t.subject} (${t.rate})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;