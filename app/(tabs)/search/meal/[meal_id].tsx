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
              return measure && measure !== " ";
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
      <ScrollView className="pb-12">
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

        <View className="flex flex-col items-center">
          <Text className="text-2xl font-semibold pl-2 pb-2 text-left w-full">Ingredients</Text>
          {ingredients &&
            ingredients.map((ingredient, i) => {
              return (
                <View
                  key={i}
                  className="flex flex-row w-[95%] flex-wrap grow shrink py-1 border-b-2 border-b-zinc-300"
                >
                  {
                    measures[i].toLowerCase() === "to serve" || measures[i].toLowerCase() === "to glaze"
                    ? <Text className="text-lg">{`${ingredient}, ${measures[i].toLowerCase()}`}</Text>
                    : <Text className="text-lg">{`${measures[i]} ${ingredient.toLowerCase()}`}</Text>
                  }
                </View>
              );
            })}
        </View>

        <Text
          onPress={() => setInstructionsVisible(!instructionsVisible)}
          className="pl-2 text-2xl font-semibold mt-2"
        >
          {instructionsVisible ? "Hide" : "Show"} Instructions -{">"}
        </Text>
        {instructionsVisible && (
          <Text className="text-lg pl-2">{meal.strInstructions}</Text>
        )}
        <View className="h-24"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Meal;
