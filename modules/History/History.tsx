import { useApiQuery } from "@/hooks/useApiQuery";
import { router } from "expo-router";
import { LoaderCircle, Plus } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HistoryCard from "../Home/components/HistoryCard";

export function History() {
  const { data: history, isLoading } = useApiQuery<any>(
    ["history"],
    "/cropsense/v1/input-data/"
  );

  return (
    <SafeAreaView className="w-full h-screen bg-background px-4">
      <View className="flex flex-row justify-between items-center py-2">
        <View className="gap-1">
          <Text className="text-textPrimary text-2xl font-psemibold">
            History
          </Text>
          <Text className="text-textSecondary text-xs font-pregular">
            Your Crop Recommendation History
          </Text>
        </View>
        <TouchableOpacity
          className="bg-primary rounded-full p-2"
          onPress={() => router.push("/recommend")}
        >
          <Plus size={24} color="#212121" strokeWidth={1.5} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View className="flex flex-row justify-center items-center h-full">
          <LoaderCircle
            size={24}
            color="#f5f5dc"
            strokeWidth={1.5}
            className="animate-spin"
          />
        </View>
      ) : (
        <FlatList
          data={history}
          ListEmptyComponent={
            <View className="flex flex-row justify-center items-center h-full">
              <Text className="text-textPrimary text-2xl font-psemibold">
                No History Found
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <HistoryCard
              crop={item?.recommendations[0].recommended_crop.name}
              score={item?.recommendations[0].confidence}
              id={item?.id}
              temp={item?.nitrogen}
              rain={item?.rainfall}
              humidity={item?.humidity}
              ph={item?.ph}
              img={
                item?.recommendations[0].recommended_crop.image ||
                "https://images.unsplash.com/photo-1511735643442-503bb3bd348a?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </SafeAreaView>
  );
}
