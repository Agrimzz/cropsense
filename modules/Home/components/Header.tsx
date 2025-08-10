import { Menu } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

const Header = () => {
  return (
    <View className="w-full flex flex-row justify-between items-center px-4 py-2 ">
      <View className="flex flex-row gap-1 items-center">
        <Text className="text-textPrimary font-psemibold text-sm">
          Cropsense
        </Text>
      </View>
      <Menu color="#f5f5dc" strokeWidth={1.5} />
    </View>
  );
};

export default Header;
