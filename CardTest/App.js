import React from "react";
<<<<<<< HEAD
import { StyleSheet, Text, StatusBar, SafeAreaView } from "react-native";
=======
import { StyleSheet, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native";
>>>>>>> 7830b37b8fbe2db7735e1f1059e43cd139a4a9a4
import CardCiudadanos from "./component/CardContainer/CardCiudadanos";

const App = () => {
  return (
    <>
      <StatusBar />
      <Text style={styles.Header}>L2024</Text>
      <SafeAreaView style={styles.container}>
<<<<<<< HEAD
        <CardCiudadanos />
=======
        {/*    <CardCiudadanos /> */}

        {/*  <CardCandidatos /> */}
        {/* <HomeScreen/> */}
>>>>>>> 7830b37b8fbe2db7735e1f1059e43cd139a4a9a4
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
