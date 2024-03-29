import {
  FlatList,
  StyleSheet,
  RefreshControl,
  View as DefaultView,
  Text as DefaultText,
  Pressable,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUri } from "@/constants/BaseUrl";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import AddListFABModal from "@/components/AddListFABModal";
import { MaterialIcons } from "@expo/vector-icons";
import { deleteList, getLists } from "@/lib/fetch/list";

export default function ListsScreen() {
  const [refreshing, setRefreshing] = useState(true);
  const queryClient = useQueryClient();

  const lists = useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      const data = await getLists();
      setRefreshing(false);

      return data;
    },
    refetchOnWindowFocus: false,
  });

  const deleteListMutation = useMutation({
    mutationFn: (itemId: string) => deleteList(itemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
  });

  return (
    <View style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}
      <Text style={styles.title}>Select List</Text>
      <FlatList
        style={styles.flatList}
        onScroll={({ nativeEvent }) => ""}
        contentContainerStyle={styles.contentContainerStyle}
        data={lists.data?.list}
        refreshControl={
          <RefreshControl
            onRefresh={() => lists.refetch()}
            refreshing={refreshing}
          />
        }
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <DefaultView style={styles.listContent}>
              <Link
                style={styles.listLink}
                onLongPress={() => console.log("ciaos assi")}
                href={{ pathname: "/(list)/[id]", params: { id: item._id } }}
              >
                <DefaultText ellipsizeMode="tail" numberOfLines={1}>
                  {item.name}
                </DefaultText>
              </Link>
              <Pressable>
                <Pressable
                  style={styles.listIcon}
                  onPress={() => {
                    deleteListMutation.mutate(item._id);
                  }}
                >
                  <MaterialIcons name="delete-forever" size={32} />
                </Pressable>
              </Pressable>
            </DefaultView>
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            />
          </View>
        )}
      />
      <AddListFABModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  flatList: {
    marginLeft: "auto",
    width: "100%",
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
    gap: 16,
    width: "100%",
    marginTop: 50,
  },
  title: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: "bold",
  },
  listContainer: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "70%",
  },
  listContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listLink: {
    flex: 9,
  },
  listIcon: {
    flex: 1,
  },
  separator: {
    marginTop: 4,
    marginBottom: 8,
    height: 1,
    width: "95%",
  },
});
