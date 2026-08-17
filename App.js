import React from "react";
import { ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 60 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "red", marginBottom: 12 }}>
            App Error:
          </Text>
          <Text selectable style={{ fontSize: 14, color: "#333" }}>
            {String(this.state.error && this.state.error.message)}
          </Text>
          <Text selectable style={{ fontSize: 12, color: "#999", marginTop: 20 }}>
            {String(this.state.error && this.state.error.stack)}
          </Text>
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </AuthProvider>
    </ErrorBoundary>
  );
}
