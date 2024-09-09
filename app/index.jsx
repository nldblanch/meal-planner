import "../firebase.config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function App() {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [loggedInUser, onChangeLoggedInUser] = React.useState("");
  const auth = getAuth();

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        onChangeLoggedInUser(user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        onChangeLoggedInUser(user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
      ></TextInput>
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={true}
      ></TextInput>
      <Button title="Sign Up!" onPress={createUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
});


// export default function Index() {
//   const [isLoading, setIsLoading] = useState(false);

  
//   return (
//     <SafeAreaView>
//       <View>
//         <Text className="text-3xl p-2">Welcome Back!</Text>
//         <TouchableOpacity
//           onPress={createUser}
//           activeOpacity={0.7}
//           className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${
//             isLoading ? "opacity-50" : ""
//           }`}
//           disabled={isLoading}
//         >
//           <Text className={`text-primary font-psemibold text-lg`}>
//             {"button"}
//           </Text>

//           {isLoading && (
//             <ActivityIndicator
//               animating={isLoading}
//               color="#fff"
//               size="small"
//               className="ml-2"
//             />
//           )}
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }