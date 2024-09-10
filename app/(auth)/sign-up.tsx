import "../../firebase.config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { postUser } from "@/scripts/api";

export default function SignUp() {
  const [email, onChangeEmail] = useState<string>("");
  const [password, onChangePassword] = useState<string>("");
  const { setUser } = useGlobalContext();

  const auth = getAuth();
  
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const id = userCredential.user.uid;
        const userBody = {
          user_id: id,
					first_name: "Nathan",
					last_name: "Blanch",
					displayName: "Nathan Blanch",
					avatarURL: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
				};
				return Promise.all([userCredential, postUser(userBody)])
        .then(([userCredential]) => {
          setUser(userCredential)
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorCode === "auth/email-already-in-use") {
          Alert.alert("Error", "Email already in use.");
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
      <Button title="Sign up" onPress={createUser} />
      <View className="mt-8">
        <Button
          title="Already got an account? Login."
          onPress={() => router.back()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  fadingContainer: {
    padding: 20,
    backgroundColor: "powderblue",
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
});
