

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import { initializeApp } from "firebase/app";


// export const firebaseApp = initializeApp(firebaseConfig);


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
const firebaseConfig = JSON.parse(process.env.EXPO_PUBLIC_FIREBASE_CONFIG);


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });