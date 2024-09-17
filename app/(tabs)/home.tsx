import { View, Button, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import * as Calendar from "expo-calendar";
import { ScrollableCalendarStrip, CalendarEventContainer, Header } from "@/components";
import {  
  getDateTime,
  getEndOfDay,
  getStartOfDay,
} from "../../scripts/utils/getDateNow";



const Home = () => {
  const { calendarSource, setCalendarSource, eventInMemory, mealInMemory } = useGlobalContext();
  
  const [calendarEvents, setCalendarEvents] = useState({
    breakfast: { title: "Breakfast" },
    lunch: { title: "Lunch" },
    dinner: { title: "Dinner" },
  });
  const [date, setDate] = useState(getDateTime());
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        
        const calSource = calendars.filter((calendar) => {
          return calendar.title === "Expo Calendar";
        })[0].source.id;
        const calId = calendars.filter((calendar) => {
          return calendar.title === "Expo Calendar";
        })[0].id;
        setCalendarSource({source: calSource, id: calId });
        
        const time1 = getStartOfDay(date);
        const time2 = getEndOfDay(date);

        const events = await viewCalendarEvents(calendarSource.source, time1, time2)  
          
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
      }
    })();
  }, [date, eventInMemory, mealInMemory]);

 
  
  return (
    <SafeAreaView className="flex flex-col grow items-center justify-center bg-background dark:bg-darkBackground">
      <Header text="Home" />
      
      <View className="grow w-full">
        <ScrollableCalendarStrip setDate={setDate} />
        <CalendarEventContainer props={calendarEvents.breakfast} date={date} />
        <CalendarEventContainer props={calendarEvents.lunch}  date={date} />
        <CalendarEventContainer props={calendarEvents.dinner}  date={date} />
        {!calendarSource && (
          <Button title="Initialise calendar" onPress={createCalendar} />
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
