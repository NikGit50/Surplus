import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  LogOut,
  Heart,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const {
    user,
    logout,
  } = useAuth();

  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-green-700"
        >
          <Heart
            fill="currentColor"
            size={24}
          />

          Surplus-to-Shelter
        </Link>

        <div className="flex items-center gap-5">
          {user && (
            <>
              <span className="hidden text-sm text-gray-600 md:block">
                {user.name}
              </span>

              <button
                onClick={
                  handleLogout
                }
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-red-600 hover:bg-red-50"
              >
                <LogOut
                  size={18}
                />

                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
