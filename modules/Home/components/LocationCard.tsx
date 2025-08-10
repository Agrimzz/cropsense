import { useFetchWeather } from "@/hooks/useFetchWeather";
import { MapPin } from "lucide-react-native";
import React from "react";
import { Image, Text, View } from "react-native";

const LocationCard = ({
  lat,
  lon,
}: {
  lat: number | undefined;
  lon: number | undefined;
}) => {
  const { data, isLoading } = useFetchWeather({
    lat: lat,
    lon: lon,
  });

  if (isLoading || (!lat && !lon)) {
    return (
      <View className="w-full px-4">
        <View className="w-full bg-textSecondary/30 rounded-3xl p-4 animate-pulse items-center justify-center">
          <Text className="text-textPrimary text-sm font-pregular">
            {isLoading ? "Loading..." : "Location not available"}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View className="w-full px-4">
      <View className="w-full  bg-textSecondary/30 rounded-3xl p-4">
        <View className="flex flex-row gap-1 items-center">
          <MapPin size={16} color="#f5f5dc" strokeWidth={1.5} />
          <Text className="text-textPrimary text-sm font-pregular">
            {data?.location?.name}, {data?.location?.country}
          </Text>
        </View>

        <View className="w-full flex flex-row justify-between items-center mt-4 ">
          <View className="flex gap-1">
            <Text className="text-textPrimary text-4xl font-psemibold">
              {data?.current?.temp_c.toFixed(0)} °C
            </Text>
            <Text className="text-sm font-pregular text-textPrimary">
              Feels like {data?.current?.feelslike_c.toFixed(0)} °C
            </Text>
          </View>

          <View className="flex align-center">
            <Image
              source={{ uri: `https:${data?.current?.condition?.icon}` }}
              className="w-20 h-20 -mt-4"
            />
            <Text className="text-sm font-pregular text-textPrimary text-center">
              {data?.current?.condition?.text}
            </Text>
          </View>
        </View>

        <View className="w-full flex flex-row justify-between items-center mt-4 ">
          <View className="items-center">
            <Text className="text-sm font-pregular color-textPrimary/50">
              Humidity
            </Text>
            <Text className="text-lg font-psemibold text-textPrimary ">
              {data?.current?.humidity}%
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-sm font-pregular color-textPrimary/50">
              Perception
            </Text>
            <Text className="text-lg font-psemibold text-textPrimary ">
              {data?.current?.precip_mm}mm
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-sm font-pregular color-textPrimary/50">
              Pressure
            </Text>
            <Text className="text-lg font-psemibold text-textPrimary ">
              {data?.current?.pressure_mb}mb
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-sm font-pregular color-textPrimary/50">
              Wind
            </Text>
            <Text className="text-lg font-psemibold text-textPrimary ">
              {data?.current?.wind_kph}km/h
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LocationCard;
