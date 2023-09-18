import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
} from "react-native";
import Card from "./Card";
import image from "../../assets/favicon.png";
import { style } from "styled-system";

const getListCandidatos = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = async () => {
    const url = "http://10.20.35.185:5000/candidatos-list";
    let result = await fetch(url);
    result = await result.json();
    setData(result);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://10.20.35.185:5000/search/${search}`);
      setSearch(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <View>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <Button title="Search" onClick={handleSearch} />
      </View>
      {data.map ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <View style={styles.itemWrapper}>
              <Card style={styles.card}>
                <Image source={image} style={styles.itemImageStyle} />
                <Text style={styles.TextStyle}>Nombre:{item.Nombres}</Text>
                <Text style={styles.TextStyle}>Apellidos:{item.Apellidos}</Text>
                <Text style={styles.TextStyle}>Cedula:{item.Cedula}</Text>
                <Text style={styles.TextStyle}>Sexo:{item.Sexo}</Text>
                <Text style={styles.TextStyle}>Municipio:{item.Municipio}</Text>
              </Card>
            </View>
          )}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    alignItems: "center",
    height: 100,
    paddingTop: 40,
    backgroundColor: "#5DADE2",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 25,
    paddingEnd: 20,
  },
  itemWrapper: {
    paddingTop: 20,
    flexDirection: "column",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
    justifyContent: "center",
  },

  TextStyle: {
    color: "#FFFFFF",
    alignItems: "center",
  },
});

export default getListCandidatos;
