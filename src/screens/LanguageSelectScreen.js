import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANGUAGES } from "../data/translations";

export default function LanguageSelectScreen({ navigation, setAppLanguage }) {
  const [selected, setSelected] = useState("en");

  const handleContinue = async () => {
    await AsyncStorage.setItem("appLanguage", selected);
    setAppLanguage(selected);
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select App Language</Text>
      {LANGUAGES.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[styles.option, selected === lang.code && styles.optionSelected]}
          onPress={() => setSelected(lang.code)}
        >
          <Text style={styles.optionText}>{lang.label}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 24, textAlign: "center" },
  option: { padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#ddd", marginBottom: 12 },
  optionSelected: { borderColor: "#58cc02", backgroundColor: "#e8ffe0" },
  optionText: { fontSize: 18, textAlign: "center" },
  continueBtn: { marginTop: 20, backgroundColor: "#58cc02", padding: 16, borderRadius: 12 },
  continueText: { color: "#fff", fontSize: 18, textAlign: "center", fontWeight: "bold" },
});
