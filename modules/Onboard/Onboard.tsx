import { CustomButton } from "@/components/ui/CustomButton";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Onboard() {
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
        handlePress={() => {}}
        containerStyles="w-full absolute bottom-12"
        textStyles="font-pbold"
      />
    </SafeAreaView>
  );
}
