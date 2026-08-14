import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { UI_TEXT } from "../data/translations";

export default function ProfileScreen({ navigation, appLanguage }) {
  const t = UI_TEXT[appLanguage] || UI_TEXT.en;
  const { profile, user } = useAuth();
  const [name, setName] = useState(profile?.name || "");
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await updateDoc(doc(db, "users", user.uid), { name });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.backText}>‹ {t.back}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>👤 {t.profile}</Text>

      <Text style={styles.label}>{t.editName}</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>{saved ? t.saved : t.save}</Text>
      </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 50, backgroundColor: "#fff" },
  backBtn: { marginBottom: 20 },
  backText: { fontSize: 16, color: "#1cb0f6", fontWeight: "600" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 24 },
  label: { fontSize: 14, color: "#999", marginBottom: 6 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 12, padding: 14, marginBottom: 12, fontSize: 16 },
  saveBtn: { backgroundColor: "#58cc02", padding: 14, borderRadius: 12, marginBottom: 24 },
  saveText: { color: "#fff", fontSize: 16, textAlign: "center", fontWeight: "bold" },
  pointsBox: { backgroundColor: "#e8ffe0", padding: 20, borderRadius: 16, alignItems: "center", marginBottom: 20 },
  pointsLabel: { fontSize: 16, color: "#58a700" },
  pointsValue: { fontSize: 40, fontWeight: "bold", color: "#58a700" },
  badgeRow: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap" },
  badge: { backgroundColor: "#fff3cd", padding: 8, borderRadius: 8, margin: 4 },
  badgeText: { fontWeight: "bold" },
});
