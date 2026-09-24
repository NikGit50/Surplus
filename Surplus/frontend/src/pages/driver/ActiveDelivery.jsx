import {
  useEffect,
  useState,
} from "react";

import api from "../../services/api";

const ActiveDelivery = () => {
  const [delivery, setDelivery] =
    useState(null);

  const load = () => {
    api.get(
      "/driver/active"
    )
      .then((res) =>
        setDelivery(
          res.data.delivery
        )
      )
      .catch(console.error);
  };

  useEffect(load, []);

  const updateStatus =
    async (status) => {
      try {
        await api.patch(
          `/driver/deliveries/${delivery._id}/status`,
          { status }
        );

        load();
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Update failed"
        );
      }
    };

  if (!delivery) {
    return (
      <div className="p-10 text-center text-gray-500">
        No active delivery.
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">
          Active Delivery
        </h1>

        <div className="mt-6 space-y-4">
          <Info
            label="Food"
            value={
              delivery.foodName
            }
          />

          <Info
            label="Quantity"
            value={`${delivery.quantity} ${delivery.unit}`}
          />

          <Info
            label="Pickup"
            value={
              delivery
                .pickupLocation
                ?.address
            }
          />

          <Info
            label="Delivery"
            value={
              delivery
                .deliveryLocation
                ?.address
            }
          />
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <button
            onClick={() =>
              updateStatus(
                "DRIVER_EN_ROUTE"
              )
            }
            className="rounded-xl bg-blue-600 py-3 text-white"
          >
            En Route
          </button>

          <button
            onClick={() =>
              updateStatus(
                "PICKED_UP"
              )
            }
            className="rounded-xl bg-orange-500 py-3 text-white"
          >
            Confirm Pickup
          </button>

          <button
            onClick={() =>
              updateStatus(
                "IN_TRANSIT"
              )
            }
            className="rounded-xl bg-purple-600 py-3 text-white"
          >
            Start Delivery
          </button>

          <button
            onClick={() =>
              updateStatus(
                "DELIVERED"
              )
            }
            className="rounded-xl bg-green-600 py-3 text-white"
          >
            Confirm Delivery
          </button>
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

    <p className="mt-1 font-semibold">
      {value || "-"}
    </p>
  </div>
);

export default ActiveDelivery;
