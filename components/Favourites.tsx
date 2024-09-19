import { getRandomMeal } from "@/scripts/mealApi";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MealCard from "./MealCard";
import { MealCardInterface } from "@/constants";
type ScrollerProps = {
  randomMeals: MealCardInterface[];
};
const Scroller: React.FC<ScrollerProps> = ({ randomMeals }) => {
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
          );
        })}
      </ScrollView>
    </View>
  );
};

function Favourites() {
  const [randomMeals, setRandomMeals] = useState<MealCardInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const meal = await getRandomMeal();
      const meal2 = await getRandomMeal();
      const meal3 = await getRandomMeal();
      const meal4 = await getRandomMeal();
      const meal5 = await getRandomMeal();
      try {
        setRandomMeals([meal, meal2, meal3, meal4, meal5]);
        setLoading(false);
      } catch {}
    })();
  }, []);

  return loading ? (
    <View className="w-full h-[30%] mb-8">
      <View className="w-full mt-4 border border-solid border-text dark:border-darkText"></View>
      <Text className="font-bold text-xl w-full underline pl-2 text-accent1">
        Favourites
      </Text>
      <LoadingScroller />
    </View>
  ) : (
    <View className="w-full h-[30%] mb-8">
      <View className="w-full mt-4 border border-solid border-text dark:border-darkText"></View>
      <Text className="font-bold text-xl w-full underline pl-2 text-accent1">
        Favourites
      </Text>
      {randomMeals && <Scroller randomMeals={randomMeals} />}
    </View>
  );
}
const LoadingMealCard: React.FC = () => {
  return (
    <View
      className={`w-5/12 h-full aspect-2/3 overflow-hidden flex flex-col items-left rounded-md mt-4 bg-zinc-300`}
    >
      <View
        className="object-cover aspect-square w-full rounded-md bg-zinc-400"
        // style={{ backgroundColor: "#ffffff99" }}
      />
      <Text className="w-full h-2 p-1 bg-zinc-500 m-1"></Text>
      <Text className="w-10/12 h-2 p-1 bg-zinc-500 m-1"></Text>
      <Text className="w-9/12 h-2 p-1 bg-zinc-500 m-1"></Text>
      <View className="absolute left-0 py-1 w-full bg-faint dark:bg-darkFaint">
        <Text className="bg-zinc-500 m-1 h-2 w-7/12"></Text>
      </View>
    </View>
  );
};
const LoadingScroller: React.FC = () => {
  return (
    <View className="h-full">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="h-full"
      >
        <View className="flex flex-col items-center justify-center h-full w-40 pb-2 my-auto ">
          <LoadingMealCard />
        </View>
        <View className="flex flex-col items-center justify-center h-full w-40 pb-2 my-auto ">
          <LoadingMealCard />
        </View>
        <View className="flex flex-col items-center justify-center h-full w-40 pb-2 my-auto ">
          <LoadingMealCard />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  stretch: {
    width: "100%",
    height: "80%",
    resizeMode: "stretch",
  },
});

export default Favourites;
