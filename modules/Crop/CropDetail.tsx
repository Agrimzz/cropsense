import { useApiQuery } from "@/hooks/useApiQuery";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, LoaderCircle } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Crop = {
  id: number;
  name: string;
  category: string;
  climate_conditions: string;
  temperature_range?: string;
  light_intensity?: string;
  relative_humidity?: string;
  annual_precipitation?: string;
  soil_moisture?: string;
  soil_nutrients?: string;
  altitude?: string;
  topography?: string;
  frost?: string;
  heat_stress?: string;
  cold_stress?: string;
  day_length?: string;
  air_quality?: string;
  shade?: string;
  image?: string | null;
};

const CropDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: crop,
    isLoading,
    isError,
    error,
  } = useApiQuery<Crop>(["crop", id], `/cropsense/v1/crops/${id}/`);

  const fallbackImage =
    "https://images.unsplash.com/photo-1511735643442-503bb3bd348a?q=80&w=800&auto=format&fit=crop";

  return (
    <SafeAreaView className="w-full h-screen bg-background px-4">
      <View className="flex flex-row items-center gap-2 py-2">
        <ChevronLeft
          size={24}
          color="#f5f5dc"
          strokeWidth={1.5}
          onPress={() => router.back()}
        />
        <Text className="text-textPrimary text-lg font-semibold">
          Crop Details
        </Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <LoaderCircle size={28} color="#f5f5dc" strokeWidth={1.5} />
          <Text className="text-textSecondary text-xs mt-2">
            Loading crop information...
          </Text>
        </View>
      ) : isError || !crop ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-textPrimary text-base font-psemibold mb-1">
            Failed to load crop
          </Text>
          <Text className="text-textSecondary text-xs text-center">
            {String((error as any)?.message ?? "Please try again later.")}
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="mt-2"
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <View className="w-full h-48 bg-textSecondary/20 rounded-3xl overflow-hidden mb-4">
            <Image
              source={{ uri: crop.image ?? fallbackImage }}
              className="w-full h-full"
            />
          </View>

          <View className="mb-4">
            <Text className="text-textPrimary text-2xl font-psemibold capitalize">
              {crop.name}
            </Text>
            {crop.category ? (
              <Text className="text-textSecondary text-sm font-pregular mt-1">
                {crop.category}
              </Text>
            ) : null}
          </View>

          {/* Climate overview */}
          {crop.climate_conditions ? (
            <View className="mb-4">
              <Text className="text-textPrimary text-base font-psemibold mb-1">
                Climate Conditions
              </Text>
              <Text className="text-textSecondary text-sm font-pregular leading-5">
                {crop.climate_conditions}
              </Text>
            </View>
          ) : null}

          {/* Quick stats grid */}
          <View className="flex flex-row flex-wrap gap-2 mb-4">
            {crop.temperature_range ? (
              <View className="bg-textSecondary/20 px-3 py-2 rounded-2xl">
                <Text className="text-textSecondary text-xs font-pregular">
                  Temperature
                </Text>
                <Text className="text-textPrimary text-sm font-psemibold">
                  {crop.temperature_range}
                </Text>
              </View>
            ) : null}

            {crop.relative_humidity ? (
              <View className="bg-textSecondary/20 px-3 py-2 rounded-2xl">
                <Text className="text-textSecondary text-xs font-pregular">
                  Humidity
                </Text>
                <Text className="text-textPrimary text-sm font-psemibold">
                  {crop.relative_humidity}
                </Text>
              </View>
            ) : null}

            {crop.annual_precipitation ? (
              <View className="bg-textSecondary/20 px-3 py-2 rounded-2xl">
                <Text className="text-textSecondary text-xs font-pregular">
                  Rainfall
                </Text>
                <Text className="text-textPrimary text-sm font-psemibold">
                  {crop.annual_precipitation}
                </Text>
              </View>
            ) : null}

            {crop.light_intensity ? (
              <View className="bg-textSecondary/20 px-3 py-2 rounded-2xl">
                <Text className="text-textSecondary text-xs font-pregular">
                  Light
                </Text>
                <Text className="text-textPrimary text-sm font-psemibold">
                  {crop.light_intensity}
                </Text>
              </View>
            ) : null}
          </View>

          {crop.soil_moisture || crop.soil_nutrients ? (
            <View className="mb-4">
              <Text className="text-textPrimary text-base font-psemibold mb-1">
                Soil Requirements
              </Text>
              {crop.soil_moisture ? (
                <Text className="text-textSecondary text-sm font-pregular mb-1">
                  • Moisture: {crop.soil_moisture}
                </Text>
              ) : null}
              {crop.soil_nutrients ? (
                <Text className="text-textSecondary text-sm font-pregular mb-1">
                  • Nutrients: {crop.soil_nutrients}
                </Text>
              ) : null}
            </View>
          ) : null}

          {crop.heat_stress || crop.cold_stress || crop.frost ? (
            <View className="mb-4">
              <Text className="text-textPrimary text-base font-psemibold mb-1">
                Stress & Tolerance
              </Text>
              {crop.heat_stress ? (
                <Text className="text-textSecondary text-sm font-pregular mb-1">
                  • Heat stress: {crop.heat_stress}
                </Text>
              ) : null}
              {crop.cold_stress ? (
                <Text className="text-textSecondary text-sm font-pregular mb-1">
                  • Cold stress: {crop.cold_stress}
                </Text>
              ) : null}
              {crop.frost ? (
                <Text className="text-textSecondary text-sm font-pregular mb-1">
                  • Frost: {crop.frost}
                </Text>
              ) : null}
            </View>
          ) : null}

          {crop.altitude ||
          crop.topography ||
          crop.day_length ||
          crop.shade ||
          crop.air_quality ? (
            <View className="mb-4">
              <Text className="text-textPrimary text-base font-psemibold mb-1">
                Environment
              </Text>
              {crop.altitude ? (
                <Text className="text-textSecondary text-sm font-pregular mb-1">
                  • Altitude: {crop.altitude}
                </Text>
              ) : null}
              {crop.topography ? (
                <Text className="text-textSecondary text-sm font-pregular mb-1">
                  • Topography: {crop.topography}
                </Text>
              ) : null}
              {crop.day_length ? (
                <Text className="text-textSecondary text-sm font-pregular mb-1">
                  • Day length: {crop.day_length}
                </Text>
              ) : null}
              {crop.shade ? (
                <Text className="text-textSecondary text-sm font-pregular mb-1">
                  • Shade: {crop.shade}
                </Text>
              ) : null}
              {crop.air_quality ? (
                <Text className="text-textSecondary text-sm font-pregular mb-1">
                  • Air quality: {crop.air_quality}
                </Text>
              ) : null}
            </View>
          ) : null}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CropDetail;
