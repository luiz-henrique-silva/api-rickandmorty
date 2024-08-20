import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ScrollView, Image } from 'react-native';
import { useEffect, useState } from 'react';

const request = async (Callback) => {
  const response = await fetch('https://rickandmortyapi.com/api/character');
  // trazendo a api e transformando em linguagem JSON 
  const parsed = await response.json();
  Callback(parsed.results);
};

export default function App() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    request(setRegistros);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.textName}>{item.name}</Text>
      <Text style={styles.textDetails}>Altura: {item.height}</Text>
      <Text style={styles.textDetails}>Espécie: {item.species}</Text>
      <Text style={styles.textDetails}>Status: {item.status}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Rick and Morty Characters</Text>
        <FlatList
          data={registros}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
        <StatusBar style='auto' />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingTop: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    padding: 15,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  textName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  textDetails: {
    fontSize: 14,
    color: '#34495e',
  },
});
