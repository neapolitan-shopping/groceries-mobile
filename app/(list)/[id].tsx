import { FlatList, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

export default function SingleListScreen() {

   const lol = useLocalSearchParams()

   console.log('lol :>> ', lol.id);

   const { data: listData, error } = useSuspenseQuery({
      queryKey: ['lists'],
      queryFn: async () => {
         try {
            const data = await fetch(`http://localhost:3000/api/lists/${lol.id}`);
            const parsed = await data.json();
            return parsed
         } catch (e) {
            console.error(e)
         }
      }
   });

   if (error) {
      throw error
    }


   return (
      <Suspense fallback={<>Loading...</>}>
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
      </Suspense>
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
