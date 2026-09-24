import {
  useEffect,
  useState,
} from "react";

import api from "../../services/api";

const Deliveries = () => {
  const [items, setItems] =
    useState([]);

  useEffect(() => {
    api.get(
      "/admin/deliveries"
    )
      .then((res) =>
        setItems(
          res.data.deliveries ||
            []
        )
      )
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">
          Delivery Monitoring
        </h1>

        <div className="mt-6 rounded-2xl bg-white">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between border-b p-5"
            >
              <div>
                <p className="font-bold">
                  {
                    item.foodName
                  }
                </p>

                <p className="text-sm text-gray-500">
                  Driver:{" "}
                  {
                    item.assignedDriver
                      ?.name
                  }
                </p>
              </div>

              <span>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deliveries;
