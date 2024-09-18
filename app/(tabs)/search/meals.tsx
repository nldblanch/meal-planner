import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import Categories from "@/components/Categories";
import { getRandomMeal } from "@/scripts/mealApi";
import MealCard from "@/components/MealCard";
import { Favourites, SearchBar } from "@/components";
import { MealCardInterface } from "@/constants";
import { ScrollView, View } from "react-native";

const Search = () => {
  const [meal, setMeal] = useState<MealCardInterface>();
  useEffect(() => {
    getRandomMeal().then((meal) => {
      setMeal(meal);
    });
  }, []);
  return (
    <SafeAreaView className="w-full h-screen flex flex-col p-0 items-center bg-background dark:bg-darkBackground">
      <Header text="Search" />
      <SearchBar />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View>

        <Favourites />
        <Categories />
        {meal && <MealCard meal={meal} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
