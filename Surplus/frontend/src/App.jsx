import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import {
  useAuth,
} from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import DonorDashboard from "./pages/donor/DonorDashboard";
import CreateDonation from "./pages/donor/CreateDonation";
import Donations from "./pages/donor/Donations";

import NgoDashboard from "./pages/ngo/NgoDashboard";
import NgoProfile from "./pages/ngo/NgoProfile";
import Requirements from "./pages/ngo/Requirements";
import AvailableDonations from "./pages/ngo/AvailableDonations";

import DriverDashboard from "./pages/driver/DriverDashboard";
import AvailableJobs from "./pages/driver/AvailableJobs";
import ActiveDelivery from "./pages/driver/ActiveDelivery";
import DeliveryHistory from "./pages/driver/DeliveryHistory";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import AdminDonations from "./pages/admin/Donations";
import Deliveries from "./pages/admin/Deliveries";
import Reports from "./pages/admin/Reports";

import DashboardLayout from "./layouts/DashboardLayout";

import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const ProtectedRoute = ({
  allowedRoles,
}) => {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(
      user.role
    )
  ) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return <DashboardLayout />;
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
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
        path="/unauthorized"
        element={<Unauthorized />}
      />

      {/* DONOR */}

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
            <DonorDashboard />
          }
        />

        <Route
          path="/donor/donations"
          element={
            <Donations />
          }
        />

        <Route
          path="/donor/donations/create"
          element={
            <CreateDonation />
          }
        />
      </Route>

      {/* NGO */}

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
            <NgoDashboard />
          }
        />

        <Route
          path="/ngo/profile"
          element={
            <NgoProfile />
          }
        />

        <Route
          path="/ngo/requirements"
          element={
            <Requirements />
          }
        />

        <Route
          path="/ngo/donations"
          element={
            <AvailableDonations />
          }
        />
      </Route>

      {/* DRIVER */}

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
            <DriverDashboard />
          }
        />

        <Route
          path="/driver/jobs"
          element={
            <AvailableJobs />
          }
        />

        <Route
          path="/driver/active"
          element={
            <ActiveDelivery />
          }
        />

        <Route
          path="/driver/history"
          element={
            <DeliveryHistory />
          }
        />
      </Route>

      {/* ADMIN */}

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
            <AdminDashboard />
          }
        />

        <Route
          path="/admin/users"
          element={<Users />}
        />

        <Route
          path="/admin/donations"
          element={
            <AdminDonations />
          }
        />

        <Route
          path="/admin/deliveries"
          element={
            <Deliveries />
          }
        />

        <Route
          path="/admin/reports"
          element={
            <Reports />
          }
        />
      </Route>

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
};

export default App;
