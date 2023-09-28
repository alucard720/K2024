import React from "react";
import { StyleSheet, Text, StatusBar, SafeAreaView } from "react-native";
import CardCiudadanos from "./component/CardContainer/CardCiudadanos";

const App = () => {
  return (
    <>
      <StatusBar />
      <Text style={styles.Header}>L2024</Text>
      <SafeAreaView style={styles.container}>
        <CardCiudadanos />
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
    fontSize: 35,
    color: "#FFFFFF",
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
