import { api } from "@/api/client";
import { CustomButton } from "@/components/ui/CustomButton";
import { clearTokens, getRefreshToken, saveTokens } from "@/utils/storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Onboard() {
  useEffect(() => {
    const tryRefresh = async () => {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) return;

      try {
        const res = await api.post("/accounts/v1/token/refresh/", {
          refresh: refreshToken,
        });
        const { access } = res.data;
        await saveTokens(access, refreshToken);
        router.replace("/home");
      } catch {
        await clearTokens();
      }
    };
    tryRefresh();
  }, []);
  return (
    <SafeAreaView className="w-full h-screen bg-background flex items-center justify-center px-4 relative">
      <View className="flex gap-1">
        <Text className="text-textPrimary font-psemibold text-sm">
          CropSense
        </Text>
      </View>

      <Text className="text-textPrimary font-psemibold text-4xl mt-12 text-center">
        Grow <Text className="text-primary">Smarter</Text>,{"\n"} Grow{" "}
        <Text className="text-primary">Better</Text> with {"\n"}Cropsense
      </Text>
      <Text className="text-xs font-pregular text-textSecondary mt-4 text-center">
        Get personalized crop recommendations{"\n"} based on your soil analysis
        and local conditions
      </Text>
      <CustomButton
        title="Get Started"
        handlePress={() => {
          router.push("/login");
        }}
        containerStyles="w-full absolute bottom-12"
        textStyles="font-pbold"
      />
    </SafeAreaView>
  );
}
