import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate =
    useNavigate();

  const {
    register,
  } = useAuth();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "donor",
      organizationName: "",
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

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

    setError("");
    setLoading(true);

    try {
      await register(form);

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data
          ?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl"
      >
        <h1 className="text-3xl font-bold">
          Create Account
        </h1>

        <p className="mt-2 text-gray-500">
          Join Surplus-to-Shelter
        </p>

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 p-3 text-red-600">
            {error}
          </div>
        )}

        <div className="mt-6 grid gap-4">
          <input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={change}
            required
            className="rounded-xl border p-3"
          />

          <input
            name="organizationName"
            placeholder="Organization / Business name"
            value={
              form.organizationName
            }
            onChange={change}
            className="rounded-xl border p-3"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={change}
            required
            className="rounded-xl border p-3"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={change}
            className="rounded-xl border p-3"
          />

          <select
            name="role"
            value={form.role}
            onChange={change}
            className="rounded-xl border p-3"
          >
            <option value="donor">
              Food Donor
            </option>

            <option value="ngo">
              NGO / Shelter
            </option>

            <option value="driver">
              Volunteer Driver
            </option>
          </select>

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={change}
            required
            minLength={6}
            className="rounded-xl border p-3"
          />
        </div>

        <button
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </button>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already registered?{" "}
          <Link
            to="/login"
            className="font-semibold text-green-600"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
