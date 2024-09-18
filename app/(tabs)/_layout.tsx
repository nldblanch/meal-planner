import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { Appearance, Image, Text, View } from "react-native";
import { icons } from "@/constants";
type Args = {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
};
const TabIcon = ({ icon, color, name, focused }: Args) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};
const TabsLayout = () => {
  const colorScheme = Appearance.getColorScheme();
  const [tabBackgroundColor, setTabBackgroundColor] = useState("white")
  useEffect(() => {
    setTabBackgroundColor(colorScheme === "dark" ? "rgb(9, 9, 11)" : "white")
  },[colorScheme])
  const activeTabIconColour = colorScheme === "dark" ? "white" : "black"
  const inactiveTabIconColor = colorScheme === "dark" ? "#555" : "#BBB"
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: activeTabIconColour,
          tabBarInactiveTintColor: inactiveTabIconColor,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: tabBackgroundColor,
            borderTopWidth: 1,
            borderTopColor: "#555",
            paddingTop: 20,
            height: 100,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
         <Tabs.Screen
          name="search"
          options={{
            title: "Meals",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.search}
                color={color}
                name="Meals"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="lists"
          options={{
            title: "Lists",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.search}
                color={color}
                name="Lists"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="recipes"
          options={{
            title: "Recipes",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Recipes"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
