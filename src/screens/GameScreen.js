import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { getGameSession, UI_TEXT } from "../data/translations";

export default function GameScreen({ navigation, appLanguage }) {
  const t = UI_TEXT[appLanguage] || UI_TEXT.en;
  const { user, profile } = useAuth();
  const [session] = useState(() => getGameSession(10));
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [sessionPoints, setSessionPoints] = useState(0);

  const question = session[index];

  const handleAnswer = async (option) => {
    if (option === question.answer) {
      setFeedback("correct");
      setSessionPoints((p) => p + 10);
      await updateDoc(doc(db, "users", user.uid), { points: increment(10) });

      const newTotal = (profile?.points || 0) + 10;
      if (newTotal >= 100000 && !profile?.badges?.includes("100k")) {
        await updateDoc(doc(db, "users", user.uid), {
          badges: [...(profile?.badges || []), "100k"],
        });
      }
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => {
      setFeedback(null);
      if (index + 1 < session.length) {
        setIndex((i) => i + 1);
      } else {
        navigation.navigate("Home");
      }
    }, 800);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>{index + 1} / {session.length}</Text>
      <Text style={styles.word}>{question.word}</Text>
      <Text style={styles.hint}>Translate from {question.from.toUpperCase()} → {question.to.toUpperCase()}</Text>

      {feedback && (
        <Text style={[styles.feedback, feedback === "correct" ? styles.correct : styles.wrong]}>
          {feedback === "correct" ? t.correct : t.wrong}
        </Text>
      )}

      <View style={styles.options}>
        {question.options.map((opt) => (
          <TouchableOpacity key={opt} style={styles.optionBtn} onPress={() => handleAnswer(opt)} disabled={!!feedback}>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sessionPoints}>Session: +{sessionPoints}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff", justifyContent: "center" },
  progress: { textAlign: "center", color: "#999", marginBottom: 12 },
  word: { fontSize: 40, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  hint: { textAlign: "center", color: "#999", marginBottom: 24 },
  feedback: { textAlign: "center", fontSize: 16, fontWeight: "bold", marginBottom: 12 },
  correct: { color: "#58a700" },
  wrong: { color: "#ea2b2b" },
  options: { gap: 12 },
  optionBtn: { backgroundColor: "#f7f7f7", borderWidth: 2, borderColor: "#e5e5e5", padding: 16, borderRadius: 12, marginBottom: 12 },
  optionText: { fontSize: 18, textAlign: "center", fontWeight: "600" },
  sessionPoints: { textAlign: "center", marginTop: 12, color: "#58a700", fontWeight: "bold" },
});
