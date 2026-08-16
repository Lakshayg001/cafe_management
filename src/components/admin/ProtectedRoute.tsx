import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../services/adminAuth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAdminAuth();

  if (loading) {
    // Basic loading state while checking Firebase Auth
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#28211E]">
        <div className="w-6 h-6 border-2 border-[#CCA556] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
