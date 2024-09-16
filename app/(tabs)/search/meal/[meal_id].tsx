import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components";
import { router, useLocalSearchParams } from "expo-router";
import { getMealById } from "@/scripts/mealApi";

const Meal = () => {
  const { meal_id } = useLocalSearchParams();
  const [meal, setMeal] = useState();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [measures, setMeasures] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [instructionsVisible, setInstructionsVisible] =
    useState<boolean>(false);
  useEffect(() => {
    if (meal_id) {
      getMealById(meal_id).then((meal) => {
        setMeal(meal);

        setIngredients(
          Object.keys(meal)
            .filter((key) => {
              return key.includes("Ingredient");
            })
            .map((key) => {
              return meal[key];
            })
            .filter((ingredient) => {
              return ingredient;
            })
        );
        setMeasures(
          Object.keys(meal)
            .filter((key) => {
              return key.includes("Measure");
            })
            .map((key) => {
              return meal[key];
            })
            .filter((measure) => {
              return measure !== " ";
            })
        );
        setLoading(false);
      });
    } else {
      router.replace("/(tabs)/search");
    }
  }, []);

  if (loading)
    return (
      <SafeAreaView>
        <Text>Loading</Text>
      </SafeAreaView>
    );
  return (
    <SafeAreaView>
      <Header
        text={meal.strMeal}
        link={meal.strSource ? meal.strSource : null}
      />
      <ScrollView className="">
        <Image
          className="object-cover aspect-square w-full mt-2"
          source={{ url: meal.strMealThumb }}
        />
        <View className="w-full px-2">
          <View className="w-full flex flex-row justify-between">
            <Text className="text-lg font-semibold">{meal.strCategory}</Text>
            <Text className="text-lg font-semibold">{meal.strArea}</Text>
          </View>
          {meal.strTags && (
            <Text className="text-lg font-semibold">
              {meal.strTags.split(",").join(", ")}
            </Text>
          )}
          {meal.strYoutube && (
            <Text
              className="text-lg text-blue-800 mb-4"
              onPress={() => Linking.openURL(meal.strYoutube)}
            >
              View on YouTube
            </Text>
          )}
        </View>

        <View className="flex flex-row justify-center mx-4 border w-fit self-center">
          <View className="grow border-r">
            <Text className="pl-2 py-1 font-bold text-lg">Ingredient</Text>
            <View className="w-full border-b"></View>
            {ingredients &&
              ingredients.map((ingredient, i) => {
                return (
                  <Text key={i} className="pl-2 text-lg">
                    {ingredient}
                  </Text>
                );
              })}
          </View>
          <View className="grow">
            <Text className="pl-2 py-1 font-bold text-lg">Measure</Text>
            <View className="w-full border-b"></View>
            {measures &&
              measures.map((measure, i) => {
                return (
                  <Text key={i} className="pl-2 text-lg">
                    {measure}
                  </Text>
                );
              })}
          </View>
        </View>
        <Text
          onPress={() => setInstructionsVisible(!instructionsVisible)}
          className="pl-2 text-lg font-semibold mt-2"
        >
          {instructionsVisible ? "Hide" : "Show"} Instructions -{">"}
        </Text>
        {instructionsVisible && (
          <Text className="text-lg pl-2">{meal.strInstructions}</Text>
        )}
        <View className="h-12"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Meal;
