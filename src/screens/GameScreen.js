import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { getGameSession, UI_TEXT } from "../data/translations";

function shuffleArray(arr) {
  return [...arr].sort(() => 0.5 - Math.random());
}

export default function GameScreen({ navigation, appLanguage }) {
  const t = UI_TEXT[appLanguage] || UI_TEXT.en;
  const { user, profile } = useAuth();
  const [session] = useState(() => getGameSession(appLanguage, profile?.points || 0, 10));
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [sessionPoints, setSessionPoints] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState(() =>
    session.length ? shuffleArray(session[0].options) : []
  );

  if (session.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.backText}>‹ {t.back}</Text>
        </TouchableOpacity>
        <Text style={styles.noData}>
          Questions for this language are coming soon! Try English or Hindi for now.
        </Text>
      </View>
    );
  }

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
        const nextIndex = index + 1;
        setShuffledOptions(shuffleArray(session[nextIndex].options));
        setIndex(nextIndex);
      } else {
        navigation.navigate("Home");
      }
    }, option === question.answer ? 800 : 1600);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.backText}>‹ {t.back}</Text>
      </TouchableOpacity>

      <Text style={styles.progress}>{index + 1} / {session.length}</Text>
      <Text style={styles.word}>{question.word}</Text>
      <Text style={styles.hint}>{t.translateFrom} {question.from.toUpperCase()} → {question.to.toUpperCase()}</Text>

      {feedback && (
        <View>
          <Text style={[styles.feedback, feedback === "correct" ? styles.correct : styles.wrong]}>
            {feedback === "correct" ? t.correct : t.wrong}
          </Text>
          {feedback === "wrong" && (
            <Text style={styles.correctAnswer}>{t.correctWas}: {question.answer}</Text>
          )}
        </View>
      )}

      <View style={styles.options}>
        {shuffledOptions.map((opt) => (
          <TouchableOpacity key={opt} style={styles.optionBtn} onPress={() => handleAnswer(opt)} disabled={!!feedback}>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sessionPoints}>{t.sessionPoints}: +{sessionPoints}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 50, backgroundColor: "#fff", justifyContent: "center" },
  backBtn: { position: "absolute", top: 50, left: 20 },
  backText: { fontSize: 16, color: "#1cb0f6", fontWeight: "600" },
  progress: { textAlign: "center", color: "#999", marginBottom: 12 },
  word: { fontSize: 40, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  hint: { textAlign: "center", color: "#999", marginBottom: 24 },
  feedback: { textAlign: "center", fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  correct: { color: "#58a700" },
  wrong: { color: "#ea2b2b" },
  correctAnswer: { textAlign: "center", fontSize: 14, color: "#666", marginBottom: 12 },
  options: { gap: 12 },
  optionBtn: { backgroundColor: "#f7f7f7", borderWidth: 2, borderColor: "#e5e5e5", padding: 16, borderRadius: 12, marginBottom: 12 },
  optionText: { fontSize: 18, textAlign: "center", fontWeight: "600" },
  sessionPoints: { textAlign: "center", marginTop: 12, color: "#58a700", fontWeight: "bold" },
  noData: { textAlign: "center", fontSize: 16, color: "#999", marginTop: 100, paddingHorizontal: 20 },
});
