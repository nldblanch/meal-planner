import { View, Text, Button, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { getAuth } from "firebase/auth";
import { router } from "expo-router";
import Header from "@/components/Header";
import * as Calendar from "expo-calendar";
import CalendarEventContainer from "@/components/CalendarEventContainer";
type Calendar = {
  id: string;
  name: string;
  type: string;
};

const Home = () => {
  const { user, setUser } = useGlobalContext();
  const auth = getAuth();
  const [calendarSource, setCalendarSource] = useState<Calendar>({
    id: "",
    name: "",
    type: "",
  });
  const [calendarEvents, setCalendarEvents] = useState({
    breakfast: {title: "Breakfast"},
    lunch: {title: "Lunch"},
    dinner: {title: "Dinner"},
  });
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        const calSource = calendars.filter((calendar) => {
          return calendar.title === "Expo Calendar";
        })[0].source;
        setCalendarSource(calSource);
        const time1 = "2024-10-10T23:00:00.000Z";
        const time2 = "2024-10-11T23:00:00.000Z";
        const events = await viewCalendarEvents(calSource.id, time1, time2);

        events.forEach((event) => {
          setCalendarEvents((prev) => {
            return { ...prev, [event.title.toLowerCase()]: event };
          });
        });
      }
    })();
  }, []);

  const logout = () => {
    auth.signOut();
    setUser(null);
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex flex-col grow items-center justify-center">
      <Header text="Home" />
      <View className="w-full p-4">
        <Text className="text-xl">Welcome back {user.uid}!</Text>
      </View>
      <View className="grow w-full border border-r-0 border-l-0 border-solid border-black p-4">
        <Text className="w-full text-center text-xl">Calendar Module</Text>
        <CalendarEventContainer props={calendarEvents.breakfast} />
        <CalendarEventContainer props={calendarEvents.lunch} />
        <CalendarEventContainer props={calendarEvents.dinner} />
        {!calendarSource && (
          <Button title="Initialise calendar" onPress={createCalendar} />
        )}
      </View>
      <Button title="Log out" onPress={logout} />
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
      : { isLocalAccount: true, name: "Expo Calendar" };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: "Expo Calendar",
    color: "blue",
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: "internalCalendarName",
    ownerAccount: "personal",
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

export default Home;
