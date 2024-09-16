import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    
        <Stack>
          <Stack.Screen name="meals" options={{ headerShown: false }} />
          <Stack.Screen name="[query]" options={{ headerShown: false }} />
        </Stack>
    
  );
}
