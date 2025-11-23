import { CustomButton } from "@/components/ui/CustomButton";
import { FormField } from "@/components/ui/FormField";
import { useApiMutation } from "@/hooks/useApiMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { router } from "expo-router";
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

  const { mutate: register, isPending } = useApiMutation(
    "post",
    "/accounts/v1/register/"
  );

  const onSubmit = (data: RegisterSchema) => {
    if (data.password !== data.confirm_password) {
      Alert.alert("Register Failed", "Passwords do not match.");
      return;
    }

    const payload = {
      full_name: data.full_name,
      email: data.email,
      password: data.password,
    };

    register(payload, {
      onSuccess: () => {
        Alert.alert("Success", "Account created successfully.", [
          {
            text: "OK",
            onPress: () => router.replace("/login"),
          },
        ]);
      },
      onError: (err: AxiosError<any>) => {
        console.log("Register error:", err?.response?.data || err);

        let message = "Something went wrong. Please try again.";

        const status = err?.response?.status;
        const data = err?.response?.data as any;

        if (data) {
          if (typeof data === "string") {
            message = data;
          } else if (data.detail) {
            message = data.detail;
          } else if (data.non_field_errors?.[0]) {
            message = data.non_field_errors[0];
          } else if (data.email?.[0]) {
            message = data.email[0];
          }
        } else if (status) {
          if (status === 400) {
            message = "Register failed. Please check your details.";
          } else if (status === 401) {
            message = "Incorrect email or password.";
          } else if (status === 403) {
            message = "You are not authorized to access this resource.";
          } else if (status === 500) {
            message = "Server error. Please try again later.";
          }
        }

        Alert.alert("Register Failed", message);
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
              type="password"
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
              type="password"
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
        isLoading={isPending}
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
