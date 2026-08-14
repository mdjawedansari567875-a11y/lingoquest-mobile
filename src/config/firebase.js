import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCzvLUtp1m4pqt6k_d7mOvFEcKMpve-PYs",
  authDomain: "lingoquest-ecf97.firebaseapp.com",
  projectId: "lingoquest-ecf97",
  storageBucket: "lingoquest-ecf97.firebasestorage.app",
  messagingSenderId: "793130950764",
  appId: "1:793130950764:web:406a970f3cda9bd3a47849"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

const db = getFirestore(app);

export { app, auth, db };
