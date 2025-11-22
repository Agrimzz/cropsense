import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import {
  Bubbles,
  ChevronLeft,
  CloudRain,
  Feather,
  LoaderCircle,
  Sprout,
  Thermometer,
} from "lucide-react-native";
import { useEffect } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function RecommendationDetail() {
  const { id } = useLocalSearchParams();

  const { data: recommendation, isLoading } = useApiQuery<any>(
    ["recommendation", id],
    `/cropsense/v1/input-data/${id}/`
  );

  // Second API call (but don’t run immediately)
  const {
    mutateAsync: fetchCropDetail,
    data: cropDetail,
    isPending,
  } = useApiMutation<any>("post", `/cropsense/v1/describe-crop/`);

  // Wait for the first request to finish, then trigger the second
  useEffect(() => {
    if (recommendation?.recommendations?.[0]) {
      fetchCropDetail({
        crop_name: recommendation.recommendations[0].recommended_crop.name,
        input_data: {
          nitrogen: recommendation.nitrogen,
          ph: recommendation.ph,
          rainfall: recommendation.rainfall,
          temperature: recommendation.temperature,
        },
      });
    }
  }, [recommendation, fetchCropDetail]);

  if (isLoading || isPending) {
    return (
      <View className="w-full h-screen bg-background px-4">
        <View className="flex flex-row justify-center items-center h-full">
          <LoaderCircle
            size={24}
            color="#f5f5dc"
            strokeWidth={1.5}
            className="animate-spin"
          />
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView className="w-full h-screen bg-background px-4">
      <TouchableOpacity
        className="py-2 flex flex-row gap-2 items-center"
        onPress={() => router.back()}
      >
        <ChevronLeft size={24} color="#f5f5dc" strokeWidth={1.5} />
        <Text className="text-textPrimary text-lg font-semibold">
          Recommended Crops
        </Text>
      </TouchableOpacity>
      <View className="gap-4 bg-textSecondary/30 rounded-3xl p-4 mt-4">
        <Text className="text-textPrimary text-lg font-psemibold py-2">
          User Inputs
        </Text>
        <View className="flex flex-row justify-between items-center">
          <View className="items-center">
            <Thermometer
              size={24}
              color="#f5f5dc"
              strokeWidth={1.5}
              opacity={0.7}
            />
            <Text className="text-textPrimary text-sm font-pregular">
              {recommendation?.temperature ?? "N/A"} °C
            </Text>
          </View>
          <View className="items-center">
            <CloudRain
              size={24}
              color="#f5f5dc"
              strokeWidth={1.5}
              opacity={0.7}
            />
            <Text className="text-textPrimary text-sm font-pregular">
              {recommendation?.rainfall ?? "N/A"} mm
            </Text>
          </View>
          <View className="items-center">
            <Bubbles
              size={24}
              color="#f5f5dc"
              strokeWidth={1.5}
              opacity={0.7}
            />
            <Text className="text-textPrimary text-sm font-pregular">
              {recommendation?.humidity ?? "N/A"} %
            </Text>
          </View>
          <View className="items-center">
            <Feather
              size={24}
              color="#f5f5dc"
              strokeWidth={1.5}
              opacity={0.7}
            />
            <Text className="text-textPrimary text-sm font-pregular">
              {recommendation?.ph ?? "N/A"} pH
            </Text>
          </View>
        </View>
      </View>

      <ImageBackground
        source={{
          uri:
            recommendation?.recommendations[0]?.recommended_crop.image ??
            "https://images.unsplash.com/photo-1511735643442-503bb3bd348a?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        className="w-full  rounded-3xl overflow-hidden flex justify-between p-4 relative mt-2"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.9)", "rgba(0,0,0,0.5)", "transparent"]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderRadius: 20,
          }}
        />
        <View className="flex flex-row justify-between items-start">
          <View>
            <Text className="text-3xl font-psemibold text-primary">
              #{recommendation.recommendations[0]?.rank}
            </Text>
            <View className="flex flex-row gap-1 mt-4">
              <Sprout size={24} color="#f5f5dc" strokeWidth={1.5} />
              <Text className="text-textPrimary text-lg font-pregular">
                Crop
              </Text>
            </View>
            <Text className="text-primary text-2xl font-psemibold capitalize">
              {recommendation.recommendations[0]?.recommended_crop.name}
            </Text>
          </View>
          <View className=" gap-1">
            <Text className="text-textPrimary text-base font-pregular text-right">
              Score
            </Text>
            <Text className="text-primary text-6xl font-psemibold">
              {recommendation.recommendations[0]?.confidence}%
            </Text>
          </View>
        </View>

        <View className="flex flex-row justify-between items-center mt-8">
          <View className="items-center">
            <Text className="text-textPrimary text-xs font-pregular">
              Altitude
            </Text>
            <Text className="text-textPrimary text-base font-pregular">
              {recommendation.recommendations[0]?.recommended_crop.altitude ??
                "N/A"}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-textPrimary text-xs font-pregular">
              Soil Moisture
            </Text>
            <Text className="text-textPrimary text-base font-pregular">
              {recommendation.recommendations[0]?.recommended_crop
                .soil_moisture ?? "N/A"}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-textPrimary text-xs font-pregular">
              Heat Stress
            </Text>
            <Text className="text-textPrimary text-base font-pregular">
              {recommendation.recommendations[0]?.recommended_crop
                .heat_stress ?? "N/A"}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-textPrimary text-xs font-pregular">
              Cold Stress
            </Text>
            <Text className="text-textPrimary text-base font-pregular">
              {recommendation.recommendations[0]?.recommended_crop
                .cold_stress ?? "N/A"}
            </Text>
          </View>
        </View>

        <Text className="mt-4 text-sm text-textPrimary font-pregular">
          Under the measeurd conditiion on the date{" "}
          {new Date(recommendation?.submitted_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          , The crop {recommendation.recommendations[0]?.recommended_crop.name}{" "}
          is a good choice for your crop. Under the measure condition of
          nitrogen level {recommendation.nitrogen} and pH level{" "}
          {recommendation?.ph}, the soil is{" "}
          {recommendation.recommendations[0]?.confidence}% suitable for your
          crop.
        </Text>
      </ImageBackground>

      <View className="flex flex-row justify-between">
        <ImageBackground
          source={{
            uri:
              recommendation?.recommendations[1]?.recommended_crop.image ??
              "https://images.unsplash.com/photo-1511735643442-503bb3bd348a?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="w-[49%] rounded-3xl overflow-hidden flex justify-between p-4 relative mt-2"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.9)", "rgba(0,0,0,0.5)", "transparent"]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              borderRadius: 20,
            }}
          />
          <View className="flex  justify-between items-start">
            <View>
              <Text className="text-lg font-psemibold text-textPrimary">
                #{recommendation.recommendations[1]?.rank}
              </Text>
              <View className="flex flex-row gap-1 mt-2">
                <Sprout size={16} color="#f5f5dc" strokeWidth={1.5} />
                <Text className="text-textPrimary text-xs font-pregular">
                  Crop
                </Text>
              </View>
              <Text className="text-primary text-base font-psemibold capitalize">
                {recommendation.recommendations[1]?.recommended_crop.name}
              </Text>
            </View>
            <View className=" gap-1 mt-2">
              <Text className="text-textPrimary text-xs font-pregular ">
                Score
              </Text>
              <Text className="text-primary text-2xl font-psemibold">
                {recommendation.recommendations[1]?.confidence}%
              </Text>
            </View>
          </View>
        </ImageBackground>
        <ImageBackground
          source={{
            uri:
              recommendation?.recommendations[2]?.recommended_crop.image ??
              "https://images.unsplash.com/photo-1511735643442-503bb3bd348a?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="w-[49%] rounded-3xl overflow-hidden flex justify-between p-4 relative mt-2"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.9)", "rgba(0,0,0,0.5)", "transparent"]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              borderRadius: 20,
            }}
          />
          <View className="flex  justify-between items-start">
            <View>
              <Text className="text-lg font-psemibold text-textPrimary">
                #{recommendation.recommendations[2]?.rank}
              </Text>
              <View className="flex flex-row gap-1 mt-2">
                <Sprout size={16} color="#f5f5dc" strokeWidth={1.5} />
                <Text className="text-textPrimary text-xs font-pregular">
                  Crop
                </Text>
              </View>
              <Text className="text-primary text-base font-psemibold capitalize">
                {recommendation.recommendations[2]?.recommended_crop.name}
              </Text>
            </View>
            <View className=" gap-1 mt-2">
              <Text className="text-textPrimary text-xs font-pregular ">
                Score
              </Text>
              <Text className="text-primary text-2xl font-psemibold">
                {recommendation.recommendations[2]?.confidence}%
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      {/* <Text className="text-lg font-psemibold text-textPrimary mt-4">
        Why {recommendation.recommendations[0]?.recommended_crop.name} is the
        best?
      </Text>
      <Text className="mt-4 text-sm text-textPrimary font-pregular ">
        {cropDetail?.description}
      </Text> */}
    </SafeAreaView>
  );
}
