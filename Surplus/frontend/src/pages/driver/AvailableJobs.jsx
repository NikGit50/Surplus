import {
  useEffect,
  useState,
} from "react";

import api from "../../services/api";

const AvailableJobs = () => {
  const [jobs, setJobs] =
    useState([]);

  const load = () => {
    api.get("/driver/jobs")
      .then((res) =>
        setJobs(
          res.data.jobs || []
        )
      )
      .catch(console.error);
  };

  useEffect(load, []);

  const accept = async (
    id
  ) => {
    try {
      await api.post(
        `/driver/jobs/${id}/accept`
      );

      load();
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Unable to accept job"
      );
    }
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">
          Available Jobs
        </h1>

        <div className="mt-6 space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap justify-between gap-5">
                <div>
                  <h2 className="text-lg font-bold">
                    {job.foodName}
                  </h2>

                  <p className="mt-1 text-gray-500">
                    {job.quantity}{" "}
                    {job.unit}
                  </p>

                  <p className="mt-3 text-sm">
                    Pickup:{" "}
                    {
                      job.pickupLocation
                        ?.address
                    }
                  </p>
                </div>

                <button
                  onClick={() =>
                    accept(job._id)
                  }
                  className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"
                >
                  Accept Job
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableJobs;
