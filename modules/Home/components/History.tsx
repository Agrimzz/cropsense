import { useApiQuery } from "@/hooks/useApiQuery";
import { router } from "expo-router";
import { LoaderCircle } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import HistoryCard from "./HistoryCard";

const History = () => {
  const { data: history, isLoading } = useApiQuery<any>(
    ["history"],
    "/cropsense/v1/input-data/"
  );

  const historyPreview = history?.slice(0, 3) ?? [];

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

      <View className="mt-4 mb-12">
        {isLoading ? (
          <View className="flex flex-row justify-center items-center h-full">
            <LoaderCircle
              size={24}
              color="#f5f5dc"
              strokeWidth={1.5}
              className="animate-spin"
            />
          </View>
        ) : historyPreview.length === 0 ? (
          <View className="flex flex-row justify-center items-center h-full">
            <Text className="text-textPrimary text-2xl font-psemibold">
              No History Found. Start by requesting a crop recommendation.
            </Text>
          </View>
        ) : (
          historyPreview.map((item: any) => (
            <HistoryCard
              key={item.id}
              crop={item?.recommendations[0].recommended_crop.name}
              score={item?.recommendations[0].confidence}
              id={item?.id}
              temp={item?.temperature}
              rain={item?.rainfall}
              humidity={item?.humidity}
              ph={item?.ph}
              img={
                item?.recommendations[0].recommended_crop.image ||
                "https://images.unsplash.com/photo-1511735643442-503bb3bd348a?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          ))
        )}
      </View>
    </View>
  );
};

export default History;
