import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { useAuth } from "../context/AuthContext";
import { UI_TEXT } from "../data/translations";

export default function SettingsScreen({ navigation, appLanguage }) {
  const t = UI_TEXT[appLanguage] || UI_TEXT.en;
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.backText}>‹ {t.back}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>⚙️ {t.settings}</Text>

      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate("ChangeLanguage")}
      >
        <Text style={styles.rowText}>🌐 {t.changeLanguage}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.row}
        onPress={() => Linking.openURL("mailto:support@lingoquest.app")}
      >
        <Text style={styles.rowText}>✉️ {t.contactSupport}</Text>
      </TouchableOpacity>
      <Text style={styles.supportHint}>{t.supportMessage} support@lingoquest.app</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
        <Text style={styles.logoutText}>🚪 {t.logout}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 50, backgroundColor: "#fff" },
  backBtn: { marginBottom: 20 },
  backText: { fontSize: 16, color: "#1cb0f6", fontWeight: "600" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 30 },
  row: { padding: 18, borderWidth: 1, borderColor: "#eee", borderRadius: 12, marginBottom: 12 },
  rowText: { fontSize: 17, fontWeight: "600" },
  supportHint: { fontSize: 13, color: "#999", marginBottom: 24, paddingHorizontal: 4 },
  logoutBtn: { marginTop: 20, backgroundColor: "#ea2b2b", padding: 16, borderRadius: 12 },
  logoutText: { color: "#fff", fontSize: 17, textAlign: "center", fontWeight: "bold" },
});
