import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { getAuth } from "firebase/auth";
import { router } from "expo-router";
import Header from "@/components/Header";
const Home = () => {
  const { user, setUser } = useGlobalContext();
  const auth = getAuth()

  const logout = () => {
    auth.signOut()
    setUser(null)
    router.replace("/")
  }
  return (
    <SafeAreaView>
            <Header text="Home" />

      <View>
        <Text>Welcome back {user.uid}!</Text>
      </View>
      <Button title="Log out" onPress={logout} />
    </SafeAreaView>
  );
};

export default Home;
