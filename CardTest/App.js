import React from "react";
import CardCandidatos from "./component/CardContainer/CandidatosCard";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native";

const App = () => {
  return (
    <>
      <StatusBar />
      <Text style={styles.Header}> K2024</Text>
      <SafeAreaView style={styles.container}>
        <CardCandidatos />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    alignItems: "center",
  },
  Header: {
    textAlign: "center",
    height: 75,
    paddingTop: 10,
    backgroundColor: "#5DADE2",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 25,
    paddingEnd: 20,
  },
  card: {
    height: 200,
    width: "100%",
    backgroundColor: "#f18484",
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
  },
});
export default App;
