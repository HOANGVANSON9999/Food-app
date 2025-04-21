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
    productName: 'Cơm Gà Nướng Sốt ',
    productPrice: 75,
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
    productName: 'Phở Bò Truyền Thống',
    productPrice: 60,
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
    productName: 'Cà Phê Sữa',
    productPrice: 25,
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
    productName: 'Trà Chanh Dây',
    productPrice: 30,
    description:
      'Trà chanh dây thơm mát, kèm topping thạch trái cây.',
    isOff: true,
    productImage: require('../database/images/foods/passion_tea.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/foods/passion_tea.png'),
      require('../database/images/foods/passion_tea1.png'),
      require('../database/images/foods/passion_tea2.png'),
    ],
  },

  {
    id: 5,
    category: 'drink',
    productName: 'Trà Sữa Vị Đào',
    productPrice: 32,
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
    productName: 'Trà Sữa Matcha',
    productPrice: 35,
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
  {
    id: 7,
    category: 'product',
    productName: 'Cheese pizza',
    productPrice: 35,
    description:
      'Cheese pizza thơm béo, phù hợp với tín đồ yêu thích đồ ăn nhanh.',
    isOff: false,
    productImage: require('../database/images/foods/pizza1.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/foods/pizza1.png'),
      require('../database/images/foods/pizza2.png'),
    ],
  },

  {
    id: 8,
    category: 'product',
    productName: 'Bún Bò Huế',
    productPrice: 35,
    description:
      'Bún Bò Huế đặc trưng với nước dùng đậm đà từ xương bò, sả, ớt và mắm ruốc. Ăn kèm thịt bò, giò heo, chả và rau sống..',
    isOff: false,
    productImage: require('../database/images/foods/bunbo1.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/foods/bunbo1.png'),
      require('../database/images/foods/bunbo2.png'),

    ],
  },


];
