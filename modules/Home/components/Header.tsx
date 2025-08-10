import { clearTokens } from "@/utils/storage";
import { router } from "expo-router";
import { LogOut } from "lucide-react-native";
import React from "react";
import { Alert, Text, View } from "react-native";

const Header = () => {
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => {
            clearTokens();
            router.replace("/login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="w-full flex flex-row justify-between items-center px-4 py-2">
      <View className="flex flex-row gap-1 items-center">
        <Text className="text-textPrimary font-psemibold text-sm">
          Cropsense
        </Text>
      </View>
      <LogOut color="red" strokeWidth={1.5} onPress={handleLogout} />
    </View>
  );
};

export default Header;
