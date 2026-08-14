import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";

import LanguageSelectScreen from "../screens/LanguageSelectScreen";
import ChangeLanguageScreen from "../screens/ChangeLanguageScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import GameScreen from "../screens/GameScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, profile, loadingAuth } = useAuth();

  if (loadingAuth) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} appLanguage="en" />}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {(props) => <SignupScreen {...props} appLanguage="en" />}
            </Stack.Screen>
          </>
        ) : !profile ? null : !profile.language ? (
          <Stack.Screen name="LanguageSelect">
            {(props) => <LanguageSelectScreen {...props} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} appLanguage={profile.language} />}
            </Stack.Screen>
            <Stack.Screen name="Game">
              {(props) => <GameScreen {...props} appLanguage={profile.language} />}
            </Stack.Screen>
            <Stack.Screen name="Leaderboard">
              {(props) => <LeaderboardScreen {...props} appLanguage={profile.language} />}
            </Stack.Screen>
            <Stack.Screen name="Profile">
              {(props) => <ProfileScreen {...props} appLanguage={profile.language} />}
            </Stack.Screen>
            <Stack.Screen name="Settings">
              {(props) => <SettingsScreen {...props} appLanguage={profile.language} />}
            </Stack.Screen>
            <Stack.Screen name="ChangeLanguage">
              {(props) => <ChangeLanguageScreen {...props} appLanguage={profile.language} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
