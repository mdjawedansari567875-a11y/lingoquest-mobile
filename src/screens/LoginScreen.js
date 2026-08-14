import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { UI_TEXT } from "../data/translations";

export default function LoginScreen({ navigation, appLanguage }) {
  const t = UI_TEXT[appLanguage] || UI_TEXT.en;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      Alert.alert("Login failed", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LingoQuest</Text>
      <TextInput style={styles.input} placeholder={t.email} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder={t.password} value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>{t.login}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>{t.signup}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 32, color: "#58cc02" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 12, padding: 14, marginBottom: 12, fontSize: 16 },
  btn: { backgroundColor: "#58cc02", padding: 16, borderRadius: 12, marginTop: 8 },
  btnText: { color: "#fff", fontSize: 18, textAlign: "center", fontWeight: "bold" },
  link: { textAlign: "center", marginTop: 16, color: "#1cb0f6", fontSize: 16 },
});
