import { usePaginatedApiQuery } from "@/hooks/usePaginatedApiQuery";
import { router } from "expo-router";
import { ChevronLeft, LoaderCircle } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Crop = {
  id: number;
  name: string;
  category: string;
  climate_conditions: string;
  image?: string | null;
};

type CropsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Crop[];
};

const Crops = () => {
  const [page, setPage] = useState(1);
  const [crops, setCrops] = useState<Crop[]>([]); // ✅ accumulate items here

  const { data, isLoading, isFetching } = usePaginatedApiQuery<CropsResponse>(
    ["crops", page],
    `/cropsense/v1/crops/?page=${page}`
  );

  const hasNextPage = Boolean(data?.next);

  useEffect(() => {
    if (!data?.results) return;

    setCrops((prev) =>
      page === 1 ? data.results : [...prev, ...data.results]
    );
  }, [data, page]);

  // ✅ load-more handler
  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <SafeAreaView className="w-full h-screen bg-background px-4">
      {/* Header */}
      <TouchableOpacity
        className="py-2 flex flex-row gap-2 items-center"
        onPress={() => router.back()}
      >
        <ChevronLeft size={24} color="#f5f5dc" strokeWidth={1.5} />
        <Text className="text-textPrimary text-lg font-semibold">
          Recommended Crops
        </Text>
      </TouchableOpacity>

      <View className="flex flex-row justify-between items-center mb-2">
        <Text className="text-base font-pregular text-textPrimary">
          All Crops
        </Text>
        <Text className="text-xs font-pregular text-textSecondary">
          {data?.count ?? 0} available
        </Text>
      </View>

      {isLoading && page === 1 ? (
        <View className="flex flex-row justify-center items-center h-24">
          <LoaderCircle size={24} color="#f5f5dc" strokeWidth={1.5} />
        </View>
      ) : (
        <FlatList
          data={crops}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex flex-row items-center bg-textSecondary/30 rounded-3xl mb-3 p-3"
              onPress={() =>
                router.push({
                  pathname: "/crop/[id]",
                  params: { id: String(item.id) },
                })
              }
            >
              <Image
                source={{
                  uri:
                    item.image ??
                    "https://images.unsplash.com/photo-1511735643442-503bb3bd348a?q=80&w=800&auto=format&fit=crop",
                }}
                className="w-16 h-16 rounded-2xl mr-3"
              />
              <View className="flex-1">
                <Text className="text-textPrimary text-base font-psemibold capitalize">
                  {item.name}
                </Text>
                <Text className="text-textSecondary text-xs font-pregular">
                  {item.category}
                </Text>
                <Text
                  className="text-textSecondary text-xs mt-1"
                  numberOfLines={1}
                >
                  {item.climate_conditions}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            hasNextPage ? (
              <TouchableOpacity
                onPress={handleLoadMore}
                disabled={isFetching}
                className="mt-2 mb-6 self-center px-4 py-2 rounded-2xl bg-textSecondary/40 flex-row items-center"
              >
                {isFetching && (
                  <LoaderCircle
                    size={18}
                    color="#f5f5dc"
                    strokeWidth={1.5}
                    className="mr-2"
                  />
                )}
                <Text className="text-textPrimary text-sm font-pregular">
                  {isFetching ? "Loading more..." : "Load more"}
                </Text>
              </TouchableOpacity>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Crops;
