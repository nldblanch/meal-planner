import { Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const AuthLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Login",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Text
                className={`text-xl ${
                  focused ? "text-black" : "text-gray-400"
                }`}
              >
                Login
              </Text>
            ),
          }}
        />

        <Tabs.Screen
          name="sign-up"
          options={{
            title: "Register",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Text
                className={`text-xl ${
                  focused ? "text-black" : "text-gray-400"
                }`}
              >
                Register
              </Text>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default AuthLayout;
