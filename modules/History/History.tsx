import { Plus } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HistoryCard from "../Home/components/HistoryCard";

export function History() {
  return (
    <SafeAreaView className="w-full h-screen bg-background">
      <View className="flex flex-row justify-between items-center py-2 px-4">
        <View className="gap-1">
          <Text className="text-textPrimary text-2xl font-psemibold">
            History
          </Text>
          <Text className="text-textSecondary text-xs font-pregular">
            Your Crop Recommendation History
          </Text>
        </View>
        <TouchableOpacity className="bg-primary rounded-full p-2">
          <Plus size={24} color="#212121" strokeWidth={1.5} />
        </TouchableOpacity>
      </View>

      <ScrollView className="mt-4 flex space-y-4 mb-12 px-4">
        <HistoryCard
          crop="Tomato"
          score={80}
          temp="25°C"
          rain="10mm"
          humidity="60%"
          ph="7.0"
          img="https://images.unsplash.com/photo-1566218246241-934ad8b38ea6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <HistoryCard
          crop="Cucumber"
          score={80}
          temp="25°C"
          rain="10mm"
          humidity="60%"
          ph="7.0"
          img="https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <HistoryCard
          crop="Carrot"
          score={80}
          temp="25°C"
          rain="10mm"
          humidity="60%"
          ph="7.0"
          img="https://plus.unsplash.com/premium_photo-1680344513213-0ad1795f766b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <HistoryCard
          crop="Tomato"
          score={80}
          temp="25°C"
          rain="10mm"
          humidity="60%"
          ph="7.0"
          img="https://images.unsplash.com/photo-1566218246241-934ad8b38ea6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <HistoryCard
          crop="Cucumber"
          score={80}
          temp="25°C"
          rain="10mm"
          humidity="60%"
          ph="7.0"
          img="https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <HistoryCard
          crop="Carrot"
          score={80}
          temp="25°C"
          rain="10mm"
          humidity="60%"
          ph="7.0"
          img="https://plus.unsplash.com/premium_photo-1680344513213-0ad1795f766b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <HistoryCard
          crop="Tomato"
          score={80}
          temp="25°C"
          rain="10mm"
          humidity="60%"
          ph="7.0"
          img="https://images.unsplash.com/photo-1566218246241-934ad8b38ea6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <HistoryCard
          crop="Cucumber"
          score={80}
          temp="25°C"
          rain="10mm"
          humidity="60%"
          ph="7.0"
          img="https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <HistoryCard
          crop="Carrot"
          score={80}
          temp="25°C"
          rain="10mm"
          humidity="60%"
          ph="7.0"
          img="https://plus.unsplash.com/premium_photo-1680344513213-0ad1795f766b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
