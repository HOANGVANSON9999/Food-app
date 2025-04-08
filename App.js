import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash_screen from "./src/screens/Splash_screen.js";
import Login_screen from "./src/screens/Login_screen.js"
import Register_screen from"./src/screens/Register_screen.js"
import Home_screen from"./src/screens/Home_screen.js"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash_screen} />
        <Stack.Screen name="Login" component={Login_screen} />
        <Stack.Screen name="Register" component={Register_screen}/>
        <Stack.Screen name="Home" component={Home_screen}/>

      </Stack.Navigator>

    </NavigationContainer>
  )
}

