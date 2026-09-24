import {
  Link,
} from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-green-700">
            Surplus-to-Shelter
          </h1>
        </div>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-xl text-green-700 font-medium hover:bg-green-50"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <section>
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
            Real-Time Food Rescue Platform
          </span>

          <h2 className="mt-6 text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Turning surplus food into
            <span className="text-green-600">
              {" "}community impact.
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Connect food donors, NGOs,
            shelters and volunteer drivers
            through one coordinated
            food-rescue and logistics
            platform.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
            >
              Start Rescuing Food
            </Link>

            <Link
              to="/login"
              className="px-6 py-3 rounded-xl border border-gray-200 bg-white font-semibold"
            >
              Sign In
            </Link>
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-xl border border-green-100 p-8">
          <div className="grid grid-cols-2 gap-4">
            {[
              ["🥗", "Surplus Food"],
              ["🏠", "Shelters"],
              ["🚗", "Volunteer Drivers"],
              ["📍", "Live Routing"],
            ].map(
              ([icon, title]) => (
                <div
                  key={title}
                  className="rounded-2xl bg-green-50 p-6"
                >
                  <div className="text-4xl">
                    {icon}
                  </div>

                  <p className="mt-4 font-semibold text-gray-800">
                    {title}
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
