import { api } from "./client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  try {
    const response = await api.post("/accounts/v1/login/", payload);
    return response.data;
  } catch (error: any) {
    console.log("Login API Error:", error);

    throw error;
  }
};

export const register = async (payload: RegisterPayload) => {
  try {
    const response = await api.post("/accounts/v1/register/", payload);
    return response.data;
  } catch (error: any) {
    console.log("Register API Error:", error);

    throw error;
  }
};

export const logout = async () => {
  return api.post("/accounts/v1/logout/");
};
