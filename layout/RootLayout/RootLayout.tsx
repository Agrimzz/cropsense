import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../../app/global.css";
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();
export function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    LufgaBlack: require("../../assets/fonts/LufgaBlack.ttf"),
    LufgaBlackItalic: require("../../assets/fonts/LufgaBlackItalic.ttf"),
    LufgaBold: require("../../assets/fonts/LufgaBold.ttf"),
    LufgaBoldItalic: require("../../assets/fonts/LufgaBoldItalic.ttf"),
    LufgaExtraBold: require("../../assets/fonts/LufgaExtraBold.ttf"),
    LufgaExtraBoldItalic: require("../../assets/fonts/LufgaExtraBoldItalic.ttf"),
    LufgaExtraLight: require("../../assets/fonts/LufgaExtraLight.ttf"),
    LufgaExtraLightItalic: require("../../assets/fonts/LufgaExtraLightItalic.ttf"),
    LufgaLightItalic: require("../../assets/fonts/LufgaLightItalic.ttf"),
    LufgaLight: require("../../assets/fonts/LufgaLight.ttf"),
    LufgaMedium: require("../../assets/fonts/LufgaMedium.ttf"),
    LufgaRegular: require("../../assets/fonts/LufgaRegular.ttf"),
    LufgaSemiBold: require("../../assets/fonts/LufgaSemiBold.ttf"),
    LufgaThin: require("../../assets/fonts/LufgaThin.ttf"),
    LufgaMediumItalic: require("../../assets/fonts/LufgaMediumItalic.ttf"),
    LufgaItalic: require("../../assets/fonts/LufgaItalic.ttf"),
    LufgaSemiBoldItalic: require("../../assets/fonts/LufgaSemiBoldItalic.ttf"),
    LufgaThinItalic: require("../../assets/fonts/LufgaThinItalic.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
