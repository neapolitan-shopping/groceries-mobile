import { FlatList, StyleSheet, RefreshControl } from "react-native";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUri } from "@/constants/BaseUrl";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";

export default function ListsScreen() {
  console.log("baseUri :>> ", baseUri);

  const [refreshing, setRefreshing] = useState(true);

  const query = useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${baseUri}/lists`);
        return data;
      } catch (e: any) {
        throw new Error(e.response.data);
      } finally {
        setRefreshing(false);
      }
    },
    refetchOnWindowFocus: false,
  });

  return (
    <View style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}
      <Text style={styles.title}>Select List</Text>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          gap: 8,
        }}
        data={query.data?.list}
        refreshControl={
          <RefreshControl
            onRefresh={() => query.refetch()}
            refreshing={refreshing}
          />
        }
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
