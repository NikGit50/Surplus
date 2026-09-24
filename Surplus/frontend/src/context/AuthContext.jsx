import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const AuthContext =
  createContext(null);

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token =
        localStorage.getItem(
          "sst_token"
        );

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response =
          await api.get("/auth/me");

        setUser(
          response.data.user
        );
      } catch {
        localStorage.removeItem(
          "sst_token"
        );
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (
    email,
    password
  ) => {
    const response =
      await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

    localStorage.setItem(
      "sst_token",
      response.data.token
    );

    setUser(response.data.user);

    return response.data;
  };

  const register = async (
    data
  ) => {
    const response =
      await api.post(
        "/auth/register",
        data
      );

    localStorage.setItem(
      "sst_token",
      response.data.token
    );

    setUser(response.data.user);

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem(
      "sst_token"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);
