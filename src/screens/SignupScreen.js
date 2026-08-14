import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { UI_TEXT } from "../data/translations";

export default function SignupScreen({ navigation, appLanguage }) {
  const t = UI_TEXT[appLanguage] || UI_TEXT.en;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", cred.user.uid), {
        name, email, points: 0, badges: [], banned: false, isAdmin: false,
        language: appLanguage, createdAt: serverTimestamp(),
      });
    } catch (err) {
      Alert.alert("Signup failed", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.signup}</Text>
      <TextInput style={styles.input} placeholder={t.name} value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder={t.email} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder={t.password} value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.btn} onPress={handleSignup}>
        <Text style={styles.btnText}>{t.signup}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>{t.login}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 24 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 12, padding: 14, marginBottom: 12, fontSize: 16 },
  btn: { backgroundColor: "#58cc02", padding: 16, borderRadius: 12, marginTop: 8 },
  btnText: { color: "#fff", fontSize: 18, textAlign: "center", fontWeight: "bold" },
  link: { textAlign: "center", marginTop: 16, color: "#1cb0f6", fontSize: 16 },
});
