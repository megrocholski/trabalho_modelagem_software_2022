import React, { createContext, useCallback, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  AuthContextData,
  AuthState,
  SignInCredentials,
  User,
} from "../util/interfaces";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<React.ReactNode> = ({ children }: any) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@SAU:User:token");
    const user = localStorage.getItem("@SAU:User:user");
    console.log(token);
    const refreshToken = localStorage.getItem("@SAU:User:refreshToken");
    if (token && user && refreshToken) {
      //   api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user), refreshToken };
    }
    return {} as AuthState;
  });

  const navigate = useNavigate();
  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post("/user/signin", {
      email,
      password,
    });
    //   .finally(() => navigate("/home"));
    //   .finally(<Navigate to="/home" replace />);
    //   .then();
    const { content } = response.data;

    console.log(content);
    localStorage.setItem("@SAU:User:token", content.token);

    localStorage.setItem("@SAU:User:user", JSON.stringify(content.user));

    console.log(response);
    if (response.data.error == false) {
      navigate("admin/home");
    }
    // localStorage.setItem("@SAU:User:refreshToken", refreshToken);

    // api.defaults.headers.authorization = `Bearer ${content.token}`;
    // api.defaults?.headers?.common = `Bearer ${content.token}`;

    // const check_token = await api.post("user/checktoken", {}, config)

    //  post(
    // 	'http://localhost:8000/api/v1/get_token_payloads',
    // 	bodyParameters,
    // 	config
    //   ).then(console.log).catch(console.log);

    // setData({ content.token, content.user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@SAU:User:token");
    localStorage.removeItem("@SAU:User:user");
    // localStorage.removeItem("@SAU:User:refreshToken");

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem("@SAU:User:user", JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used whithin an AuthProvider");
  }

  return context;
}
