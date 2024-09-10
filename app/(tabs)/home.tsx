import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/contexts/GlobalProvider";

const Bookmark = () => {
  const { user } = useGlobalContext();
  
  return (
    <SafeAreaView>
      <View>
        <Text>{user.id}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Bookmark;
