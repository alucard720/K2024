import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
} from "react-native";
import SearchBar from "../component/SearchBar";
const HomeScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async (query) => {
      await fetch(`http://10.0.0.253:5000/mssql/data?=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getData();
  }, []);
  return (
    <SafeAreaView style={styles.root}>
      {!clicked && <Text style={styles.title}></Text>}

      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {/*  {!data ? (
        <ActivityIndicator size="small" />
      ) : (
        <List searchPhrase={searchPhrase} data={data} setClicked={setClicked} />
      )} */}

      <>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, i }) => (
            <View style={styles.itemWrapper}>
              <Card style={styles.card}>
                <Image source={image} style={styles.itemImageStyle} />
                <Text style={styles.TextStyle} key={item.cedula}>
                  Cedula:{item.cedula}
                </Text>
                <Text style={styles.TextStyle} key={item.nombres}>
                  Nombre:{item.nombres}
                </Text>
                <Text style={styles.TextStyle} key={item.primer_apellido}>
                  Apellidos:{item.primer_apellido}
                </Text>
                <Text style={styles.TextStyle} key={item.sexo}>
                  Sexo:{item.sexo}
                </Text>
              </Card>
            </View>
          )}
        />
      </>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});
