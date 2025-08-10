import { register, RegisterPayload } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),

    onError: (error: any) => {
      const message = error?.response?.data?.message || "Login failed";
      throw new Error(message);
    },
  });
};
