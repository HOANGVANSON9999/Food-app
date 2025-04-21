import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { addUser, getAllUsers } from '../../components/database/dbLocal'; // ✅
import { saveLoggedInUser } from '../../components/database/dbLocal';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!name.trim()) return Alert.alert('❌ Please enter your full name');
    if (!/^0\d{9,10}$/.test(phone)) return Alert.alert('❌ Phone must start with 0 and be 10-11 digits');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Alert.alert('❌ Invalid email address');
    if (password.length < 6) return Alert.alert('❌ Password must be at least 6 characters');

    const users = await getAllUsers(); // ✅ dùng getAllUsers
    const exists = users.some(u => u.email.toLowerCase() === email.trim().toLowerCase());

    if (exists) return Alert.alert('❌ Email is already registered');

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      phone,
      email: email.trim(),
      password,
    };

    await addUser(newUser); // ✅ dùng addUser của dbLocal
    Alert.alert('✅ Đăng ký thành công!', 'Bạn có thể đăng nhập ngay.', [
      { text: 'OK', onPress: () => navigation.replace('Login') }
    ]);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>

      {/* Full Name */}
      <View style={styles.inputContainer}>
        <Feather name="user" size={20} color="#aaa" style={styles.iconLeft} />
        <TextInput
          style={styles.inputField}
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email */}
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

      {/* Phone */}
      <View style={styles.inputContainer}>
        <Feather name="phone" size={20} color="#aaa" style={styles.iconLeft} />
        <TextInput
          style={styles.inputField}
          placeholder="Phone"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
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
        <TouchableOpacity onPress={() => setShowPassword(v => !v)}>
          <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="#aaa" />
        </TouchableOpacity>
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Navigate to Login */}
      <TouchableOpacity onPress={() => navigation.replace('Login')}>
        <Text style={styles.linkText}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fffaf3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
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
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: '#000',
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 12,
    fontSize: 15,
    color: '#333',
  },
});

export default RegisterScreen;
