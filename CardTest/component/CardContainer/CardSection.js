import React from "react";
import { View, StyleSheet } from "react-native";

const CardSection = (props) => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 1,
    padding: 15,
    justifyContent: "space-around",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative",
    elevation: 1.5,
    shadowOffset: { with: 0, height: 2 },
    shadowOpacity: 0.1,
    height: "100%",
  },
});

export default CardSection;
