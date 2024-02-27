import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import data from "../../data.json"

export default function TabOneScreen() {

  const [listData, setListData] = useState<any>();
  const fetchData = async () => {
    const dataList = await fetch("http://localhost:3000/api/lists/65d47df752816aba80fba848");
    const parsed = await dataList.json();
    setListData(parsed)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>

      <FlatList
        style={styles.flatList}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          gap: 8,
        }}
        data={listData ? listData.items : []}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.itemName}
            </Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginTop: 4,
    marginBottom: 8,
    height: 1,
    width: '100%',
  },
});
