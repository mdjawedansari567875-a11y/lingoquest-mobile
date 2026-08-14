import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { LANGUAGES } from "../data/translations";

export default function LanguageSelectScreen() {
  const { user, signOut } = useAuth();
  const [selected, setSelected] = useState("en");
  const [search, setSearch] = useState("");

  const filtered = LANGUAGES.filter((l) =>
    l.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = async () => {
    await updateDoc(doc(db, "users", user.uid), { language: selected });
    // Profile listener in AuthContext will pick this up and switch to Home automatically
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select App Language</Text>
      <TextInput
        style={styles.search}
        placeholder="Search language..."
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
      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signOut}>
        <Text style={styles.signOutLink}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
  search: { borderWidth: 1, borderColor: "#ddd", borderRadius: 12, padding: 12, marginBottom: 12, fontSize: 16 },
  option: { padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#ddd", marginBottom: 10 },
  optionSelected: { borderColor: "#58cc02", backgroundColor: "#e8ffe0" },
  optionText: { fontSize: 18, textAlign: "center" },
  continueBtn: { marginTop: 12, backgroundColor: "#58cc02", padding: 16, borderRadius: 12 },
  continueText: { color: "#fff", fontSize: 18, textAlign: "center", fontWeight: "bold" },
  signOutLink: { textAlign: "center", marginTop: 12, color: "#999" },
});
