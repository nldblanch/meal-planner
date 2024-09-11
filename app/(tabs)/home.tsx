import { View, Text, Button, Platform, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { getAuth } from "firebase/auth";
import { router } from "expo-router";
import Header from "@/components/Header";
import * as Calendar from "expo-calendar";
const Home = () => {
  const { user, setUser } = useGlobalContext();
  const auth = getAuth();

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log("Here are all your calendars:");
        console.log({ calendars });
      }
    })();
  }, []);

  const logout = () => {
    auth.signOut();
    setUser(null);
    router.replace("/");
  };
  return (
    <SafeAreaView>
      <Header text="Home" />

      <View className="w-full p-4">
        <Text className="text-xl">Welcome back {user.uid}!</Text>
      </View>
      <View className="bg-red-200 w-full h-36">
        <Text>Calendar Module Example</Text>
        {/* <Button title="View all calendars" onPress={viewCalendars} /> */}
        <Button title="Create a new calendar" onPress={createCalendar} />
      </View>
      <Button title="Log out" onPress={logout} />
    </SafeAreaView>
  );
};
async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const permission = await Calendar.getCalendarPermissionsAsync()
  
  if (!permission.granted) {
    console.log("permission not granted!");
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    
  }
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
