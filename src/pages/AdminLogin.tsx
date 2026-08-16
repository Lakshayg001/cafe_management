import { useState, type FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { COLORS } from "../data/colors";
import { useAdminAuth } from "../services/adminAuth";
import logo from "../assets/velvet-brew-logo.jpg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { user, loading: authLoading } = useAdminAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center px-4" style={{ background: COLORS.espresso }}>
         <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: COLORS.gold, borderTopColor: 'transparent' }}></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    
    setError("");
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin", { replace: true });
    } catch (err: any) {
      console.error("Login error", err);
      // Simplify Firebase error messages for the UI
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password.");
      } else {
        setError("Failed to log in. Please try again.");
      }
    } finally {
      setLoading(false);
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
          <Mail size={15} style={{ color: COLORS.gold }} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="bg-transparent outline-none text-sm w-full"
            style={{ color: COLORS.cream }}
            autoFocus
          />
        </div>

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
          />
        </div>

        {error && <p className="text-xs mb-3" style={{ color: COLORS.danger }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center rounded-full py-3 text-sm tracking-wide transition-opacity disabled:opacity-50"
          style={{ background: COLORS.gold, color: COLORS.espresso }}
        >
          {loading ? (
             <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: COLORS.espresso, borderTopColor: 'transparent' }}></div>
          ) : (
            "Log in"
          )}
        </button>
      </form>
    </div>
  );
}
