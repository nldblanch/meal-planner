import "react-native-url-polyfill/auto";
import { Stack } from "expo-router";
import GlobalProvider from "@/contexts/GlobalProvider";

export default function RootLayout() {
  return (
    <GlobalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="[meal_id]" options={{ headerShown: false }} />

        </Stack>
    </GlobalProvider>
  );
}
