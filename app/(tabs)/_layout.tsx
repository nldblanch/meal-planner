import React from "react";
import { Tabs } from "expo-router";


const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            
          }}
        />
        <Tabs.Screen
          name="lists"
          options={{
            title: "Shopping Lists",
            headerShown: false,
            
          }}
        />
        <Tabs.Screen
          name="recipes"
          options={{
            title: "Recipes",
            headerShown: false,
            
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
