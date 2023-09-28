import { View, StyleSheet, Dimensions } from "react-native";

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.CardContainer}>{props.children}</View>
    </View>
  );
}
const deviceWith = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 250,
    elevation: 2,
    borderRadius: 20,
    backgroundColor: "#5675B2",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  CardContainer: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
