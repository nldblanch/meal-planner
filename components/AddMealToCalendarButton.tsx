import { useGlobalContext } from "@/contexts/GlobalProvider";

import * as Calendar from "expo-calendar";
import { router } from "expo-router";
import {
  getApproxEndTime,
  getApproxStartTime,
} from "@/scripts/utils/getMealTimes";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import { useState } from "react";
import CustomButton from "./CustomButton";
interface MealInterface {
  dateModified: string | null;
  idMeal: string;
  strArea: string;
  strCategory: string;
  strCreativeCommonsConfirmed: string | null;
  strDrinkAlternate: string | null;
  strImageSource: string | null;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strInstructions: string;
  strMeal: string;
  strMealThumb: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strTags: string;
  strYoutube: string;
}
type Props = {
  meal: MealInterface;
};
const AddMealToCalendarButton: React.FC<Props> = ({ meal }) => {
  const { eventInMemory, setEventInMemory, calendarSource } =
    useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const eventData = {
    startDate: getApproxStartTime(eventInMemory.title, eventInMemory.date),
    endDate: getApproxEndTime(eventInMemory.title, eventInMemory.date),
    notes: `Meal ID: ${meal.idMeal}`,
    title: `${eventInMemory.title}: ${meal.strMeal}`,
  };
  const modalProps = {
    modalVisible,
    setModalVisible,
  };
  return (
    <>
      <CustomButton
        title={"Add this meal"}
        containerStyles={"border w-1/2 self-center mb-4 bg-zinc-200"}
        handlePress={() => {
          if (!eventInMemory.date && !eventInMemory.title) {
            setModalVisible(true)
          } else
            return Calendar.createEventAsync(calendarSource.id, eventData)
              .then(() => {
                setEventInMemory({ date: "", title: "" });
                router.replace("/(tabs)/home");
              })
              .catch((err) => {
                console.log(err);
              });
        }}
        textStyles={""}
        isLoading={false}
      />
      <AddMealModal modalProps={modalProps} />
    </>
  );
};

interface AddMealModal {
  modalProps: {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<boolean>
  }
}
const AddMealModal: React.FC<AddMealModal> = ({ modalProps: { modalVisible, setModalVisible } }) => {
  return (
    <View className="bg-black">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex justify-center items-center h-full">
          <View className=" flex flex-col justify-center items-center m-4 bg-white rounded-2xl p-1 w-4/5">
            <Text className="justify-self-start mb-8 text-4xl mt-2 underline">
              Add this meal
            </Text>

            <Pressable
              className="mb-4 bg-slate-500 w-11/12 p-4 rounded-sm"
              onPress={() => {
                setModalVisible(!modalVisible);
                router.push("/(tabs)/search/meals");
              }}
            >
              <Text className="text-white text-center font-bold">
                Search for a meal
              </Text>
            </Pressable>
            <Pressable
              className="mb-4 bg-slate-500 w-11/12 p-4 rounded-sm"
              onPress={() => {
                setModalVisible(!modalVisible);
                router.push("/(tabs)/recipes");
              }}
            >
              <Text className="text-white text-center font-bold">
                Choose a meal I created
              </Text>
            </Pressable>
            <Pressable
              className="mt-4 mb-2 rounded-xl bg-blue-500 p-3"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text className="text-white font-bold">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddMealToCalendarButton;
