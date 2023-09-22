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

  /*  useEffect(() => {
    getApiData();
  }, []); */

  const getApiData = async (query) => {
    /*     const query = e.target.query;
     */ fetch(`http://192.168.1.30:5000/mssql/data?=${query}`)
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
      <View>
        <TextInput
          onChangeText={getApiData}
          placeholder="Search User"
          style={{
            width: "300px",
            borderWidth: 1,
            borderColor: "gray",
            padding: 4,
            margin: 16,
          }}
        />
      </View>

      {data.length > 0 && (
        <>
          {data.map ? (
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
    color: "#FFFFFF",
    alignItems: "center",
  },
  input: {
    borderColor: "#FFFFFF",
    fontSize: 22,
  },
});

export default getListCandidatos;
