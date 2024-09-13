import { useState } from "react";
import { Button, Text, View } from "react-native";
import EditEventModal from "./EditEventModal";

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
  const [modalVisible, setModalVisible] = useState(false);

  const modalProps = {
    modalVisible,
    setModalVisible,
    title,
    meal,
    startString,
    endString,
  };
  return (
    <View className="border border-solid p-2 ">
      <View className="flex flex-row items-start justify-between max-h-16 border-b">
        <View className="mt-auto">
          <Text className="text-xl font-semibold underline">{title}</Text>
          <Text className="text-lg">{meal}</Text>
        </View>
        <View className="flex flex-col items-end mt-auto mb-1">
          <Text className="text-right">Starts at {startString}</Text>
          <Text className="text-right">Ends at {endString}</Text>
        </View>
      </View>
      <View className="mt-2 ml-auto w-2/6 border border-solid">
        <Button title="Edit" onPress={() => setModalVisible(true)} />
      </View>
      <EditEventModal modalProps={modalProps} />
    </View>
  );
};

export default CalendarEventContainer;
