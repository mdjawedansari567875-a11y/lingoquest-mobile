import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { UI_TEXT } from "../data/translations";

export default function HomeScreen({ navigation, appLanguage }) {
  const t = UI_TEXT[appLanguage] || UI_TEXT.en;
  const { profile, signOut } = useAuth();

  if (profile?.banned) {
    return (
      <View style={styles.container}>
        <Text style={styles.bannedText}>🚫 Your account has been banned by admin.</Text>
        <TouchableOpacity style={styles.btn} onPress={signOut}>
          <Text style={styles.btnText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>👋 {profile?.name || "..."}</Text>
      <View style={styles.pointsBox}>
        <Text style={styles.pointsLabel}>{t.points}</Text>
        <Text style={styles.pointsValue}>{profile?.points ?? 0}</Text>
      </View>

      {profile?.badges?.length > 0 && (
        <View style={styles.badgeRow}>
          {profile.badges.map((b) => (
            <View key={b} style={styles.badge}>
              <Text style={styles.badgeText}>🏅 {b}</Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Game")}>
        <Text style={styles.btnText}>🎮 {t.playGame}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate("Leaderboard")}>
        <Text style={styles.btnSecondaryText}>🏆 {t.leaderboard}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signOut} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff", justifyContent: "center" },
  welcome: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  pointsBox: { backgroundColor: "#e8ffe0", padding: 20, borderRadius: 16, alignItems: "center", marginBottom: 20 },
  pointsLabel: { fontSize: 16, color: "#58a700" },
  pointsValue: { fontSize: 40, fontWeight: "bold", color: "#58a700" },
  badgeRow: { flexDirection: "row", justifyContent: "center", marginBottom: 20, flexWrap: "wrap" },
  badge: { backgroundColor: "#fff3cd", padding: 8, borderRadius: 8, margin: 4 },
  badgeText: { fontWeight: "bold" },
  btn: { backgroundColor: "#58cc02", padding: 16, borderRadius: 12, marginBottom: 12 },
  btnText: { color: "#fff", fontSize: 18, textAlign: "center", fontWeight: "bold" },
  btnSecondary: { backgroundColor: "#1cb0f6", padding: 16, borderRadius: 12, marginBottom: 12 },
  btnSecondaryText: { color: "#fff", fontSize: 18, textAlign: "center", fontWeight: "bold" },
  signOut: { marginTop: 12 },
  signOutText: { textAlign: "center", color: "#999" },
  bannedText: { fontSize: 18, textAlign: "center", color: "red", marginBottom: 20 },
});
