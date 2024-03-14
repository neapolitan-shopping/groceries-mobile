import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUri } from "@/constants/BaseUrl";

export default function ListsScreen() {
  console.log("baseUri :>> ", baseUri);

  const query = useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${baseUri}/lists`);
        return data;
      } catch (e: any) {
        throw new Error(e.response.data);
      }
    },
    refetchOnWindowFocus: false,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select List</Text>

      <FlatList
        style={styles.flatList}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          gap: 8,
        }}
        data={query.data?.list}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Link href={{ pathname: "/(list)/[id]", params: { id: item._id } }}>
              <Text>Accedi alla tua fantastica lista con questo link</Text>
            </Link>
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flatList: {
    width: "80%",
  },
  title: {
    marginTop: 90,
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginTop: 4,
    marginBottom: 8,
    height: 1,
    width: "100%",
  },
});
