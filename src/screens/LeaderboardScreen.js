import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { UI_TEXT } from "../data/translations";

export default function LeaderboardScreen({ navigation, appLanguage }) {
  const t = UI_TEXT[appLanguage] || UI_TEXT.en;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("points", "desc"), limit(50));
    const unsub = onSnapshot(q, (snap) => {
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.backText}>‹ {t.back}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>🏆 {t.leaderboard}</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <Text style={styles.name}>{item.name}{item.badges?.includes("100k") ? " 🏅" : ""}</Text>
            <Text style={styles.points}>{item.points}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#fff" },
  backBtn: { marginBottom: 8 },
  backText: { fontSize: 16, color: "#1cb0f6", fontWeight: "600" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, borderBottomWidth: 1, borderColor: "#eee" },
  rank: { width: 40, fontWeight: "bold", color: "#999" },
  name: { flex: 1, fontSize: 16 },
  points: { fontWeight: "bold", color: "#58a700" },
});
