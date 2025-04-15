export const COLOURS = {
  white: '#ffffff',
  black: '#000000',
  green: '#00AC76',
  red: '#C04345',
  blue: '#0043F9',
  backgroundLight: '#F0F0F3',
  backgroundMedium: '#B9B9B9',
  backgroundDark: '#777777',
};
export const Items = [
  {
    id: 1,
    category: 'product',
    productName: 'Grilled Chicken Rice',
    productPrice: 75000,
    description:
      'Cơm gà nướng thơm lừng ăn kèm nước mắm chua ngọt và rau sống. Phù hợp cho bữa trưa hoặc tối.',
    isOff: true,
    offPercentage: 10,
    productImage: require('../database/images/foods/chicken_rice.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/foods/chicken_rice.png'),
      require('../database/images/foods/chicken_rice2.png'),
      require('../database/images/foods/chicken_rice3.png'),
      require('../database/images/foods/chicken_rice4.png'),
    ],
  },
  {
    id: 2,
    category: 'product',
    productName: 'Beef Noodle Soup',
    productPrice: 60000,
    description:
      'Phở bò với nước dùng đậm đà, thịt bò mềm, bánh phở dai, kèm rau thơm.',
    isOff: false,
    productImage: require('../database/images/foods/beef_noodle.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/foods/beef_noodle.png'),
      require('../database/images/foods/beef_noodle2.png'),
      require('../database/images/foods/beef_noodle3.png'),
      require('../database/images/foods/beef_noodle4.png'),
    ],
  },
  {
    id: 3,
    category: 'drink',
    productName: 'Iced Milk Coffee',
    productPrice: 25000,
    description:
      'Cà phê sữa đá truyền thống Việt Nam, đậm đà và tỉnh táo cả ngày.',
    isOff: true,
    offPercentage: 15,
    productImage: require('../database/images/foods/iced_milk_coffee.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/foods/iced_milk_coffee.png'),
      require('../database/images/foods/iced_milk_coffee1.png'),
      require('../database/images/foods/iced_milk_coffee2.png'),
    ],
  },
  {
    id: 4,
    category: 'drink',
    productName: 'Passion Fruit Tea',
    productPrice: 30000,
    description:
      'Trà chanh dây thơm mát, kèm topping thạch trái cây.',
    isOff: false,
    productImage: require('../database/images/foods/passion_tea.png'),
    isAvailable: false,
    productImageList: [
      require('../database/images/foods/passion_tea.png'),
      require('../database/images/foods/passion_tea1.png'),
      require('../database/images/foods/passion_tea2.png'),
    ],
  },

  {
    id: 5,
    category: 'drink',
    productName: 'Peach Milk Tea',
    productPrice: 32000,
    description:
      'Trà sữa vị đào thơm ngọt, kèm trân châu đen dẻo ngon.',
    isOff: false,
    productImage: require('../database/images/foods/peach_milk_tea.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/foods/peach_milk_tea.png'),
      require('../database/images/foods/peach_milk_tea1.png'),
      require('../database/images/foods/peach_milk_tea2.png'),
    ],
  },
  {
    id: 6,
    category: 'drink',
    productName: 'Matcha Latte',
    productPrice: 35000,
    description:
      'Matcha latte thơm béo, phù hợp cho người yêu trà xanh.',
    isOff: false,
    productImage: require('../database/images/foods/matcha_latte.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/foods/matcha_latte.png'),
      require('../database/images/foods/matcha_latte1.png'),
      require('../database/images/foods/matcha_latte2.png')
    ],
  },
  
];
