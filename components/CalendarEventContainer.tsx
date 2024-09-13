import { useState } from "react";
import { Button, Text, View } from "react-native";
import EditEventModal from "./EditEventModal";
import AddEventModal from "./AddEventModal";

type CalendarEvent = {
  title: string;
  meal: string;
  start: string;
  end: string;
};
type CalendarEventContainerProps = {
  props: CalendarEvent;
};
const CalendarEventContainer: React.FC<CalendarEventContainerProps> = ({
  props: { start, end, meal, title },
}) => {
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
    <View className="border border-solid p-2 ">
      <View className="flex flex-row items-start justify-between max-h-16 border-b">
        <View className="mt-auto">
          <Text className="text-xl font-semibold underline">{title}</Text>
          <Text className="text-lg">{meal ? meal : "Nothing selected"}</Text>
        </View>
        <View className="flex flex-col items-end mt-auto mb-1">
          {meal && <Text className="text-right">Starts at {startString}</Text>}
          {meal && <Text className="text-right">Ends at {endString}</Text>}
        </View>
      </View>
      <View className="mt-2 ml-auto w-2/6 border border-solid">
        {meal && (
          <Button title="Edit" onPress={() => setEditModalVisible(true)} />
        )}
        {!meal && (
          <Button
            title="Add"
            onPress={() => {
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
