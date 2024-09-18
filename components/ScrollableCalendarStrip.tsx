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
  const iconBackgroundColor = colorScheme === "dark" ? "#ffffff99" : "#000000cc"
  const currentDate = getDateTime();
  return (
    <View className="w-full bg-background dark:bg-darkBackground py-2 h-[20%]">
      <CalendarStrip
        
        daySelectionAnimation={{type: 'border', duration: 400, borderWidth: 1, borderHighlightColor: headerColour}}
        // scrollable
        // scrollerPaging
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
        selectedDate={new Date(currentDate)}
        dateNumberStyle={{ color: headerColour }}
        dateNameStyle={{ color: headerColour }}
        highlightDateNameStyle={{ color: "white" }}
        highlightDateNumberStyle={{ color: "white" }}
        highlightDateContainerStyle={{ backgroundColor: "rgb(65, 152, 223)" }}
        useNativeDriver
        iconContainer={{ flex: 0.1 }}
        iconStyle={{backgroundColor: iconBackgroundColor, padding: 10, paddingTop: 15, borderRadius: "100%"}}
        onDateSelected={(date) => {
          // setCurrentDate(date.toDate());
          setDate(date);
        }}
        
      />
    </View>
  );
};

export default ScrollableCalendarStrip;
