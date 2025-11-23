import { useFetchWeather } from "@/hooks/useFetchWeather";
import { LoaderCircle, MapPin } from "lucide-react-native";
import React from "react";
import { Image, Text, View } from "react-native";

const WeatherCard = ({
  lat,
  lon,
}: {
  lat: number | undefined;
  lon: number | undefined;
}) => {
  const { data, isLoading } = useFetchWeather({
    lat,
    lon,
  });

  const noLocation = lat == null || lon == null;

  if (isLoading || noLocation || !data) {
    return (
      <View className="w-full px-4 mt-4">
        <View className="w-full min-h-[200px] bg-textSecondary/30 rounded-3xl p-4 items-center justify-center">
          {isLoading && !noLocation ? (
            <LoaderCircle
              size={24}
              color="#f5f5dc"
              strokeWidth={1.5}
              className="animate-spin"
            />
          ) : (
            <Text className="text-textPrimary text-sm font-pregular">
              {noLocation
                ? "Location not available"
                : "Unable to load weather data"}
            </Text>
          )}
        </View>
      </View>
    );
  }

  const temp = data.current?.temp_c;
  const feelsLike = data.current?.feelslike_c;
  const humidity = data.current?.humidity;
  const precip = data.current?.precip_mm;
  const pressure = data.current?.pressure_mb;
  const wind = data.current?.wind_kph;
  const condition = data.current?.condition;

  return (
    <View className="w-full px-4 mt-8">
      <View className="w-full bg-textSecondary/30 rounded-3xl p-4 items-start">
        <View className="flex flex-row gap-1 items-center">
          <MapPin size={16} color="#f5f5dc" strokeWidth={1.5} />
          <Text className="text-textPrimary text-sm font-pregular">
            {data.location?.name}, {data.location?.country}
          </Text>
        </View>

        <View className="w-full flex flex-row justify-between items-center mt-4">
          <View className="flex gap-1">
            <Text className="text-textPrimary text-4xl font-psemibold">
              {temp != null ? `${temp.toFixed(0)} °C` : "--"}
            </Text>
            <Text className="text-sm font-pregular text-textPrimary">
              Feels like{" "}
              {feelsLike != null ? `${feelsLike.toFixed(0)} °C` : "--"}
            </Text>
          </View>

          <View className="flex items-center">
            {condition?.icon && (
              <Image
                source={{ uri: `https:${condition.icon}` }}
                className="w-20 h-20 -mt-4"
              />
            )}
            <Text className="text-sm font-pregular text-textPrimary text-center">
              {condition?.text ?? ""}
            </Text>
          </View>
        </View>

        <View className="w-full flex flex-row justify-between items-center mt-4">
          <View className="items-center">
            <Text className="text-sm font-pregular text-textPrimary/50">
              Humidity
            </Text>
            <Text className="text-lg font-psemibold text-textPrimary">
              {humidity != null ? `${humidity}%` : "--"}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-sm font-pregular text-textPrimary/50">
              Precipitation
            </Text>
            <Text className="text-lg font-psemibold text-textPrimary">
              {precip != null ? `${precip} mm` : "--"}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-sm font-pregular text-textPrimary/50">
              Pressure
            </Text>
            <Text className="text-lg font-psemibold text-textPrimary">
              {pressure != null ? `${pressure} mb` : "--"}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-sm font-pregular text-textPrimary/50">
              Wind
            </Text>
            <Text className="text-lg font-psemibold text-textPrimary">
              {wind != null ? `${wind} km/h` : "--"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WeatherCard;
