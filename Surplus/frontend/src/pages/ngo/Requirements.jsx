import {
  useEffect,
  useState,
} from "react";

import api from "../../services/api";

const Requirements = () => {
  const [form, setForm] =
    useState({
      maxCapacity: "",
      currentStock: "",
      beneficiaries: "",
      minQuantity: "",
      maxQuantity: "",
      requiredCategories: [],
      rejectedCategories: [],
      emergency: false,
    });

  const categories = [
    "Cooked Meal",
    "Rice",
    "Bread",
    "Vegetables",
    "Fruits",
    "Packaged Food",
    "Bakery",
  ];

  useEffect(() => {
    api.get("/ngo/profile")
      .then((res) => {
        if (res.data) {
          setForm((old) => ({
            ...old,
            ...res.data,
          }));
        }
      })
      .catch(console.error);
  }, []);

  const toggleCategory = (
    field,
    value
  ) => {
    setForm((old) => {
      const current =
        old[field] || [];

      return {
        ...old,
        [field]: current.includes(
          value
        )
          ? current.filter(
              (x) => x !== value
            )
          : [...current, value],
      };
    });
  };

  const save = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        "/ngo/requirements",
        form
      );

      alert(
        "Requirements updated successfully"
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
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">
          Food Requirements
        </h1>

        <form
          onSubmit={save}
          className="mt-6 space-y-6"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <Input
              label="Maximum Capacity (kg)"
              value={
                form.maxCapacity
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  maxCapacity:
                    e.target.value,
                })
              }
            />

            <Input
              label="Current Stock (kg)"
              value={
                form.currentStock
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  currentStock:
                    e.target.value,
                })
              }
            />

            <Input
              label="Beneficiaries"
              value={
                form.beneficiaries
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  beneficiaries:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <h2 className="mb-3 font-bold">
              Required Categories
            </h2>

            <div className="grid gap-3 md:grid-cols-2">
              {categories.map(
                (category) => (
                  <label
                    key={category}
                    className="flex gap-3 rounded-xl border p-3"
                  >
                    <input
                      type="checkbox"
                      checked={form.requiredCategories.includes(
                        category
                      )}
                      onChange={() =>
                        toggleCategory(
                          "requiredCategories",
                          category
                        )
                      }
                    />

                    {category}
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <h2 className="mb-3 font-bold">
              Not Accepted
            </h2>

            <div className="grid gap-3 md:grid-cols-2">
              {categories.map(
                (category) => (
                  <label
                    key={category}
                    className="flex gap-3 rounded-xl border p-3"
                  >
                    <input
                      type="checkbox"
                      checked={form.rejectedCategories.includes(
                        category
                      )}
                      onChange={() =>
                        toggleCategory(
                          "rejectedCategories",
                          category
                        )
                      }
                    />

                    {category}
                  </label>
                )
              )}
            </div>
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={
                form.emergency
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  emergency:
                    e.target.checked,
                })
              }
            />

            <span className="font-medium">
              Emergency food requirement
            </span>
          </label>

          <button className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white">
            Save Requirements
          </button>
        </form>
      </div>
    </div>
  );
};

const Input = ({
  label,
  ...props
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium">
      {label}
    </label>

    <input
      {...props}
      type="number"
      className="w-full rounded-xl border p-3"
    />
  </div>
);

export default Requirements;
