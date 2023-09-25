import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = (props) => {
  return <View style={styles.mainCardView}>{props.children}</View>;
};

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: " #ddd",
    borderBottomWidth: 0,
    shadowColor: " #000",
    shadowOffset: { with: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowsRadius: 2,
    elevation: 1.5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    height: 200,
  },
  mainCardView: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4E70B4",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
});

export default Card;
