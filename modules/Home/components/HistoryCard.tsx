import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Bubbles,
  CloudRain,
  Feather,
  Sprout,
  Thermometer,
} from "lucide-react-native";
import React from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";

const HistoryCard = ({
  id,
  crop,
  score,
  temp,
  rain,
  humidity,
  ph,
  img,
}: any) => {
  return (
    <Pressable onPress={() => router.push(`/recommendation/${id}`)}>
      <ImageBackground
        source={{ uri: img }}
        className="w-full rounded-3xl overflow-hidden flex justify-between p-4 relative mt-2"
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
            <View className="flex flex-row gap-1">
              <Sprout size={24} color="#f5f5dc" strokeWidth={1.5} />
              <Text className="text-textPrimary text-lg font-pregular">
                Crop
              </Text>
            </View>
            <Text className="text-primary text-2xl font-psemibold capitalize">
              {crop}
            </Text>
          </View>
          <View className=" gap-1">
            <Text className="text-textPrimary text-base font-pregular text-right">
              Score
            </Text>
            <Text className="text-primary text-6xl font-psemibold">
              {score ?? "N/A"}%
            </Text>
          </View>
        </View>

        <View className="flex flex-row justify-between items-center mt-8">
          <View className="items-center">
            <Thermometer
              size={24}
              color="#f5f5dc"
              strokeWidth={1.5}
              opacity={0.7}
            />
            <Text className="text-textPrimary text-sm font-pregular">
              {temp ?? "N/A"} °C
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
              {rain ?? "N/A"} mm
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
              {humidity ?? "N/A"} %
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
              {ph ?? "N/A"} pH
            </Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default HistoryCard;
