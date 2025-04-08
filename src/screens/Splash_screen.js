import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // opacity bắt đầu từ 0

  useEffect(() => {
    // Animation: logo mờ dần hiện ra
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // 1 giây fade in
      useNativeDriver: true,
    }).start();

    // Chuyển màn sau 2 giây
    const timeout = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../images/food-logo.png')}
        style={[styles.logo, { opacity: fadeAnim }]}
      />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        FOOD APP
      </Animated.Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#ff6347',
    fontWeight: 'bold'

  },
  tagline: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default SplashScreen;
