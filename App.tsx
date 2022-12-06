import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import MyBooksProvider from './context/MyBooksProvider';

//import the APOLLO Client
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";


//stepzen whoami --apikey
const API_KEY = "mountcarmel::stepzen.net+1000::928e14b9fcb1a3712ec22ec108da8f6bf89d836b1a33539c8ac531447547db4b";


const client = new ApolloClient({
  uri: "https://mountcarmel.stepzen.net/api/waxen-prawn/__graphql",
  headers: {
    Authorization: `Apikey ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});



export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client} >
          <MyBooksProvider>
            <Navigation colorScheme={colorScheme} />
        </MyBooksProvider>
        <StatusBar />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
