import {
  Link,
  Outlet,
} from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  Users,
  Truck,
  BarChart3,
  Settings,
} from "lucide-react";

import Navbar from "../components/common/Navbar";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user } =
    useAuth();

  const role =
    user?.role;

  const links = {
    donor: [
      {
        label: "Dashboard",
        path: "/donor/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Donations",
        path: "/donor/donations",
        icon: Package,
      },
    ],

    ngo: [
      {
        label: "Dashboard",
        path: "/ngo/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Available Food",
        path: "/ngo/donations",
        icon: Package,
      },
      {
        label: "Requirements",
        path: "/ngo/requirements",
        icon: Users,
      },
    ],

    driver: [
      {
        label: "Dashboard",
        path: "/driver/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Available Jobs",
        path: "/driver/jobs",
        icon: Truck,
      },
      {
        label: "History",
        path: "/driver/history",
        icon: Package,
      },
    ],

    admin: [
      {
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Users",
        path: "/admin/users",
        icon: Users,
      },
      {
        label: "Donations",
        path: "/admin/donations",
        icon: Package,
      },
      {
        label: "Deliveries",
        path: "/admin/deliveries",
        icon: Truck,
      },
      {
        label: "Reports",
        path: "/admin/reports",
        icon: BarChart3,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <aside className="hidden min-h-[calc(100vh-73px)] w-64 border-r bg-white p-4 md:block">
          <nav className="space-y-2">
            {(
              links[role] || []
            ).map((item) => {
              const Icon =
                item.icon;

              return (
                <Link
                  key={
                    item.path
                  }
                  to={
                    item.path
                  }
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                >
                  <Icon
                    size={19}
                  />

                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
