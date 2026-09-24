import {
  useEffect,
  useState,
} from "react";

import api from "../../services/api";

const AvailableDonations = () => {
  const [items, setItems] =
    useState([]);

  const load = () => {
    api.get(
      "/ngo/donations"
    )
      .then((res) =>
        setItems(
          res.data.donations ||
            []
        )
      )
      .catch(console.error);
  };

  useEffect(load, []);

  const respond = async (
    id,
    action
  ) => {
    try {
      await api.post(
        `/ngo/donations/${id}/${action}`
      );

      load();
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Operation failed"
      );
    }
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">
          Available Donations
        </h1>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold">
                {item.foodName}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {item.category}
              </p>

              <p className="mt-3 text-2xl font-bold text-green-700">
                {item.quantity}{" "}
                {item.unit}
              </p>

              <p className="mt-2 text-sm">
                Urgency:{" "}
                <b>
                  {item.urgency}
                </b>
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {item.pickupLocation
                  ?.address}
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() =>
                    respond(
                      item._id,
                      "accept"
                    )
                  }
                  className="flex-1 rounded-xl bg-green-600 py-2 text-white"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    respond(
                      item._id,
                      "reject"
                    )
                  }
                  className="flex-1 rounded-xl bg-red-50 py-2 text-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableDonations;
