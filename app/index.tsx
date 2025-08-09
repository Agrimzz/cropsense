import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="w-full h-screen bg-background">
      <Text className="text-textPrimary font-pbold text-2xl">Home</Text>
    </SafeAreaView>
  );
};

export default Home;
