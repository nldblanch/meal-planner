import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import Categories from "@/components/Categories";

const Search = () => {
  return (
    <SafeAreaView className="w-full h-screen">

      <Header text="Search" />
      
      <Categories />
      
    </SafeAreaView>
  );
};

export default Search;
