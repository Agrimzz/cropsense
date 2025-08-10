import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const QuickActions = () => {
  return (
    <View className="w-full px-4 mt-8">
      <Text className="text-base font-pregular text-textPrimary">
        Quick Actions
      </Text>
      <View className="w-full flex flex-row flex-wrap justify-between mt-4">
        <TouchableOpacity className="w-[49%] bg-primary h-[110px]  rounded-3xl items-center justify-center ">
          <Text className="text-background text-base font-pregular text-center">
            Get Crop Recommendations
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-[49%] bg-textSecondary/30 h-[110px]  rounded-3xl items-center justify-center ">
          <Text className="text-textPrimary text-base font-pregular text-center">
            Explore {"\n"} Community Forum
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className=" w-[49%] mt-3 bg-textSecondary/30 h-[110px]  rounded-3xl items-center justify-center ">
          <Text className="text-textPrimary text-base font-pregular text-center">
            Learn {"\n"} About Crops
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuickActions;
