import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Role = "museum" | "stakeholder" | null;
interface AuthState { email: string; role: Role; name: string; }
interface AuthCtx { user: AuthState | null; login: (email: string, password: string) => boolean; logout: () => void; }

const AuthContext = createContext<AuthCtx>({ user: null, login: () => false, logout: () => {} });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthState | null>(() => {
    const s = localStorage.getItem("ps_user");
    return s ? JSON.parse(s) : null;
  });

  const login = (email: string, _password: string) => {
    let u: AuthState | null = null;
    if (email === "museum@demo.com") u = { email, role: "museum", name: "Museum Admin" };
    else if (email === "investor@demo.com") u = { email, role: "stakeholder", name: "Alex Petrov" };
    if (u) { setUser(u); localStorage.setItem("ps_user", JSON.stringify(u)); }
    return !!u;
  };

  const logout = () => { setUser(null); localStorage.removeItem("ps_user"); };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
