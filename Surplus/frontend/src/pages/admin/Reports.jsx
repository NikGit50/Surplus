import {
  useEffect,
  useState,
} from "react";

import api from "../../services/api";

const Reports = () => {
  const [report, setReport] =
    useState({});

  useEffect(() => {
    api.get(
      "/admin/reports"
    )
      .then((res) =>
        setReport(
          res.data.report || {}
        )
      )
      .catch(console.error);
  }, []);

  const cards = [
    [
      "Food Rescued",
      `${report.foodRescued || 0} kg`,
    ],

    [
      "Donations",
      report.donations || 0,
    ],

    [
      "Successful Deliveries",
      report.successfulDeliveries ||
        0,
    ],

    [
      "Estimated Meals",
      report.estimatedMeals ||
        0,
    ],
  ];

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">
          Impact Reports
        </h1>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {cards.map(
            ([title, value]) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <p className="text-sm text-gray-500">
                  {title}
                </p>

                <p className="mt-3 text-3xl font-bold text-green-700">
                  {value}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
