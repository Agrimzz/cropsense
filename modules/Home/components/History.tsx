import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import HistoryCard from "./HistoryCard";

const History = () => {
  return (
    <View className="w-full px-4 mt-8">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-base font-pregular text-textPrimary">
          History
        </Text>
        <Text
          className="text-base font-pregular text-textPrimary underline"
          onPress={() => {
            router.push("/history");
          }}
        >
          View All {">>"}
        </Text>
      </View>

      <View className="mt-4 gap-4 mb-12">
        <HistoryCard
          crop="Tomato"
          score={80}
          temp="25°C"
          rain="10mm"
          humidity="60%"
          ph="7.0"
          img="https://images.unsplash.com/photo-1566218246241-934ad8b38ea6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <HistoryCard
          crop="Cucumber"
          score={80}
          temp="25°C"
          rain="10mm"
          humidity="60%"
          ph="7.0"
          img="https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <HistoryCard
          crop="Carrot"
          score={80}
          temp="25°C"
          rain="10mm"
          humidity="60%"
          ph="7.0"
          img="https://plus.unsplash.com/premium_photo-1680344513213-0ad1795f766b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </View>
    </View>
  );
};

export default History;
