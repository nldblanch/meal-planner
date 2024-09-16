import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router, usePathname } from "expo-router";
import { icons } from "@/constants";
import { useState } from "react";

type SearchBarProps = {
  initialQuery?: string;
};
const SearchBar: React.FC<SearchBarProps> = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className="flex flex-row items-center space-x-4 w-[95%] h-16 px-4 mb-2 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-black flex-1 font-pregular"
        value={query}
        placeholder="Search for a recipe"
        placeholderTextColor="#CCC"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          router.push(`/(tabs)/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          tintColor={"black"}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
