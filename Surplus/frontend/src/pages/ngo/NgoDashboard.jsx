import {
  useEffect,
  useState,
} from "react";

import {
  Package,
  Users,
  AlertTriangle,
} from "lucide-react";

import api from "../../services/api";
import StatCard from "../../components/dashboard/StatCard";

const NgoDashboard = () => {
  const [data, setData] =
    useState(null);

  useEffect(() => {
    api.get("/ngo/dashboard")
      .then((res) =>
        setData(res.data)
      )
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">
          NGO / Shelter Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Monitor food requirements and
          incoming donations.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <StatCard
            title="Current Food Stock"
            value={`${data?.currentStock || 0} kg`}
            icon={<Package />}
            color="green"
          />

          <StatCard
            title="Beneficiaries"
            value={
              data?.beneficiaries ||
              0
            }
            icon={<Users />}
            color="blue"
          />

          <StatCard
            title="Urgent Requirements"
            value={
              data?.urgentRequirements ||
              0
            }
            icon={
              <AlertTriangle />
            }
            color="orange"
          />
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Organization Status
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Info
              label="Maximum Capacity"
              value={`${data?.maxCapacity || 0} kg`}
            />

            <Info
              label="Available Capacity"
              value={`${data?.availableCapacity || 0} kg`}
            />

            <Info
              label="Verification"
              value={
                data?.verified
                  ? "Verified"
                  : "Pending"
              }
            />

            <Info
              label="Operating Status"
              value={
                data?.available
                  ? "Available"
                  : "Unavailable"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({
  label,
  value,
}) => (
  <div className="rounded-xl bg-gray-50 p-4">
    <p className="text-sm text-gray-500">
      {label}
    </p>

    <p className="mt-1 font-bold">
      {value}
    </p>
  </div>
);

export default NgoDashboard;
