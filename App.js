import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [appLanguage, setAppLanguage] = useState("en");
  const [hasPickedLanguage, setHasPickedLanguage] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("appLanguage");
      if (saved) {
        setAppLanguage(saved);
        setHasPickedLanguage(true);
      }
      setChecking(false);
    })();
  }, []);

  if (checking) return null;

  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <AppNavigator
        appLanguage={appLanguage}
        setAppLanguage={(lang) => {
          setAppLanguage(lang);
          setHasPickedLanguage(true);
        }}
        hasPickedLanguage={hasPickedLanguage}
      />
    </AuthProvider>
  );
}
