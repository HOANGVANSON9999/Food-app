import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'USERS_LIST';

// Lấy danh sách tất cả user
export const getUsers = async () => {
  try {
    const json = await AsyncStorage.getItem(USERS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Lỗi khi lấy user:', error);
    return [];
  }
};

// Lưu lại toàn bộ danh sách user
export const saveUsers = async (users) => {
  try {
    const json = JSON.stringify(users);
    await AsyncStorage.setItem(USERS_KEY, json);
  } catch (error) {
    console.error('Lỗi khi lưu user:', error);
  }
};

// Thêm 1 user mới
export const addUser = async (user) => {
  const currentUsers = await getUsers();
  currentUsers.push(user);
  await saveUsers(currentUsers);
};
