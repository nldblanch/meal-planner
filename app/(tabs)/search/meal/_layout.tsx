import { Stack } from "expo-router";

export default function MealsLayout() {
  return (
    <Stack>
      <Stack.Screen name="[meal_id]" options={{ headerShown: false }} />
    </Stack>
  );
}
