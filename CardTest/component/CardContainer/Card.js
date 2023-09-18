import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>
      {props.children}
      <Text style={{ ...styles.text, ...props.style }}>{props.title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "#2D81A7",
    padding: 20,
    borderRadius: 15,
    color: "white",
  },
  text: {
    color: "white",
  },
});

export default Card;
