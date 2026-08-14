import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";

import LanguageSelectScreen from "../screens/LanguageSelectScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import GameScreen from "../screens/GameScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator({ appLanguage, setAppLanguage, hasPickedLanguage }) {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasPickedLanguage ? (
          <Stack.Screen name="LanguageSelect">
            {(props) => <LanguageSelectScreen {...props} setAppLanguage={setAppLanguage} />}
          </Stack.Screen>
        ) : !user ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} appLanguage={appLanguage} />}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {(props) => <SignupScreen {...props} appLanguage={appLanguage} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} appLanguage={appLanguage} />}
            </Stack.Screen>
            <Stack.Screen name="Game">
              {(props) => <GameScreen {...props} appLanguage={appLanguage} />}
            </Stack.Screen>
            <Stack.Screen name="Leaderboard">
              {(props) => <LeaderboardScreen {...props} appLanguage={appLanguage} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
                }
