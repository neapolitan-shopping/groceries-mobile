import { FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "@/components/Themed";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  getListItems,
  updateListItem,
  updateLocalListItem,
} from "@/lib/fetch/listItem";
import AddItemFABModal from "@/components/AddItemFABModal";
import ListItem from "@/components/ListItem";
import { queryListClient } from "../_layout";

const dayInMilliseconds = 1000 * 60 * 60 * 24;

export default function SingleListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: listData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["listItems"],
    queryFn: async () => getListItems(id),
    enabled: !!id,
    staleTime: dayInMilliseconds,
    gcTime: dayInMilliseconds,
  });

  const updateItemMutation = useMutation({
    mutationKey: ["listItems"],
    mutationFn: updateListItem,
    onMutate: async ({ id, body }) => {
      await queryListClient.cancelQueries({
        queryKey: ["listItems"],
        exact: true,
      });
      updateLocalListItem({ id, body });
    },
    onSuccess: (data) => {
      console.log("QUERY RUN SUCCESSFULLYWITH THIS DATA", data);
    },
  });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  if (error) {
    return <Text>Ooops, something went wrong {error.message}</Text>;
  }

  if (isLoading) {
    return <Text style={styles.container}>Loading...</Text>;
  }

  if (!id) {
    return <Text style={styles.container}>Select a list to start</Text>;
  }

  if (!listData || listData.length === 0) {
    return <Text style={styles.container}>No Data found </Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{listData.name}</Text>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          gap: 8,
        }}
        data={listData.items}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <ListItem
              listId={id}
              itemMutation={updateItemMutation}
              item={item}
            />
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            />
          </View>
        )}
      />
      <AddItemFABModal listId={id} />
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
    marginTop: 80,
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginTop: 4,
    marginBottom: 8,
    height: 1,
    width: "100%",
  },
  itemContainer: {
    display: "flex",
    gap: 8,
  },
});
