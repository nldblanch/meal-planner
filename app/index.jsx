import { router } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView>
      <View className="w-full h-full">
        <Text className="text-4xl w-full text-center pt-4">Meal Planner</Text>
        <Button
          className="text-2xl text-center my-auto"
          title="Get started"
          onPress={() => router.push("/(auth)")}
        />
      </View>
    </SafeAreaView>
  );
}
