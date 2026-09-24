import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import api from "../../services/api";
import StatusBadge from "../../components/dashboard/StatusBadge";

const Donations = () => {
  const [items, setItems] =
    useState([]);

  useEffect(() => {
    api.get("/donations/my")
      .then((res) =>
        setItems(
          res.data.donations || []
        )
      )
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              My Donations
            </h1>

            <p className="text-gray-500">
              All your food rescue
              records.
            </p>
          </div>

          <Link
            to="/donor/donations/create"
            className="rounded-xl bg-green-600 px-5 py-3 text-white"
          >
            + New Donation
          </Link>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <Link
              key={item._id}
              to={`/donor/donations/${item._id}`}
              className="block rounded-2xl bg-white p-5 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold">
                    {item.foodName}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.category} ·{" "}
                    {item.quantity}{" "}
                    {item.unit}
                  </p>
                </div>

                <div className="flex gap-2">
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                    {item.urgency}
                  </span>

                  <StatusBadge
                    status={
                      item.status
                    }
                  />
                </div>
              </div>
            </Link>
          ))}

          {items.length === 0 && (
            <div className="rounded-2xl bg-white p-10 text-center text-gray-500">
              No donations yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Donations;
