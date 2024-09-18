import {
  Alert,
  Appearance,
  Image,
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
  const colorScheme = Appearance.getColorScheme()
  const placeHolderTextColor = colorScheme === "dark" ? "#ffffff99" : "#00000044"
  const iconColor = colorScheme === "dark" ? "white" : "black"
  return (
    <View className="flex flex-row items-center space-x-4 w-[95%] h-16 px-4 mb-2 rounded-2xl border-2 border-text dark:border-darkText focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-text dark:text-darkText flex-1 font-pregular"
        value={query}
        placeholder="Search for a recipe"
        placeholderTextColor={placeHolderTextColor}
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
          tintColor={iconColor}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
