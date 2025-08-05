import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  Activity,
  LogOut,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userRole: 'Admin' | 'Editor' | 'Viewer';
}

export function AdminSidebar({ userRole }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      roles: ['Admin', 'Editor', 'Viewer']
    },
    {
      title: "User Management",
      href: "/admin/users",
      icon: Users,
      roles: ['Admin']
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      roles: ['Admin', 'Editor']
    },
    {
      title: "Activity Logs",
      href: "/admin/activity",
      icon: Activity,
      roles: ['Admin', 'Editor']
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
      roles: ['Admin']
    }
  ];

  const visibleItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <div className={cn(
      "h-screen bg-admin-sidebar text-white flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-admin-sidebar-hover flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-xl font-bold">Admin Panel</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-admin-sidebar-hover"
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg transition-colors",
                "hover:bg-admin-sidebar-hover",
                isActive ? "bg-admin-accent text-white" : "text-admin-text-light"
              )}
            >
              <Icon size={20} className="shrink-0" />
              {!collapsed && (
                <span className="ml-3 font-medium">{item.title}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-admin-sidebar-hover">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-admin-text-light hover:bg-admin-sidebar-hover hover:text-white",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );
}