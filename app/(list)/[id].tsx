import { FlatList, StyleSheet } from 'react-native';
import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export default function SingleListScreen() {

   const { id } = useLocalSearchParams();

   const {
      data: listData,
      error,
      isLoading,
      refetch
   } = useQuery({
      queryKey: ['singleList'],
      queryFn: async () => {
         try {
            const { data } = await axios.get(`http://localhost:3000/api/lists/${id}`);
            return data
         } catch (e: any) {
            throw new Error(e.response.data)
         }
      },
      enabled: !!id,
   });

   useEffect(() => {
      if (id) {
         refetch();
      }
   }, [id])

   if (error) {
      return <>Ooops, something went wrong {error.message}</>
   };

   if (isLoading) {
      return <View style={styles.container}>Loading...</View>
   }

   if (!id) {
      return <View style={styles.container}>Select a list to start</View>
   }

   if (!listData || listData.length === 0) {
      return <View style={styles.container}>No Data found </View>
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
      marginTop: 80,
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
