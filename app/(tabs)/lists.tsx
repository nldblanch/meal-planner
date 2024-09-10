import { View, Text, Alert, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { addListToUserId, getListsByUserId } from "../../scripts/api";
import { CustomButton, ListDropdown } from "../../components";
const Lists = () => {
  const { user } = useGlobalContext();
  const [listName, onChangeListName] = useState("");
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
      <View className="flex flex-col justify-center items-center">
        {!loading && <ListDropdown data={lists} />}
        <TextInput
          className="h-fit w-7/12 m-2 p-3 border border-solid border-zinc-950"
          onChangeText={onChangeListName}
          value={listName}
        />
        <CustomButton
          title="Add new list"
          handlePress={() => addListToUserId(user.uid, listName)}
          containerStyles="mt-4 border-solid border-black border w-1/2"
          textStyles=""
          isLoading={false}
        />
      </View>
    </SafeAreaView>
  );
};
export default Lists;
