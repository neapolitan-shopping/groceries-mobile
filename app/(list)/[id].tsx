import { FlatList, StyleSheet } from 'react-native';
import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { baseUri } from '@/constants/BaseUrl';
import BouncyCheckbox from '@/components/BouncyCheckbox';

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
            const { data } = await axios.get(`${baseUri}/lists/${id}`);
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
      return <Text>Ooops, something went wrong {error.message}</Text>
   };

   if (isLoading) {
      return <Text style={styles.container}>Loading...</Text>
   }

   if (!id) {
      return <Text style={styles.container}>Select a list to start</Text>
   }

   if (!listData || listData.length === 0) {
      return <Text style={styles.container}>No Data found </Text>
   }

   const Nice = ({ item }: { item: any }) => {
      return (
         <View>
            <Text>
               {item.itemName}
            </Text>
         </View>
      )
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
                  <BouncyCheckbox
                     onPress={(isChecked) => console.log('isChecked :>> ', isChecked)}
                     text={item.itemName}
                     textContainerStyle={{
                        marginLeft: 8
                     }}
                  />
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
   itemContainer: {
      display: "flex",
      gap: 8
   }
});
