import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from "react-native";
import Card from "./CardDesign/Card";
import foto from "../assets/favicon.png";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ cedula, nombres, primer_apellido, segundo_apellido, sexo }) => (
  <Card>
    <View style={styles.item}>
      <Image source={foto} />
      <Text style={styles.title}>Carnet:{cedula}</Text>
      <Text style={styles.title}>Nombre:{nombres}</Text>
      <Text style={styles.title}>Primer_apellido:{primer_apellido}</Text>
      <Text style={styles.title}>Segundo_apellido:{segundo_apellido}</Text>
      <Text style={styles.title}>Genero:{sexo}</Text>
    </View>
  </Card>
);

// the filter
const List = (props) => {
  const [searchData, SetSearchData] = useState([]);
  const renderItem = ({ item }) => {
    // when no input, no show all
    if (props.searchPhrase === "") {
      return null;
    }
    // filter of the name
    else if (
      item.cedula.toUpperCase().includes(
        props.searchPhrase
          .toUpperCase()
          .trim()
          .replace(/^(7,8,9)([0-9]{9})$/g, "")
      )
    ) {
      return (
        <Item
          cedula={item.cedula}
          nombres={item.nombres}
          primer_apellido={item.primer_apellido}
          segundo_apellido={item.segundo_apellido}
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
        {searchData.filter((n) => n.length == 11) ? (
          <FlatList
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.cedula.toString()}
          />
        ) : (
          <ActivityIndicator size="large" />
        )}
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
    margin: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
    color: "white",
  },
});
