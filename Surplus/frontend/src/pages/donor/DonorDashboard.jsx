import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  Package,
  CheckCircle,
  Clock,
} from "lucide-react";

import api from "../../services/api";
import StatCard from "../../components/dashboard/StatCard";
import StatusBadge from "../../components/dashboard/StatusBadge";

const DonorDashboard = () => {
  const [donations, setDonations] =
    useState([]);

  useEffect(() => {
    api.get("/donations/my")
      .then((res) =>
        setDonations(
          res.data.donations || []
        )
      )
      .catch(console.error);
  }, []);

  const totalFood =
    donations.reduce(
      (sum, item) =>
        sum +
        Number(item.quantity || 0),
      0
    );

  const active =
    donations.filter(
      (item) =>
        ![
          "DELIVERED",
          "VERIFIED",
          "CANCELLED",
          "EXPIRED",
        ].includes(item.status)
    ).length;

  const delivered =
    donations.filter(
      (item) =>
        ["DELIVERED", "VERIFIED"].includes(
          item.status
        )
    ).length;

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Donor Dashboard
            </h1>

            <p className="mt-1 text-gray-500">
              Manage your surplus food
              donations.
            </p>
          </div>

          <Link
            to="/donor/donations/create"
            className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"
          >
            + Post Food
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <StatCard
            title="Food Donated"
            value={`${totalFood} kg`}
            icon={<Package />}
            color="green"
          />

          <StatCard
            title="Active Donations"
            value={active}
            icon={<Clock />}
            color="orange"
          />

          <StatCard
            title="Successful Deliveries"
            value={delivered}
            icon={<CheckCircle />}
            color="blue"
          />
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">
              Recent Donations
            </h2>

            <Link
              to="/donor/donations"
              className="text-green-600"
            >
              View all
            </Link>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-sm text-gray-500">
                  <th className="p-3">
                    Food
                  </th>

                  <th className="p-3">
                    Quantity
                  </th>

                  <th className="p-3">
                    Urgency
                  </th>

                  <th className="p-3">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {donations
                  .slice(0, 8)
                  .map((item) => (
                    <tr
                      key={item._id}
                      className="border-b"
                    >
                      <td className="p-3 font-medium">
                        {
                          item.foodName
                        }
                      </td>

                      <td className="p-3">
                        {item.quantity}{" "}
                        {item.unit}
                      </td>

                      <td className="p-3">
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                          {
                            item.urgency
                          }
                        </span>
                      </td>

                      <td className="p-3">
                        <StatusBadge
                          status={
                            item.status
                          }
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
