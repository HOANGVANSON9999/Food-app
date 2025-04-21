import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash_screen from "./src/screens/Splash_screen.js";
import LoginScreen from "./src/screens/Login_screen.js"
import RegisterScreen from "./src/screens/RegisterScreen.js"
import HomeScreen from "./src/screens/HomeScreen.js"
import Product_screen from "./src/screens/Product_screen.js";
import OderScreen from "./src/screens/Oder_Screen.js";
import EditDelivery from './src/screens/EditDelivery.js';
import EditPayment from './src/screens/EditPayment.js';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash_screen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Product" component={Product_screen} />
        <Stack.Screen name="Order" component={OderScreen} />
        <Stack.Screen
          name="EditDelivery"
          component={EditDelivery}
          options={{ title: 'Chỉnh sửa địa chỉ' }}
        />
        <Stack.Screen
          name="EditPayment"
          component={EditPayment}
          options={{ title: 'Chỉnh sửa thanh toán' }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  )
}

