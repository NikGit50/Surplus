import {
  useEffect,
  useState,
} from "react";

import {
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react";

import api from "../../services/api";
import StatCard from "../../components/dashboard/StatCard";

const DriverDashboard = () => {
  const [data, setData] =
    useState({});

  useEffect(() => {
    api.get(
      "/driver/dashboard"
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
          Driver Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Manage your rescue delivery
          assignments.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <StatCard
            title="Available Jobs"
            value={
              data.availableJobs ||
              0
            }
            icon={<Truck />}
            color="blue"
          />

          <StatCard
            title="Active Deliveries"
            value={
              data.activeDeliveries ||
              0
            }
            icon={<Clock />}
            color="orange"
          />

          <StatCard
            title="Completed"
            value={
              data.completedDeliveries ||
              0
            }
            icon={
              <CheckCircle />
            }
            color="green"
          />
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6">
          <h2 className="text-xl font-bold">
            Availability
          </h2>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() =>
                api.patch(
                  "/driver/availability",
                  {
                    available:
                      true,
                  }
                )
              }
              className="rounded-xl bg-green-600 px-5 py-3 text-white"
            >
              Available
            </button>

            <button
              onClick={() =>
                api.patch(
                  "/driver/availability",
                  {
                    available:
                      false,
                  }
                )
              }
              className="rounded-xl bg-gray-100 px-5 py-3"
            >
              Unavailable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
