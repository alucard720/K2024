import { ActivityIndicator, SafeAreaView, StatusBar, View } from "react-native";
import SearchBar from "../component/SearchBar";
import List from "../component/List";
const HomeScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      await fetch(`http://192.168.1.30:5000/mssql/data?=${query}`)
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
      {!clicked && <Text style={styles.title}>K2024</Text>}

      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {!data ? (
        <ActivityIndicator size="large" />
      ) : (
        <List searchPhrase={searchPhrase} data={data} setClicked={setClicked} />
      )}
    </SafeAreaView>
  );
};

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
