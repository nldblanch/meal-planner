import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { useLocalSearchParams } from "expo-router";
import { searchMeals } from "@/scripts/mealApi";
import { MealCard } from "@/components";

const SearchResult = () => {
  const { query } = useLocalSearchParams();
  const [mealSearch, setMealSearch] = useState([]);
  useEffect(() => {
    searchMeals(query).then((meals) => {
      setMealSearch(meals);
    });
  }, [query]);
  return (
    <SafeAreaView>
      <Header text="Search results" />
      {mealSearch && (
        <ScrollView className="w-full">
          <View className="w-full flex flex-wrap flex-row justify-around pb-12">

          {mealSearch.map((meal, i) => {
            return <MealCard key={i} meal={meal} />;
          })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default SearchResult;
