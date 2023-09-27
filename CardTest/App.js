import React from "react";
import { StyleSheet, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native";
import CardCiudadanos from "./component/CardContainer/CardCiudadanos";
import ImagedCardView from "react-native-imaged-card-view";
const yosemite =
  "https://images.unsplash.com/photo-1548625361-1adcab316530?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80";

const App = () => {
  return (
    <>
      <StatusBar />
      <Text style={styles.Header}>L2024</Text>
      <SafeAreaView style={styles.container}>
        <ImagedCardView
          stars={5}
          reviews={456}
          ratings={4.5}
          title="Yosemite"
          rightSideValue="$990"
          subtitle="California"
          leftSideValue="3 Days"
          backgroundColor="#ff6460"
          source={{
            uri: yosemite,
          }}
        />
        {/*   <CardCiudadanos /> */}
        {/*  <CardCandidatos /> */}

        {/* <HomeScreen/> */}
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
