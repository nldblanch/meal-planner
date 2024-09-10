import { router } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useGlobalContext } from "@/contexts/GlobalProvider";

export default function App() {
  const auth = getAuth();
  const { user, setUser, dispatchSignedIn } = useGlobalContext();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: "signed-in" },
        });
        router.replace("/(tabs)/home");
      } else {
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: null },
        });
      }
    });
  }, [user]);
  return (
    <SafeAreaView>
      <View className="w-full h-full">
        <Text className="text-4xl w-full text-center pt-4">Meal Planner</Text>
        <Button
          className="text-2xl text-center my-auto"
          title="Get started"
          onPress={() => {
            if (user) {
              router.replace("/(tabs)/home");
            } else {
              router.push("/(auth)");
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}
