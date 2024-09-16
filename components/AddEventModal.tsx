import { useGlobalContext } from "@/contexts/GlobalProvider";
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Modal, Alert, Pressable } from "react-native";
type EditEventModalProps = {
  modalProps: {
    addModalVisible: boolean;
    setAddModalVisible: React.Dispatch<boolean>;
    title: string;
  };
};

const AddEventModal: React.FC<EditEventModalProps> = ({ modalProps }) => {
  const { addModalVisible, setAddModalVisible, title } = modalProps;
  const { eventInMemory } = useGlobalContext();
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setAddModalVisible(!addModalVisible);
        }}
        >
        <View
          className="flex justify-center items-center h-full"
          style={styles.centeredView}
          >
          <View className=" flex flex-col justify-center items-center m-4 bg-white rounded-2xl p-1 w-4/5">
            <Text className="justify-self-start mb-8 text-4xl mt-2 underline">
              Add {title}
            </Text>

            <Pressable
              className="mb-4 bg-slate-500 w-11/12 p-4 rounded-sm"
              onPress={() => {
                setAddModalVisible(!addModalVisible)
                router.push("/(tabs)/meals")
              }}
            >
              <Text className="text-white text-center font-bold">
                Search for a meal
              </Text>
            </Pressable>
            <Pressable
              className="mb-4 bg-slate-500 w-11/12 p-4 rounded-sm"
              onPress={() => {
                setAddModalVisible(!addModalVisible)
                router.push("/(tabs)/recipes")
              }}
            >
              <Text className="text-white text-center font-bold">
                Choose a meal I created
              </Text>
            </Pressable>
            <Pressable
              className="mt-4 mb-2 rounded-xl bg-blue-500 p-3"
              onPress={() => setAddModalVisible(!addModalVisible)}
            >
              <Text className="text-white font-bold">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "#BBBB",
  },
});

export default AddEventModal;
