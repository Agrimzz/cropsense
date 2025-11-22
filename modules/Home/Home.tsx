import { useApiQuery } from "@/hooks/useApiQuery";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import History from "./components/History";
import QuickActions from "./components/QuickActions";
import WeatherCard from "./components/WeatherCard";
import { UserType } from "./Home.type";
export function Home() {
  const date = new Date();
  const formattedDate = date
    .toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(/, (?=\d{4}$)/, " ");

  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );

  useEffect(() => {
    (async () => {
      // Try to load location from storage first
      const storedLocation = await AsyncStorage.getItem("userLocation");
      if (storedLocation) {
        setLocation(JSON.parse(storedLocation));
        return;
      }

      // If not found, get current location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let loc = await Location.getCurrentPositionAsync({});
      const newLocation = {
        lat: loc.coords.latitude,
        lon: loc.coords.longitude,
      };
      setLocation(newLocation);

      // Save to AsyncStorage
      await AsyncStorage.setItem("userLocation", JSON.stringify(newLocation));
    })();
  }, []);

  const { data: user } = useApiQuery<UserType>(["user"], "/accounts/v1/me/");

  return (
    <SafeAreaView className="w-full h-screen bg-background">
      <ScrollView>
        <Header />

        <View className="w-full px-4 py-2 mt-4 flex flex-row justify-between items-start">
          <View className="flex gap-1">
            <Text className="text-primary text-2xl font-psemibold">
              Welcome, {"\n"}
              <Text className="text-textPrimary">
                {user?.full_name ?? "User"}{" "}
              </Text>
            </Text>
            <Text className="text-textSecondary text-sm font-pregular">
              {formattedDate}
            </Text>
          </View>
          <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
            <Text className="text-background text-3xl font-pbold ">
              {user?.full_name.charAt(0) ?? "U"}
            </Text>
          </View>
        </View>

        <WeatherCard lat={location?.lat} lon={location?.lon} />

        <QuickActions />

        <History />
      </ScrollView>
    </SafeAreaView>
  );
}
