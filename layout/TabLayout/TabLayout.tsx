import { Tabs } from "expo-router";
import { History, House, User } from "lucide-react-native";
import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

function TabIcon({ focused, Icon }: any) {
  const active = "#C3FF0A";
  const inactive = "#f5f5dc";

  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (focused) {
      scale.value = withTiming(1.2, {
        duration: 180,
        easing: Easing.out(Easing.quad),
      });
      translateY.value = withTiming(-4, {
        duration: 180,
        easing: Easing.out(Easing.quad),
      });
    } else {
      scale.value = withTiming(1, {
        duration: 180,
        easing: Easing.out(Easing.quad),
      });
      translateY.value = withTiming(0, {
        duration: 180,
        easing: Easing.out(Easing.quad),
      });
    }
  }, [focused, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className="items-center justify-center"
    >
      <Icon
        size={26}
        color={focused ? active : inactive}
        strokeWidth={focused ? 2 : 1.5}
      />
    </Animated.View>
  );
}

export function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarStyle: {
          backgroundColor: "rgba(97,97,97,0.5)",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 50,
          position: "absolute",
          borderWidth: 1,
          borderColor: "rgba(97,97,97,0.3)",
        },
      }}
      safeAreaInsets={{ bottom: 0 }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={House} />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "history",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={History} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={User} />
          ),
        }}
      />
    </Tabs>
  );
}
