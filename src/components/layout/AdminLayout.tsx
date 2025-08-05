import { Outlet, Navigate } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";
import { useAuth } from "@/contexts/AuthContext";

export function AdminLayout() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-admin-bg flex">
      <AdminSidebar userRole={user.role} />
      
      <div className="flex-1 flex flex-col">
        <AdminTopbar userRole={user.role} userName={user.name} />
        
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}