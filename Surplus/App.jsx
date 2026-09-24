import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const Dashboard = ({
  role,
}) => (
  <div className="min-h-screen bg-gray-50 p-10">
    <h1 className="text-3xl font-bold">
      {role.toUpperCase()} Dashboard
    </h1>

    <p className="mt-2 text-gray-500">
      Surplus-to-Shelter
    </p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            element={
              <ProtectedRoute
                allowedRoles={[
                  "donor",
                ]}
              />
            }
          >
            <Route
              path="/donor/dashboard"
              element={
                <Dashboard role="donor" />
              }
            />
          </Route>

          <Route
            element={
              <ProtectedRoute
                allowedRoles={[
                  "ngo",
                ]}
              />
            }
          >
            <Route
              path="/ngo/dashboard"
              element={
                <Dashboard role="ngo" />
              }
            />
          </Route>

          <Route
            element={
              <ProtectedRoute
                allowedRoles={[
                  "driver",
                ]}
              />
            }
          >
            <Route
              path="/driver/dashboard"
              element={
                <Dashboard role="driver" />
              }
            />
          </Route>

          <Route
            element={
              <ProtectedRoute
                allowedRoles={[
                  "admin",
                ]}
              />
            }
          >
            <Route
              path="/admin/dashboard"
              element={
                <Dashboard role="admin" />
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
