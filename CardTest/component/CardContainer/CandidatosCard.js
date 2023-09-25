import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  VirtualizedList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../SearchBar";
import Card from "./Card";
import CardSection from "./CardSection";
const getListCandidatos = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState();

  /*   useEffect(() => {
   

    getApiData();
  }, []); */

  const getApiData = async (query) => {
    /*     const query = e.target.query;
     */ await fetch(`http://10.0.0.253:5000/mssql/data?=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
    /* let result = await fetch(url);
    result = await result.json();
    setData(result); */
  };

  /* const handleSearch = async () => {
    
    try {
      const response = await fetch(
        `http://10.20.35.185:5000/candidatos-list?=${query}`
      );
      setSearch(response.data);
    } catch (error) {
      console.error(error);
    }
  }; */

  return (
    <View>
      {/*   <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          onChangeText={getApiData}
          placeholder="Buscar"
        />
      </View> */}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
        onChangeText={getApiData}
      />

      {data.length > 0 && (
        <>
          {data.map ? (
            <FlatList
              data={data}
              keyExtractor={(item) => item.cedula.toString()}
              renderItem={({ item }) => (
                <Card>
                  <View>
                    <Ionicons name="person" size={30} color="black" />
                  </View>
                  <View>
                    <Text style={styles.TextStyle} key={item.cedula}>
                      Cedula:{item.cedula}
                    </Text>
                    <Text style={styles.TextStyle} key={item.nombres}>
                      Nombre:{item.nombres}
                    </Text>
                  </View>
                  <Text style={styles.TextStyle} key={item.primer_apellido}>
                    Apellidos:{item.primer_apellido}
                  </Text>
                  <Text style={styles.TextStyle} key={item.sexo}>
                    Sexo:{item.sexo}
                  </Text>
                </Card>
              )}
            />
          ) : null}
        </>
      )}
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
    color: "white",
    alignItems: "center",
  },
  input: {
    borderColor: "#FFFFFF",
    fontSize: 22,
  },
  searchBar: {
    paddingLeft: 10,
    fontSize: 16,
  },
  container: {
    height: "150",
    paddingHorizontal: "200",
    borderRadius: 30,
    justifyContent: "center",
    borderWidth: 1,
  },
});

export default getListCandidatos;
