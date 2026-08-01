import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { COLORS } from "../data/colors";
import { login, isAuthed } from "../services/adminAuth";
import logo from "../assets/velvet-brew-logo.jpg";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (isAuthed()) {
    navigate("/admin", { replace: true });
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate("/admin", { replace: true });
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{ background: COLORS.espresso, color: COLORS.cream, fontFamily: "'Jost', sans-serif" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl p-8 vb-ring text-center"
        style={{ background: COLORS.umber }}
      >
        <img src={logo} alt="Velvet Brew" className="w-16 h-16 rounded-full object-cover mx-auto mb-4" style={{ border: `1.5px solid ${COLORS.gold}` }} />
        <p className="vb-display text-2xl mb-1">Admin Login</p>
        <p className="text-xs mb-6" style={{ color: COLORS.muted }}>Velvet Brew order management</p>

        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 mb-3"
          style={{ background: COLORS.umberLt, border: `1px solid ${COLORS.line}` }}
        >
          <Lock size={15} style={{ color: COLORS.gold }} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-transparent outline-none text-sm w-full"
            style={{ color: COLORS.cream }}
            autoFocus
          />
        </div>

        {error && <p className="text-xs mb-3" style={{ color: COLORS.danger }}>{error}</p>}

        <button
          type="submit"
          className="w-full rounded-full py-3 text-sm tracking-wide"
          style={{ background: COLORS.gold, color: COLORS.espresso }}
        >
          Log in
        </button>
      </form>
    </div>
  );
}
