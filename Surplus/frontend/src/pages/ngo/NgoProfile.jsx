import {
  useState,
} from "react";

import api from "../../services/api";

const NgoProfile = () => {
  const [form, setForm] =
    useState({
      organizationName: "",
      address: "",
      phone: "",
      operatingHours: "",
      maxCapacity: "",
      beneficiaries: "",
    });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const submit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await api.put(
        "/ngo/profile",
        form
      );

      alert(
        "Profile updated"
      );
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Update failed"
      );
    }
  };

  return (
    <div className="p-6">
      <form
        onSubmit={submit}
        className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold">
          NGO Profile
        </h1>

        <div className="mt-6 grid gap-4">
          {Object.keys(
            form
          ).map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={change}
              placeholder={field
                .replaceAll(
                  /([A-Z])/g,
                  " $1"
                )
                .replace(
                  /^./,
                  (x) =>
                    x.toUpperCase()
                )}
              className="rounded-xl border p-3"
            />
          ))}
        </div>

        <button className="mt-6 w-full rounded-xl bg-green-600 py-3 text-white">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default NgoProfile;
