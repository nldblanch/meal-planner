import { useState } from "react";
import { Button, Text, View } from "react-native";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import {
  getApproxEndTime,
  getApproxStartTime,
} from "@/scripts/utils/getMealTimes";
import * as Calendar from "expo-calendar";
import { router } from "expo-router";
import EditEventModal from "./EditEventModal";
import AddEventModal from "./AddEventModal";
type CalendarEvent = {
  title: string;
  meal: string;
  start: string;
  end: string;
  id: string;
  notes: string;
};
type CalendarEventContainerProps = {
  props: CalendarEvent;
  date: string;
  modalVisit?: boolean;
};
const CalendarEventContainer: React.FC<CalendarEventContainerProps> = ({
  props: { start, end, meal, title, id, notes },
  date,
  modalVisit,
}) => {
  const { setEventInMemory, mealInMemory, setMealInMemory, calendarSource } =
    useGlobalContext();
  const startTime = new Date(start);
  const endTime = new Date(end);
  const startString: string = `${startTime.getHours()}:${
    startTime.getMinutes() || "00"
  }`;
  const endString: string = `${endTime.getHours()}:${
    endTime.getMinutes() || "00"
  }`;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addIngredientsModalVisible, setAddIngredientsModalVisible] =
    useState(false);

  const editModalProps = {
    editModalVisible,
    setEditModalVisible,
    title,
    meal,
    startString,
    endString,
  };
  const addModalProps = {
    addModalVisible,
    setAddModalVisible,
    title,
  };


  return (
    <View className={`p-2 max-h-32 w-full my-1 `}>
      <View className="flex flex-row items-start justify-between max-h-16 border-b">
        <View className="mt-auto">
          <Text
            className={`text-2xl font-bold ${
              meal ? "text-secondary1" : "text-text dark:text-darkText"
            }`}
          >
            {title}
          </Text>
          <Text
            className={`text-xl font-semibold ${
              meal ? "text-text dark:text-darkText" : "text-negative1"
            }`}
          >
            {meal ? meal : "Nothing selected"}
          </Text>
        </View>
        <View className="flex flex-col items-end mt-auto mb-1 ">
          {meal && (
            <Text className="text-right text-text dark:text-darkText text-xl">
              {startString}-{endString}
            </Text>
          )}
        </View>
      </View>
      <View
        className={`mt-2 ml-auto w-2/6 border border-solid ${
          meal ? "bg-secondary1" : "bg-negative1"
        }`}
      >
        {modalVisit === true ? (
          meal ? (
            <Button
              title="Replace"
              color={"white"}
              accessibilityLabel="Replace this meal"
              onPress={() => {
                const eventData = {
                  startDate: getApproxStartTime(title, new Date(startTime)),
                  endDate: getApproxEndTime(title, new Date(endTime)),
                  notes: `Meal ID: ${mealInMemory.idMeal}`,
                  title: `${title}: ${mealInMemory.strMeal}`,
                };
                return Calendar.updateEventAsync(id, eventData)
                  .then(() => {
                    setMealInMemory(null);
                    router.replace("/(tabs)/home");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            />
          ) : (
            <Button
              title="Add"
              color={"white"}
              accessibilityLabel="Add the meal"
              onPress={() => {
                const eventData = {
                  startDate: getApproxStartTime(title, new Date(date)),
                  endDate: getApproxEndTime(title, new Date(date)),
                  notes: `Meal ID: ${mealInMemory.idMeal}`,
                  title: `${title}: ${mealInMemory.strMeal}`,
                };
                return Calendar.createEventAsync(calendarSource.id, eventData)
                  .then(() => {
                    setMealInMemory(null);
                    router.replace("/(tabs)/home");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            />
          )
        ) : meal ? (
          <Button
            title="Edit"
            color={"white"}
            accessibilityLabel="Edit this meal"
            onPress={() => setEditModalVisible(true)}
          />
        ) : (
          <Button
            title="Add"
            color={"white"}
            accessibilityLabel="Add a meal"
            onPress={() => {
              setEventInMemory({ date, title });
              setAddModalVisible(true);
            }}
          />
        )}
      </View>
      <EditEventModal modalProps={editModalProps} />
      <AddEventModal modalProps={addModalProps} />
    </View>
  );
};

export default CalendarEventContainer;
