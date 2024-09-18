import { useGlobalContext } from "@/contexts/GlobalProvider";

import * as Calendar from "expo-calendar";
import { router } from "expo-router";
import {
  getApproxEndTime,
  getApproxStartTime,
} from "@/scripts/utils/getMealTimes";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import {
  getDateTime,
  getEndOfDay,
  getStartOfDay,
} from "@/scripts/utils/getDateNow";
import ScrollableCalendarStrip from "./ScrollableCalendarStrip";
import CalendarEventContainer from "./CalendarEventContainer";
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
  const { eventInMemory, setEventInMemory, mealInMemory, setMealInMemory, calendarSource } =
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
  useEffect(() => {
    if (!mealInMemory) {
      setModalVisible(false)
    }
  }, [mealInMemory])
  return (
    <>
      <CustomButton
        title={"Add this meal"}
        containerStyles={"border w-1/2 self-center mb-4 bg-secondary1"}
        handlePress={() => {
          if (!eventInMemory.date && !eventInMemory.title) {
            setMealInMemory({...meal})
            setModalVisible(true);
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
        textStyles={"text-white font-semibold"}
        isLoading={false}
      />
      <AddMealModal modalProps={modalProps} />
    </>
  );
};

interface AddMealModal {
  modalProps: {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<boolean>;
  };
}
const AddMealModal: React.FC<AddMealModal> = ({
  modalProps: { modalVisible, setModalVisible },
}) => {
  const [date, setDate] = useState(getDateTime());
  const [calendarEvents, setCalendarEvents] = useState({
    breakfast: { title: "Breakfast" },
    lunch: { title: "Lunch" },
    dinner: { title: "Dinner" },
  });
  const { calendarSource } = useGlobalContext();
  useEffect(() => {
    const time1 = getStartOfDay(date);
    const time2 = getEndOfDay(date);
    viewCalendarEvents(calendarSource.source, time1, time2).then((events) => {
      if (events.length === 0) {
        setCalendarEvents({
          breakfast: { title: "Breakfast" },
          lunch: { title: "Lunch" },
          dinner: { title: "Dinner" },
        });
      } else {
        events.forEach((event) => {
          setCalendarEvents((prev) => {
            return { ...prev, [event.title.toLowerCase()]: event };
          });
        });
      }
    });
  }, [date]);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex justify-center items-center h-full bg-faint dark:bg-darkFaint">
          <View className=" flex flex-col justify-center items-center m-4 bg-background dark:bg-darkBackground rounded-2xl p-1 w-11/12 h-[80%] border shadow-md">
            <Text className="justify-self-start mb-8 text-4xl mt-2 underline text-text dark:text-darkText">
              Add this meal
            </Text>
            <ScrollableCalendarStrip setDate={setDate} />
            <CalendarEventContainer props={calendarEvents.breakfast} date={date}  modalVisit={true}/>
            <CalendarEventContainer props={calendarEvents.lunch}  date={date}  modalVisit={true}/>
            <CalendarEventContainer props={calendarEvents.dinner}  date={date} modalVisit={true}/>

            <Pressable
              className="mt-4 mb-2 rounded-xl bg-primary1 p-3"
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

async function viewCalendarEvents(id: string, start: Date, end: Date) {
  const events = await Calendar.getEventsAsync([id], start, end);

  const meals = events.map((event) => {
    const meal = event.title.split(": ")[0];
    const choice = event.title.split(": ")[1];
    return {
      title: meal,
      meal: choice,
      notes: event.notes,
      id: event.id,
      start: event.startDate,
      end: event.endDate,
    };
  });
  return meals;
}

export default AddMealToCalendarButton;
