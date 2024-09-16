import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {Header} from "@/components";
import { useLocalSearchParams } from "expo-router";

const Meal = () => {
    const { meal_id } = useLocalSearchParams();
  return (
    <SafeAreaView>

      <Header text="Meal" />
      <Text>{meal_id}</Text>
    </SafeAreaView>
  );
};

export default Meal;
