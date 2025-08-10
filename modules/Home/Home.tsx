import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import LocationCard from "./components/LocationCard";
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

  return (
    <SafeAreaView className="w-full h-screen bg-background">
      <Header />
      <View className="w-full px-4 py-2 mt-4 flex flex-row justify-between items-start">
        <View className="flex gap-1">
          <Text className="text-primary text-2xl font-psemibold">
            Welcome, {"\n"}
            <Text className="text-textPrimary">Ram Bahadur</Text>
          </Text>
          <Text className="text-textSecondary text-sm font-pregular">
            {formattedDate}
          </Text>
        </View>
        <Image
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1686269460470-a44c06f16e0a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="w-20 h-20 rounded-full"
        />
      </View>

      <LocationCard lat={location?.lat} lon={location?.lon} />
    </SafeAreaView>
  );
}
