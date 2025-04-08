import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const foods = [
  {
    id: '1',
    name: 'Pizza Hải Sản',
    price: '120,000$',
    image: require('../../images/pizza.png'),
  },
  {
    id: '2',
    name: 'Bún Bò Huế',
    price: '50,000$',
    image: require('../../images/bunbo.png'),
  },
  {
    id: '3',
    name: 'Trà Sữa Trân Châu',
    price: '35,000$',
    image: require('../../images/trasua.png'),
  },
  {
    id: '4',
    name: 'Thịt Xiên Nướng',
    price: '15,000$',
    image: require('../../images/thitxien.png'),
  },
];

const HomeScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.foodName}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderText}>Order </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ List of dishes</Text>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf3',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 12,
    marginBottom: 12,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#666',
    marginVertical: 8,
  },
  orderButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  orderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
