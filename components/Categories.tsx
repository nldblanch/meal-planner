import { getCategories } from "@/scripts/mealApi";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

function Scroller() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);
  return (
    <View className="h-1/5">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="h-full px-1"
      >
        {categories &&
          categories.map((category) => {
            return (
              <View
                key={category.idCategory}
                className="flex flex-col items-center justify-center h-4/5 w-40 pb-2 my-auto mx-1"
              >
                <Image
                  className="object-cover aspect-video grow w-full mb-2 pt-2"
                  style={styles.stretch}
                  source={{ url: category.strCategoryThumb }}
                  alt={`${category.strCategory}`}
                />
                <Text className="font-bold text-md text-text dark:text-darkText">
                  {category.strCategory}
                </Text>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}

function Categories() {
  return (
    <>
      <View className="w-full mt-4 border border-solid border-text dark:border-darkText"></View>
      <Text className="font-bold text-xl w-full underline pl-2 text-accent1">
        Browse Categories
      </Text>
      <Scroller />
      <View className="w-full border border-solid mb-4 border-text dark:border-darkText"></View>
    </>
  );
}

const styles = StyleSheet.create({
  stretch: {
    width: "100%",
    height: "80%",
    resizeMode: "stretch",
  },
});

export default Categories;
