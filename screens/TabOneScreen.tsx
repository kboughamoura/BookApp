import { gql,useQuery } from '@apollo/client';
import React from 'react';
import { ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import BookItem from '../components/BookItem';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

//QUERIES
const query = gql`
  query SearchBooks($q: String) {
    googleBooksSearch(q: $q, country: "US") {
      items {
        id
        volumeInfo {
          authors
          averageRating
          description
          imageLinks {
            thumbnail
          }
          title
          subtitle
          industryIdentifiers {
            identifier
            type
          }
        }
      }
    }
    openLibrarySearch(q: $q) {
      docs {
        author_name
        title
        cover_edition_key
        isbn
      }
    }
  }
`;



export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const {data,loading,error}= useQuery(query,{variables:{q:"React Nativequery"}});
  console.log(data);
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator   />}
      {error && (
        <View>
          <Text>Error Fetching data</Text>
          <Text>{error.message}</Text>
        </View>
      )}
      <FlatList
        data={data?.googleBooksSearch?.items || []}
        renderItem={({ item }) => (
        <BookItem
          book={{
            title: item.volumeInfo.title,
            image: item.volumeInfo.imageLinks?.thumbnail,
            authors: item.volumeInfo.authors,
            isbn: item.volumeInfo.industryIdentifiers[0].identifier,
      }}
    />
  )}
  showsVerticalScrollIndicator={false}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
