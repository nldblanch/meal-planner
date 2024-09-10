import "../../firebase.config";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TextInput, Button, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/contexts/GlobalProvider";

export default function SignIn() {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const { user, setUser, dispatchSignedIn } = useGlobalContext();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: "signed-in" },
        });
        router.replace("/(tabs)/home");
      } else {
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: null },
        });
      }
    });
  }, [user]);
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setUser(userCredential);
        router.replace("/(tabs)/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/invalid-credential") {
          Alert.alert("Error", "Invalid email or password.");
        }
      });
  };

  return (
    <SafeAreaView className="h-full w-full flex flex-col items-center justify-center">
      <Text className="text-xl">Email</Text>
      <TextInput
        className="h-fit w-7/12 m-2 p-3 border border-solid border-zinc-950"
        onChangeText={onChangeEmail}
        value={email}
      ></TextInput>
      <Text className="text-xl">Password</Text>
      <TextInput
        className="h-fit w-7/12 m-2 p-3 border border-solid border-zinc-950"
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={true}
      ></TextInput>
      <Button title="Login" onPress={login} />
      <View className="mt-8">
        <Button
          title="Not a member? Sign up."
          onPress={() => router.push("/(auth)/sign-up")}
        />
      </View>
    </SafeAreaView>
  );
}
