import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import {
  addListToUserId,
  addItemToList,
  getListItems,
  getListsByUserId,
} from "../../scripts/api";
import { CustomTextInput, ListDropdown, Header } from "../../components";
type List = {
  list_name: string;
  list_id: string;
  isPrivate: boolean;
};
type Item = {
  amount: number;
  item_name: string;
};
type ItemListProps = {
  list: Item[];
};

const Lists = () => {
  const { user } = useGlobalContext();
  const [listName, onChangeListName] = useState("");
  const [headerListName, setHeaderListName] = useState("");
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [listItems, setListItems] = useState<Item[]>([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [listId, setListId] = useState("");
  const [postItemInput, setPostItemInput] = useState("");
  const [postItemLoading, setPostItemLoading] = useState(false);

  const ItemList: React.FC<ItemListProps> = ({ list }) => {
    if (!list) {
      return <Text className="mt-4">This list is empty.</Text>;
    } else {
      return (
        <View className="mt-4">
          {list.map(({ amount, item_name }, index) => {
            return (
              <Text key={index}>
                {amount} {item_name}
              </Text>
            );
          })}
        </View>
      );
    }
  };

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

  useEffect(() => {
    if (listId) {
      setItemsLoading(true);
      getListItems(listId).then((items) => {
        setListItems(items);
        setItemsLoading(false);
      });
    }
  }, [listId]);
  const handlePress = () => {
    setLoading(true);
    return addListToUserId(user.uid, listName).then(({ user: { lists } }) => {
      const list_id = lists[lists.length - 1];
      setLists((prev) => [
        ...prev,
        { isPrivate: true, list_id, list_name: listName },
      ]);
      onChangeListName("");
      setListId(list_id);
      setLoading(false);
    });
  };

  return (
    <SafeAreaView className="w-full h-screen">
      <Header text="Shopping Lists" />
      <View className="flex flex-col justify-center items-center mx-2">
        {loading && <Text>Loading</Text>}
        {!loading &&
          (lists.length > 0 ? (
            <View className={`w-full flex flex-row gap-2 items-center px-2 justify-between ${!headerListName ? "justify-center" : ""}`}>
              <ListDropdown
                data={lists}
                setListId={setListId}
                setHeaderListName={setHeaderListName}
              />
              {headerListName && <Text className="text-3xl underline">{headerListName}</Text>}
            </View>
          ) : (
            <Text>No lists found.</Text>
          ))}

        {listId.length > 0 && !itemsLoading && !loading && (
          <View className="w-full flex flex-col items-center">
            <ItemList list={listItems} />
            <CustomTextInput
              onChangeText={setPostItemInput}
              value={postItemInput}
              placeholder="Add a new item"
              onPressFn={() =>
                !postItemInput
                  ? Alert.alert("Error", "Please enter value.")
                  : addItemToList(listId, postItemInput)
              }
              loading={postItemLoading}
            />
          </View>
        )}

        <CustomTextInput
          onChangeText={onChangeListName}
          value={listName}
          placeholder="Add a new list"
          onPressFn={() =>
            !listName
              ? Alert.alert("Error", "Please enter value.")
              : handlePress()
          }
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};
export default Lists;
