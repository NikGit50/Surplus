import {
  Link,
} from "react-router-dom";

import {
  ArrowRight,
  Heart,
  MapPin,
  Truck,
  Users,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2 text-xl font-bold text-green-700">
            <Heart
              fill="currentColor"
            />

            Surplus-to-Shelter
          </div>

          <div className="flex gap-3">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Real-Time Food Rescue
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight text-gray-900">
            Turn surplus food into
            meaningful support.
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Connect food donors, NGOs,
            shelters, and volunteer drivers
            through one coordinated platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white hover:bg-green-700"
            >
              Get Started
              <ArrowRight
                size={18}
              />
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-gray-300 bg-white px-6 py-4 font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Feature
            icon={<Heart />}
            title="Food Donors"
            text="Post surplus food and track every donation."
          />

          <Feature
            icon={<Users />}
            title="NGOs & Shelters"
            text="Receive food based on capacity and requirements."
          />

          <Feature
            icon={<Truck />}
            title="Volunteer Drivers"
            text="Coordinate pickups and deliveries efficiently."
          />
        </div>
      </section>
    </div>
  );
};

const Feature = ({
  icon,
  title,
  text,
}) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm">
    <div className="mb-4 inline-flex rounded-xl bg-green-100 p-3 text-green-700">
      {icon}
    </div>

    <h2 className="text-lg font-bold">
      {title}
    </h2>

    <p className="mt-2 text-sm leading-6 text-gray-500">
      {text}
    </p>
  </div>
);

export default Home;
