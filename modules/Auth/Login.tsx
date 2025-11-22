import { CustomButton } from "@/components/ui/CustomButton";
import { FormField } from "@/components/ui/FormField";
import { useApiMutation } from "@/hooks/useApiMutation";
import { saveTokens } from "@/utils/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginSchema, LoginSchema } from "./validation/loginSchema";

export function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: register, isPending } = useApiMutation(
    "post",
    "/accounts/v1/login/"
  );

  const onSubmit = (data: LoginSchema) => {
    register(data, {
      onSuccess: async (res: any) => {
        saveTokens(res.access, res.refresh);
        router.replace("/home");
      },
      onError: (err: any) => {
        let message = "Something went wrong. Please try again.";

        // Axios error with response
        if (err?.response?.status) {
          const status = err.response.status;

          if (status === 400) {
            message = "Invalid input. Please check your email or password.";
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
        Welcome Back to CropSense
      </Text>

      <View className="gap-4 mt-8">
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
              type="password"
              value={field.value}
              handleChangeText={field.onChange}
              error={errors.password?.message}
            />
          )}
        />
      </View>

      <CustomButton
        title="Login"
        handlePress={handleSubmit(onSubmit)}
        containerStyles="w-full mt-8"
        isLoading={isPending}
      />
      <Text className="text-xs font-pregular text-textSecondary mt-4 text-center">
        Don{"'"}t have an account?{" "}
        <Text
          className="text-primary"
          onPress={() => {
            router.push("/register");
          }}
        >
          Sign Up
        </Text>
      </Text>
    </SafeAreaView>
  );
}
