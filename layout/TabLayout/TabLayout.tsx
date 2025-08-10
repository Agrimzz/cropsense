import { Tabs } from "expo-router";
import { History, House, User } from "lucide-react-native";
import { Text, View } from "react-native";

function TabIcon({ focused, Icon, title }: any) {
  if (focused) {
    return (
      <View className="flex size-full flex-1  mt-4  justify-center items-center rounded-full overflow-hidden ">
        <Icon size={20} color="#C3FF0A" />
        <Text className="text-xs font-semibold  text-primary">{title}</Text>
      </View>
    );
  }

  return (
    <View className="flex w-full flex-1  mt-4  justify-center items-center rounded-full overflow-hidden ">
      <Icon size={20} color="#f5f5dc" />
      <Text className="text-xs font-semibold  text-textPrimary">{title}</Text>
    </View>
  );
}

export function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },

        tabBarStyle: {
          backgroundColor: "rgba(97,97,97,0.3)",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
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
            <TabIcon focused={focused} Icon={House} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "history",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={History} title="History" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={User} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
