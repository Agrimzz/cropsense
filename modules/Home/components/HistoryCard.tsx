import { LinearGradient } from "expo-linear-gradient";
import {
  Bubbles,
  CloudRain,
  Feather,
  Sprout,
  Thermometer,
} from "lucide-react-native";
import React from "react";
import { ImageBackground, Text, View } from "react-native";

const HistoryCard = ({ crop, score, temp, rain, humidity, ph, img }: any) => {
  return (
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
            <Text className="text-textPrimary text-lg font-pregular">Crop</Text>
          </View>
          <Text className="text-primary text-2xl font-psemibold">{crop}</Text>
        </View>
        <View className=" gap-1">
          <Text className="text-textPrimary text-base font-pregular text-right">
            Score
          </Text>
          <Text className="text-primary text-6xl font-psemibold">{score}%</Text>
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
          <Text className="text-textPrimary text-sm font-pregular">{temp}</Text>
        </View>
        <View className="items-center">
          <CloudRain
            size={24}
            color="#f5f5dc"
            strokeWidth={1.5}
            opacity={0.7}
          />
          <Text className="text-textPrimary text-sm font-pregular">{rain}</Text>
        </View>
        <View className="items-center">
          <Bubbles size={24} color="#f5f5dc" strokeWidth={1.5} opacity={0.7} />
          <Text className="text-textPrimary text-sm font-pregular">
            {humidity}
          </Text>
        </View>
        <View className="items-center">
          <Feather size={24} color="#f5f5dc" strokeWidth={1.5} opacity={0.7} />
          <Text className="text-textPrimary text-sm font-pregular">{ph}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HistoryCard;
