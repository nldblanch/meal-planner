import { View, Button, Platform, Modal, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import * as Calendar from "expo-calendar";
import {
  ScrollableCalendarStrip,
  CalendarEventContainer,
  Header,
  BoldText,
} from "@/components";
import {
  getDateTime,
  getEndOfDay,
  getStartOfDay,
} from "../../scripts/utils/getDateNow";
type InitialiseCalendarModalProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<boolean>;
};
const InitialiseCalendarModal: React.FC<InitialiseCalendarModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const fullText =
    "This app primarily uses the calendar to operate. By clicking 'Initialise Calendar' below, you will create a new calendar called Meal Planner in your default calendar app. This is where you can see different meals added, and where we will store and retrieve information for you.";

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View className="flex justify-center items-center h-full bg-darkFaint dark:bg-faint">
          <View className="flex flex-col justify-center items-center m-4 bg-background dark:bg-darkBackground rounded-2xl p-1 w-4/5">
            <Text className="justify-self-start mb-8 text-4xl mt-2 text-text dark:text-darkText ">
              Hi there.
            </Text>
            <BoldText
              fullText={fullText}
              boldTextParts={["Initialise Calendar", "Meal Planner"]}
              boldWeight={"semibold"}
              fontStyles="justify-self-start text-center mb-4 text-xl mt-2 text-text dark:text-darkText"
              boldStyles="text-primary1"
            />
            <Pressable
              className="mt-4 mb-2 rounded-xl bg-primary1 p-3"
              onPress={() => {
                createCalendar().then((res) => {
                  console.log(res, "success");
                });
                setModalVisible(false);
              }}
            >
              <Text className="text-white font-bold">Initialise Calendar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const Home = () => {
  const { calendarSource, setCalendarSource, eventInMemory, mealInMemory } =
    useGlobalContext();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [calendarEvents, setCalendarEvents] = useState({
    breakfast: { title: "Breakfast" },
    lunch: { title: "Lunch" },
    dinner: { title: "Dinner" },
  });
  const [date, setDate] = useState(getDateTime());
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );

        try {
          const calSource = calendars.filter((calendar) => {
            return calendar.title === "Meal Planner";
          })[0].source.id;
          const calId = calendars.filter((calendar) => {
            return calendar.title === "Meal Planner";
          })[0].id;
          setCalendarSource({ source: calSource, id: calId });
        } catch {
        } finally {
          setLoading(false);
        }
      } else {
        console.log("no permission");
        setLoading(false);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (calendarSource.source) {
        setModalVisible(false);
        const time1 = getStartOfDay(date);
        const time2 = getEndOfDay(date);

        const events = await viewCalendarEvents(
          calendarSource.id,
          time1,
          time2
        );
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
      } else {
        setModalVisible(true);
      }
    })();
  }, [date, eventInMemory, mealInMemory]);
  return (
    <SafeAreaView className="flex flex-col grow items-center justify-center bg-background dark:bg-darkBackground">
      <Header text="Home" />

      <View className="grow w-full">
        <ScrollableCalendarStrip setDate={setDate} />
        <CalendarEventContainer props={calendarEvents.breakfast} date={date} />
        <CalendarEventContainer props={calendarEvents.lunch} date={date} />
        <CalendarEventContainer props={calendarEvents.dinner} date={date} />
        {!calendarSource.id && modalVisible && !loading && (
          <InitialiseCalendarModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}
      </View>
    </SafeAreaView>
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

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === "ios"
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: "Meal Planner" };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: "Meal Planner",
    color: "blue",
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: "internalCalendarName",
    ownerAccount: "personal",
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  return newCalendarID;
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

export default Home;
