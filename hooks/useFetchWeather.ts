import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const WEATHER_API_URL = "https://api.weatherapi.com/v1";
const KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export const useFetchWeather = (location?: {
  lat: number | undefined;
  lon: number | undefined;
}) => {
  return useQuery({
    queryKey: ["weather", location],
    queryFn: async () => {
      if (!location) return null;
      const response = await axios.get(
        `${WEATHER_API_URL}/current.json?key=${KEY}&q=${location.lat},${location.lon}`
      );
      return response.data;
    },
    enabled: !!location,
  });
};
