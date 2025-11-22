import { FormField } from "@/components/ui/FormField";
import { useApiQuery } from "@/hooks/useApiQuery";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserType } from "../Home/Home.type";

export function Profile() {
  const { data: user } = useApiQuery<UserType>(["user"], "/accounts/v1/me/");
  return (
    <SafeAreaView className="w-full h-screen bg-background px-4">
      <View className="py-2">
        <Text className="text-textPrimary text-2xl font-psemibold">
          Profile
        </Text>
      </View>

      <View className="mt-4 gap-4 items-center">
        <View className="flex items-center justify-center w-48 rounded-full h-48 bg-primary">
          <Text className="text-background text-7xl font-pbold ">
            {user?.full_name.charAt(0) ?? "U"}
          </Text>
        </View>
        <FormField
          title="Name"
          placeholder="Enter your name"
          value={user?.full_name}
          handleChangeText={(text: string) => console.log(text)}
          disabled={true}
        />
        <FormField
          title="Email"
          placeholder="Enter your email"
          value={user?.email}
          handleChangeText={(text: string) => console.log(text)}
          disabled={true}
        />
      </View>
    </SafeAreaView>
  );
}
