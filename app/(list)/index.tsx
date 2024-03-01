import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';

export default function ListsScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select List</Text>
      <Link href={{ pathname: "/(list)/[id]", params: { id: "65d128fc2d72462bc583614f" } }}>
        <Text>
          Accedi alla tua fantastica lista
        </Text>
      </Link>
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
    marginTop: 90,
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
