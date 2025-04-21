import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";
import { COLOURS, Items } from "../../components/database/Data";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'; // hoặc FontAwesome tùy bạn

import { styles } from "../styles/HomeScreenStyles"; // Import styles từ file riêng

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const categories = ['all', 'product', 'drink'];


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", getDataFromDB);
    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = () => {
    const productList = Items.filter(item => item.category === 'product');
    const drinkList = Items.filter(item => item.category === 'drink');
    setProducts(productList);
    setDrinks(drinkList);
  };
  const formatCurrency = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  };

  const ProductCard = ({ data }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Product", { productID: data.id })}
      style={styles.productCard}
    >
      <View style={styles.productImageContainer}>
        {data.isOff && data.offPercentage ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{data.offPercentage}%</Text>
          </View>
        ) : null}

        <Image
          source={data.productImage}
          style={styles.productImage}
          resizeMode="contain"
        />

      </View>

      <Text style={styles.productName}>{data.productName}</Text>

      {data.category === 'drink' && data.isAvailable && (
        <View style={styles.availabilityContainer}>
          <FontAwesome
            name="circle"
            style={[
              styles.availabilityIcon,
              { color: COLOURS.green }
            ]}
          />
          <Text style={[styles.availabilityText, { color: COLOURS.green }]}>
            Có sẵn
          </Text>
        </View>
      )}

      {data.category === 'product' && data.isAvailable && (
        <View style={styles.availabilityContainer}>
          <FontAwesome
            name="circle"
            style={[
              styles.availabilityIcon,
              { color: COLOURS.green }
            ]}
          />
          <Text style={[styles.availabilityText, { color: COLOURS.green }]}>
            Có sẵn
          </Text>
        </View>
      )}


      <Text style={styles.productPrice}>{formatCurrency(data.productPrice)}</Text>
    </TouchableOpacity>
  );

  const getFilteredData = (list) => {
    if (!Array.isArray(list)) return [];

    // Nếu không có filter nào được áp dụng
    if (filterCategory.toLowerCase() === 'all' && !searchQuery) {
      return list; // Trả về toàn bộ danh sách
    }

    return list.filter(item => {
      if (!item || typeof item !== 'object') return false;

      const searchMatch = !searchQuery ||
        (item.productName?.toLowerCase().includes(searchQuery.toLowerCase()));

      const categoryMatch =
        filterCategory.toLowerCase() === 'all' ||
        item.category?.toLowerCase() === filterCategory.toLowerCase();

      return searchMatch && categoryMatch;
    });
  };


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Entypo
              name="user"
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Order')}>
            <MaterialCommunityIcons
              name="cart"
              style={styles.cartIcon}
            />
          </TouchableOpacity>

        </View>


        <View style={styles.searchFilterRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#555" style={styles.searchIcon} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#888"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
          </View>

          <TouchableOpacity style={styles.filterIconBox}>
            <Ionicons name="options-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                filterCategory === cat && styles.categoryButtonActive
              ]}
              onPress={() => setFilterCategory(cat)}
            >
              <Text style={[
                styles.categoryText,
                filterCategory === cat && styles.categoryTextActive
              ]}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>





        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Sơn's Food & Drink Spot</Text>
          <Text style={styles.welcomeSubtitle}>
            Welcome to Sơn's Food Corner.{'\n'}
            Tasty food & drinks and Always fresh, never rushed.
          </Text>
        </View>

        {/* Products Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Products</Text>
              <Text style={styles.sectionCount}>41</Text>
            </View>
        
          </View>

          <View style={styles.productsGrid}>
            {getFilteredData(products).map(data => (
              <ProductCard data={data} key={data.id} />
            ))}
          </View>

        </View>

        {/* Drinks Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>BubbleZone</Text>
              <Text style={styles.sectionCount}>78</Text>
            </View>
       
          </View>

          <View style={styles.productsGrid}>
            {getFilteredData(drinks).map(data => (
              <ProductCard data={data} key={data.id} />
            ))}
          </View>


        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
