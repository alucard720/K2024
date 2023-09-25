import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ cedula, nombres, primer_apellido, sexo }) => (
  <View style={styles.item}>
    <Text style={styles.title}>Carnet:{cedula}</Text>
    <Text style={styles.details}>Nombre:{nombres}</Text>
    <Text style={styles.details}>Apellidos:{primer_apellido}</Text>
    <Text style={styles.details}>Genero:{sexo}</Text>
  </View>
);

// the filter
const List = (props) => {
  const renderItem = ({ item }) => {
    // when no input, no show all
    if (props.searchPhrase === "") {
      return;
    }
    // filter of the name
    else if (
      item.cedula
        .toUpperCase()
        .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Item
          cedula={item.cedula}
          nombres={item.nombres}
          primer_apellido={item.primer_apellido}
          sexo={item.sexo}
        />
      );
    }
    // filter of the description
    /*     if (
      item.details
        .toUpperCase()
        .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} details={item.details} />;
    } */
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          props.setClicked(false);
        }}
      >
        <FlatList
          data={props.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.cedula}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});
