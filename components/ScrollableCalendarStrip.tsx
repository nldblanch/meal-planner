import { getDateTime } from "@/scripts/utils/getDateNow";
import { View, StyleSheet } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { Appearance } from "react-native";

type ScrollableCalendarStripProps = {
  setDate: React.Dispatch<any>;
};
const ScrollableCalendarStrip: React.FC<ScrollableCalendarStripProps> = ({
  setDate,
}) => {
  const colorScheme = Appearance.getColorScheme();

  const headerColour = colorScheme === "dark" ? "white" : "black";
  const currentDate = getDateTime();
  return (
    <View className="w-full bg-background dark:bg-darkBackground py-2 h-[20%]">
      <CalendarStrip
        scrollable
        style={{
          height: "100%",
          paddingTop: 0,
          paddingBottom: 5,
          paddingRight: 5,
        }}
        calendarHeaderStyle={{
          fontSize: 25,
          fontWeight: "bold",
          paddingBottom: 5,
          color: headerColour,
        }}
        dayContainerStyle={{ backgroundColor: "rgb(100, 138, 190)" }}
        selectedDate={new Date(currentDate)}
        dateNumberStyle={{ color: "black" }}
        dateNameStyle={{ color: "black" }}
        highlightDateNameStyle={{ color: "white" }}
        highlightDateNumberStyle={{ color: "white" }}
        highlightDateContainerStyle={{ backgroundColor: "rgb(65, 152, 223)" }}
        iconContainer={{ flex: 0.1 }}
        iconStyle={{backgroundColor: "rgb(100, 138, 190)", padding: 10, paddingTop: 15, borderRadius: "100%"}}
        onDateSelected={(date) => {
          setDate(date);
        }}
      />
    </View>
  );
};

export default ScrollableCalendarStrip;
