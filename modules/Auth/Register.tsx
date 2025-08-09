import { CustomButton } from "@/components/ui/CustomButton";
import { FormField } from "@/components/ui/FormField";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Register() {
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
        <FormField
          title="Name"
          value=""
          placeholder="Enter your name"
          type="text"
          handleChangeText={() => {}}
        />

        <FormField
          title="Email"
          value=""
          placeholder="Enter your email"
          type="email"
          handleChangeText={() => {}}
        />
        <FormField
          title="Password"
          value=""
          placeholder="Enter your password"
          type="password"
          handleChangeText={() => {}}
        />

        <FormField
          title="Confirm Password"
          value=""
          placeholder="Confirm your password"
          type="password"
          handleChangeText={() => {}}
        />
      </View>

      <CustomButton
        title="Register"
        handlePress={() => {}}
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
