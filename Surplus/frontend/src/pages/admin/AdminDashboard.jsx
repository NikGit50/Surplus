import {
  useEffect,
  useState,
} from "react";

import {
  Users,
  Package,
  Truck,
  Heart,
} from "lucide-react";

import api from "../../services/api";
import StatCard from "../../components/dashboard/StatCard";

const AdminDashboard = () => {
  const [data, setData] =
    useState({});

  useEffect(() => {
    api.get(
      "/admin/dashboard"
    )
      .then((res) =>
        setData(res.data)
      )
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">
          Administrator Dashboard
        </h1>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <StatCard
            title="Users"
            value={
              data.users || 0
            }
            icon={<Users />}
            color="blue"
          />

          <StatCard
            title="Donations"
            value={
              data.donations ||
              0
            }
            icon={<Package />}
            color="green"
          />

          <StatCard
            title="Deliveries"
            value={
              data.deliveries ||
              0
            }
            icon={<Truck />}
            color="orange"
          />

          <StatCard
            title="Food Rescued"
            value={`${data.foodRescued || 0} kg`}
            icon={<Heart />}
            color="green"
          />
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6">
          <h2 className="text-xl font-bold">
            System Overview
          </h2>

          <p className="mt-3 text-gray-500">
            Monitor donors, NGOs,
            drivers, donations, active
            deliveries, and system impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
