import { getRandomMeal } from "@/scripts/mealApi";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MealCard from "./MealCard";
import { MealCardInterface } from "@/constants";
type ScrollerProps = {
  randomMeals: MealCardInterface[]
}
const Scroller:React.FC<ScrollerProps> = ({randomMeals}) => {
  
  return (
    <View className="h-full">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="h-full"
      >
        {randomMeals.map((meal) => {
          return (
            <View
            key={meal.idMeal}
            className="flex flex-col items-center justify-center h-full w-40 pb-2 my-auto"
            >
              <MealCard meal={meal} containerStyle="h-full w-full" />
            </View>
          )
        })}
         
      </ScrollView>
    </View>
  );
}

function Favourites() {
  const [randomMeals, setRandomMeals] = useState<MealCardInterface[]>([])
  useEffect(() => {
    (async () => {
      const meal = await getRandomMeal()
      const meal2 = await getRandomMeal()
      const meal3 = await getRandomMeal()
      const meal4 = await getRandomMeal()
      const meal5 = await getRandomMeal()
      try {
        setRandomMeals([meal, meal2, meal3, meal4, meal5])
      }
      catch {
      }
    })()
  }, [])
  return (
    <View className="w-full h-[30%] mb-8">
   
      <View className="w-full mt-4 border border-solid border-text dark:border-darkText"></View>
      <Text className="font-bold text-xl w-full underline pl-2 text-accent1">
        Favourites
      </Text>
      {randomMeals && <Scroller randomMeals={randomMeals} />}
    </View>
  );
}

const styles = StyleSheet.create({
  stretch: {
    width: "100%",
    height: "80%",
    resizeMode: "stretch",
  },
});

export default Favourites;
