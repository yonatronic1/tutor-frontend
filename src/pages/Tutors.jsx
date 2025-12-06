import { useEffect, useState } from "react";

export default function Tutors() {
  const [subject, setSubject] = useState("");
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTutors = async () => {
    setLoading(true);
    try {
      const qs = subject ? `?subject=${encodeURIComponent(subject)}` : "";
      const res = await fetch(`http://localhost:5000/api/tutors${qs}`);
      const data = await res.json();
      setTutors(Array.isArray(data) ? data : []);
    } catch {
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chooseTutor = (tutor) => {
    alert(`Selected tutor: ${tutor.name}`);
  };

  return (
    <div style={{ padding: "32px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: "#4A90E2", marginBottom: "24px" }}>
        Available Tutors
      </h2>

      {/* Filter Section */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "24px" }}>
        <input
          style={inputStyle}
          placeholder="Filter by subject (e.g., Math)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button style={btnStyle} onClick={fetchTutors}>Apply</button>
        <button style={btnStyle} onClick={() => { setSubject(""); fetchTutors(); }}>Clear</button>
      </div>

      {/* Tutors Grid */}
      {loading ? (
        <div style={{ textAlign: "center" }}>Loading...</div>
      ) : tutors.length === 0 ? (
        <div style={{ textAlign: "center", color: "#666" }}>No tutors found</div>
      ) : (
        <div style={gridStyle}>
          {tutors.map((t) => (
            <div key={t._id} style={cardStyle}>
              <h3 style={{ margin: "0 0 8px", color: "#333" }}>{t.name}</h3>
              <p style={{ margin: "4px 0", color: "#555" }}>Email: {t.email}</p>
              <p style={{ margin: "4px 0", color: "#555" }}>Price: ${t.price}</p>

              {t.subjects?.length > 0 && (
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "8px" }}>
                  {t.subjects.map((s) => (
                    <span key={s} style={tagStyle}>{s}</span>
                  ))}
                </div>
              )}

              <button style={{ ...btnStyle, marginTop: "12px", width: "100%" }} onClick={() => chooseTutor(t)}>
                Choose Tutor
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* 🎨 Styles */
const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  minWidth: "200px"
};

const btnStyle = {
  backgroundColor: "#4A90E2",
  color: "#fff",
  padding: "10px 16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.3s"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "20px"
};

const cardStyle = {
  background: "#fff",
  padding: "16px",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start"
};

const tagStyle = {
  background: "#50E3C2",
  color: "#fff",
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "12px"
};