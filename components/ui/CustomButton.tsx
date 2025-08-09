import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { CustomButtonProps } from "./CustomButton.type";

export function CustomButton({
  title,
  handlePress,
  containerStyles = "",
  textStyles = "",
  isLoading = false,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-primary rounded-3xl min-h-[50px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-background font-psemibold  ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
