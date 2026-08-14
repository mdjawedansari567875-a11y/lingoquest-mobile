import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { LANGUAGES, UI_TEXT } from "../data/translations";

export default function ChangeLanguageScreen({ navigation, appLanguage }) {
  const t = UI_TEXT[appLanguage] || UI_TEXT.en;
  const { user, profile } = useAuth();
  const [selected, setSelected] = useState(profile?.language || "en");
  const [search, setSearch] = useState("");

  const filtered = LANGUAGES.filter((l) =>
    l.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async () => {
    await updateDoc(doc(db, "users", user.uid), { language: selected });
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate("Settings")}>
        <Text style={styles.backText}>‹ {t.back}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{t.selectLanguage}</Text>
      <TextInput
        style={styles.search}
        placeholder={t.searchLanguage}
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.code}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.option, selected === item.code && styles.optionSelected]}
            onPress={() => setSelected(item.code)}
          >
            <Text style={styles.optionText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>{t.save}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 50, backgroundColor: "#fff" },
  backBtn: { marginBottom: 12 },
  backText: { fontSize: 16, color: "#1cb0f6", fontWeight: "600" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
  search: { borderWidth: 1, borderColor: "#ddd", borderRadius: 12, padding: 12, marginBottom: 12, fontSize: 16 },
  option: { padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#ddd", marginBottom: 10 },
  optionSelected: { borderColor: "#58cc02", backgroundColor: "#e8ffe0" },
  optionText: { fontSize: 18, textAlign: "center" },
  saveBtn: { marginTop: 12, backgroundColor: "#58cc02", padding: 16, borderRadius: 12 },
  saveText: { color: "#fff", fontSize: 18, textAlign: "center", fontWeight: "bold" },
});
