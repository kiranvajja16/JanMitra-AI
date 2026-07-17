import { createContext, useContext, useState } from "react";
import { loginUser } from "../services/authService";
import {
  saveToken,
  saveUser,
  removeToken,
  removeUser,
  getUser,
} from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    saveToken(data.token);
    saveUser(data.user);

    setUser(data.user);

    return data;
  };

  const logout = () => {
    removeToken();
    removeUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;