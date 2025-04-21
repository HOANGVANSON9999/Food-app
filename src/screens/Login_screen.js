// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { getAllUsers, saveLoggedInUser } from '../../components/database/dbLocal';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('❗️ Please enter both email and password');
    }

    // 1. Load users từ AsyncStorage
    const users = await getAllUsers();

    // 2. Tìm user
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      await saveLoggedInUser(user);

      // Hiển thị thông báo thành công
      Alert.alert(
        'Login Successful',
        'Welcome back!',
        [
          { text: 'OK', onPress: () => navigation.replace('Home') }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert('❌ Email or password is incorrect');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email/User */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={20} color="#aaa" style={styles.iconLeft} />
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="#aaa" style={styles.iconLeft} />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>

      {/* Sign In */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      {/* Go to Register */}
      <TouchableOpacity onPress={() => navigation.replace('Register')}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf3',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  iconLeft: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: '#000',
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#555',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
