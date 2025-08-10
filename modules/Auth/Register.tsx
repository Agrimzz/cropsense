import { api } from "@/api/client";
import { CustomButton } from "@/components/ui/CustomButton";
import { FormField } from "@/components/ui/FormField";
import { useApiMutation } from "@/hooks/useApiMutation";
import { clearTokens, getRefreshToken, saveTokens } from "@/utils/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerSchema, RegisterSchema } from "./validation/registerSchema";

export function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  useEffect(() => {
    const tryRefresh = async () => {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) return; // No refresh token, stay on login

      try {
        // Attempt to refresh tokens
        const res = await api.post("/accounts/v1/token/refresh/", {
          refresh: refreshToken,
        });
        const { access } = res.data;
        await saveTokens(access, refreshToken);
        router.replace("/home");
      } catch {
        await clearTokens();
        // Stay on login
      }
    };
    tryRefresh();
  }, []);

  const { mutate: register, isPending } = useApiMutation(
    "post",
    "/accounts/v1/register/"
  );

  const onSubmit = (data: RegisterSchema) => {
    if (data.password !== data.confirm_password) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    const payload = {
      full_name: data.full_name,
      email: data.email,
      password: data.password,
    };
    register(payload, {
      onSuccess: () => router.replace("/login"),
      onError: (err: any) => {
        let message = "Something went wrong. Please try again.";

        // Axios error with response
        if (err?.response?.status) {
          const status = err.response.status;
          if (status === 400) {
            message = "Register Failed. Email already in use.";
          } else if (status === 401) {
            message = "Incorrect email or password.";
          } else if (status === 403) {
            message = "You are not authorized to access this resource.";
          } else if (status === 500) {
            message = "Server error. Please try again later.";
          }
        }

        Alert.alert("Login Failed", message);
      },
    });
  };

  return (
    <SafeAreaView className="w-full h-screen bg-background flex justify-center px-4">
      <View className="flex flex-row gap-1">
        <Text className="text-textPrimary font-psemibold text-sm">
          CropSense
        </Text>
      </View>
      <Text className="text-textPrimary font-psemibold mt-4 ">
        Sign Up for CropSense
      </Text>

      <View className="flex gap-4 mt-8">
        <Controller
          control={control}
          name="full_name"
          render={({ field }) => (
            <FormField
              title="Name"
              placeholder="Enter your name"
              value={field.value}
              handleChangeText={field.onChange}
              error={errors.full_name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <FormField
              title="Email"
              placeholder="Enter your email"
              value={field.value}
              handleChangeText={field.onChange}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <FormField
              title="Password"
              placeholder="Enter your password"
              value={field.value}
              handleChangeText={field.onChange}
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirm_password"
          render={({ field }) => (
            <FormField
              title="Confirm Password"
              placeholder="Confirm your password"
              value={field.value}
              handleChangeText={field.onChange}
              error={errors.confirm_password?.message}
            />
          )}
        />
      </View>

      <CustomButton
        title="Register"
        handlePress={handleSubmit(onSubmit)}
        containerStyles="w-full mt-8"
      />
      <Text className="text-xs font-pregular text-textSecondary mt-4 text-center">
        Already an account?{" "}
        <Text
          className="text-primary"
          onPress={() => {
            router.push("/login");
          }}
        >
          Login
        </Text>
      </Text>
    </SafeAreaView>
  );
}
