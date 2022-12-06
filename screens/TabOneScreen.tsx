import { gql,useLazyQuery,useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList , TextInput, Button} from 'react-native';
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
  const [search, setSearch] = useState('');

  //if you want the search to be dynamic
  //const {data,loading,error}= useQuery(query,{variables:{q:search}});

  // confirm the search when the user presses the search button
  const [runQuery, { data, loading, error }] = useLazyQuery(query);
  
  const [provider,setProvider] = useState<"googleBooksSearch" | "openLibrarySearch">("googleBooksSearch");

  
  const parseBook = (item: { volumeInfo: { title: any; imageLinks: { thumbnail: any; }; authors: any; industryIdentifiers: { identifier: any; }[]; }; title: any; author_name: any; cover_edition_key: any; isbn: any[]; }) => {
    if (provider === "googleBooksSearch") {
      return {
        title: item.volumeInfo.title,
        image: item.volumeInfo.imageLinks?.thumbnail,
        authors: item.volumeInfo.authors,
        isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier,
      };
    } else {
      return {
        title: item.title,
        authors: item.author_name,
        image: `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
        isbn: item.isbn?.[0],
      };
    }
  };
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TextInput placeholder='Search ...' style={styles.input}  value={search}  onChangeText={setSearch} />
        <Button title='Search' onPress={() => runQuery({ variables: { q: search } })}/>
      </View>

      <View style={styles.tabs}>
        <Text 
        style={provider==="googleBooksSearch"? {fontWeight:'bold', color:"royalblue"}: {}} 
        onPress={()=>setProvider("googleBooksSearch")} >Google Books</Text>

        <Text 
        style={provider==="openLibrarySearch"? {fontWeight:'bold', color:"royalblue"}: {}} 
        onPress={()=>setProvider("openLibrarySearch")}>Open Library</Text>

      </View>

      {loading && <ActivityIndicator   />}
      {error && (
        <View>
          <Text>Error Fetching data</Text>
          <Text>{error.message}</Text>
        </View>
      )}
      <FlatList
        data={provider === 'googleBooksSearch' ? data?.googleBooksSearch?.items : data?.openLibrarySearch?.docs || []}
        renderItem={({ item }) => (
        <BookItem
          book={parseBook(item)}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gainsboro",
    borderRadius: 5,
    padding: 10,
  },  
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
  },
});
/*function runQuery(arg0: { variables: { q: string; }; }): void {
  throw new Error('Function not implemented.');
}*/

