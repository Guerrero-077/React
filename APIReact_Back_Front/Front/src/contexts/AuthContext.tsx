import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { authService } from "../api/services/loginService";

interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkToken = async () => {
    try {
      const token = await authService.getToken();
      if (!token) {
        setIsAuthenticated(false);
      } else {
        const expired = await authService.isTokenExpired();
        setIsAuthenticated(!expired);

        if (expired) {
          console.warn("🔐 Token expirado, cerrando sesión");
          await authService.logout();
        }
      }
    } catch (error) {
      console.error("Error verificando token:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();

    // Verificación periódica cada 60 segundos
    const interval = setInterval(() => {
      checkToken();
    }, 60 * 1000); // cada 60 segundos

    return () => clearInterval(interval);
  }, []);

  const login = async () => {
    await checkToken(); // fuerza revalidación
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
