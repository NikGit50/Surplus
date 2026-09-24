import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setError("");
      setLoading(true);

      try {
        const result =
          await login(
            form.email,
            form.password
          );

        navigate(
          `/${result.user.role}/dashboard`
        );
      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            "Login failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 p-6">
      <form
        onSubmit={
          handleSubmit
        }
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
      >
        <h1 className="text-3xl font-bold">
          Welcome back
        </h1>

        <p className="mt-2 text-gray-500">
          Sign in to Surplus-to-Shelter
        </p>

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={
              form.email
            }
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value,
              })
            }
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={
              form.password
            }
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value,
              })
            }
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <button
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading
            ? "Signing in..."
            : "Sign In"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-green-600"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
