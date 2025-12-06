import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthed = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 24px",
      backgroundColor: "#4A90E2",
      color: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <h1 style={{ margin: 0, fontSize: "20px", cursor: "pointer" }} onClick={() => navigate("/")}>
        TutorApp
      </h1>
      <div style={{ display: "flex", gap: "16px" }}>
        <button onClick={() => navigate("/tutors")} style={navBtn}>Tutors</button>
        <button onClick={() => navigate("/register")} style={navBtn}>Register</button>
        {isAuthed ? (
          <button onClick={handleLogout} style={navBtn}>Logout</button>
        ) : (
          <button onClick={() => navigate("/login")} style={navBtn}>Login</button>
        )}
      </div>
    </nav>
  );
}

const navBtn = {
  background: "transparent",
  border: "1px solid #fff",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.3s"
};