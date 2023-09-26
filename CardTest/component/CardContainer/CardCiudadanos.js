import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import List from "../List";
import SearchBar from "../SearchBar";
const API_ENDPOINT = "http://192.168.1.30:5000/mssql/data";

const CardCiudadanos = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState([]);
  const [isloading, setIsLoading] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then(
        (res) => {
          setFakeData(res);
          setIsLoading(true);
        },
        (error) => {
          setIsLoading(true);
          setError(error);
        }
      );
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, marginHorizontal: 20, alignItems: "center" }}
    >
      {!clicked && (
        <Text style={styles.itemContainer}>BUSCAR SOLO POR CEDULA</Text>
      )}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {!fakeData ? (
        <ActivityIndicator size="small" />
      ) : (
        <List
          searchPhrase={searchPhrase}
          data={fakeData}
          setClicked={setClicked}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textName: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "600",
  },
  textRest: {
    fontSize: 14,
    marginLeft: 10,
    color: "grey",
  },
});

export default CardCiudadanos;
