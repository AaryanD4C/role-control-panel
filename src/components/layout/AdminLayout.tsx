import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";
import { useState } from "react";

// Mock user data - in real app this would come from authentication
const mockUser = {
  name: "John Admin",
  role: 'Admin' as const
};

export function AdminLayout() {
  const [userRole] = useState<'Admin' | 'Editor' | 'Viewer'>(mockUser.role);

  return (
    <div className="min-h-screen bg-admin-bg flex">
      <AdminSidebar userRole={userRole} />
      
      <div className="flex-1 flex flex-col">
        <AdminTopbar userRole={userRole} userName={mockUser.name} />
        
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}