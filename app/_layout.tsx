import GlobalProvider from "@/contexts/GlobalProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <GlobalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
    </GlobalProvider>
  );
}
