// dbLocal.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'USERS_LIST';
const LOGGED_IN_USER = 'LOGGED_IN_USER';

export const getAllUsers = async () => {
  try {
    const json = await AsyncStorage.getItem(USERS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Lỗi lấy danh sách user:', error);
    return [];
  }
};
export const addUser = async (newUser) => {
  try {
    const users = await getAllUsers();
    users.push(newUser);
    await saveAllUsers(users);
  } catch (error) {
    console.error('Lỗi thêm user:', error);
  }
};
export const saveAllUsers = async (users) => {
  try {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Lỗi lưu danh sách user:', error);
  }
};

export const saveLoggedInUser = async (user) => {
  try {
    await AsyncStorage.setItem(LOGGED_IN_USER, JSON.stringify(user));
  } catch (error) {
    console.error('Lỗi lưu user đăng nhập:', error);
  }
};

export const getLoggedInUser = async () => {
  try {
    const json = await AsyncStorage.getItem(LOGGED_IN_USER);
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error('Lỗi khi lấy user đăng nhập:', error);
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem(LOGGED_IN_USER);
  } catch (error) {
    console.error('Lỗi khi đăng xuất:', error);
  }
};
