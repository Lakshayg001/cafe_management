import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAuthed } from "../../services/adminAuth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!isAuthed()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}
