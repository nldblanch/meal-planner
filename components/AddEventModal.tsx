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
          className="flex justify-center items-center h-full bg-darkFaint dark:bg-faint"
        
          >
          <View className=" flex flex-col justify-center items-center m-4 bg-background dark:bg-darkBackground rounded-2xl p-1 w-4/5">
            <Text className="justify-self-start mb-8 text-4xl mt-2 text-text dark:text-darkText underline">
              Add {title}
            </Text>

            <Pressable
              className="mb-4 bg-secondary1 w-11/12 p-4 rounded-sm"
              onPress={() => {
                setAddModalVisible(!addModalVisible)
                router.push("/(tabs)/search/meals")
              }}
            >
              <Text className="text-white text-xl text-center font-semibold">
                Search for a meal
              </Text>
            </Pressable>
            <Pressable
              className="mb-4 bg-secondary1 w-11/12 p-4 rounded-sm"
              onPress={() => {
                setAddModalVisible(!addModalVisible)
                router.push("/(tabs)/recipes")
              }}
            >
              <Text className="text-white text-center text-xl font-semibold">
                Choose a meal I created
              </Text>
            </Pressable>
            <Pressable
              className="mt-4 mb-2 rounded-xl bg-primary1 p-3"
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
