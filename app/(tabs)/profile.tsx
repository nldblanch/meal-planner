import { Header } from "@/components";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { getAuth } from "firebase/auth";

const Profile = () => {
  const auth = getAuth();

  const { user, setUser } = useGlobalContext();
  const logout = () => {
    auth.signOut();
    setUser(null);
    router.replace("/");
  };
  return (
    <SafeAreaView>
      <Header text="Profile" />
      <View className="w-full p-4">
        <Text className="text-xl text-text dark:text-darkText">
          Welcome back {user.uid}!
        </Text>
      </View>
      <Button title="Log out" onPress={logout} />
    </SafeAreaView>
  );
};

export default Profile;
