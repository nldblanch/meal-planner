import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { addListToUserId, getListsByUserId } from "../../scripts/api";
import { CustomButton, ListDropdown } from "../../components";
import { icons } from "../../constants";
const Lists = () => {
  const { user } = useGlobalContext();
  const [listName, onChangeListName] = useState("");
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listItems, setListItems] = useState([])
  useEffect(() => {
    setLoading(true);
    getListsByUserId(user.uid)
      .then(({ lists }) => {
        setLists(lists);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "error!");
      });
  }, []);

  return (
    <SafeAreaView className="w-full h-screen">
      <View className="w-full">
        <Text className="text-center text-4xl">Shopping Lists</Text>
      </View>
      <View className="flex flex-col justify-center items-center mx-12">
        {!loading && <ListDropdown data={lists} setListItems={setListItems} />}
        <View className="h-fit flex flex-row justify-evenly items-center pr-2 ml-2 rounded-md mt-4 border border-solid border-zinc-950">
          <TextInput
            className="h-8 m-1 p-1 w-1/2 "
            onChangeText={onChangeListName}
            value={listName}
            placeholder="Add a new list"
          />
          <TouchableOpacity
            onPress={() => addListToUserId(user.uid, listName)}
            activeOpacity={0.7}
            className={`aspect-square rounded-xl max-h-18 flex flex-row justify-center items-center ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            <Image
              source={icons.plus}
              resizeMode="contain"
              className="w-6 h-6"
            />
            {loading && (
              <ActivityIndicator
                animating={loading}
                color="#fff"
                size="small"
                className="ml-2"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Lists;
