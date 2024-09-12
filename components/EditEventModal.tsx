import React from "react";
import { View, Text, StyleSheet, Modal, Alert, Pressable } from "react-native";
type EditEventModalProps = {
  modalProps: {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<boolean>;
    title: string;
    meal: string;
    startString: string;
    endString: string;
  };
};

const EditEventModal: React.FC<EditEventModalProps> = ({ modalProps }) => {
  const { modalVisible, setModalVisible, title, meal, startString, endString } = modalProps;
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text className="text-4xl mt-2 underline" style={styles.modalText}>
              Edit {title}
            </Text>
            <Text className="text-xl p-2">{meal}</Text>
            <Text className="text-xl p-2">{startString}</Text>
            <Text className="text-xl p-2">{endString}</Text>
            <Pressable
            className="mt-auto mb-12"
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "#BBBB",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    width: "80%",
    height: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default EditEventModal;
