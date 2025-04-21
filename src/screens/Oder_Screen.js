import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Image, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Items, COLOURS } from "../../components/database/Data";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const OderScreen = ({ navigation }) => {
    const [product, setProduct] = useState([]);
    const [total, setTotal] = useState(0);
    const [quantities, setQuantities] = useState({});

    // Thông tin giao hàng
    const [deliveryInfo, setDeliveryInfo] = useState({
        address: "Số 2 Đường Petre Melikishvili",
        city: "0162, Tbilisi"
    });

    // Thông tin thanh toán
    const [paymentInfo, setPaymentInfo] = useState({
        type: "Visa",
        number: "**** **** **** 1234"
    });



    // Chỉnh sửa thông tin giao hàng
    const handleEditDelivery = () => {
        navigation.navigate('EditDelivery', {
            currentInfo: deliveryInfo || {  // Add fallback if deliveryInfo is undefined
                address: "",
                city: ""
            },
            onSave: (updatedInfo) => {
                if (updatedInfo) {
                    setDeliveryInfo(updatedInfo);
                    AsyncStorage.setItem('deliveryInfo', JSON.stringify(updatedInfo));
                }
            }
        });
    };

    // Chỉnh sửa thông tin thanh toán
    const handleEditPayment = () => {
        try {
            // Chuẩn bị thông tin thanh toán hiện tại
            const currentPaymentInfo = paymentInfo || {
                type: "Visa",
                number: ""
            };

            navigation.navigate('EditPayment', {
                currentInfo: {
                    type: currentPaymentInfo.type || "Visa",
                    number: currentPaymentInfo.number || ""
                },
                onSave: (updatedInfo) => {
                    // Kiểm tra dữ liệu trước khi lưu
                    if (updatedInfo && updatedInfo.type && updatedInfo.number) {
                        const newPaymentInfo = {
                            type: updatedInfo.type,
                            number: updatedInfo.number.replace(/\D/g, '') // Xóa ký tự không phải số
                        };

                        setPaymentInfo(newPaymentInfo);

                        // Lưu vào bộ nhớ với xử lý lỗi
                        AsyncStorage.setItem('paymentInfo', JSON.stringify(newPaymentInfo))
                            .catch(e => console.error('Lỗi khi lưu thông tin thẻ', e));
                    }
                }
            });
        } catch (error) {
            console.error('Lỗi khi mở màn hình thanh toán', error);
            Alert.alert('Lỗi', 'Không thể mở màn hình chỉnh sửa');
        }
    };
    const formatCurrency = (number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(number);
    };

    // Hàm kiểm tra thông tin thẻ hợp lệ
    const validateCardInfo = (cardInfo) => {
        if (!cardInfo) return false;
        if (!cardInfo.type || typeof cardInfo.type !== 'string') return false;
        if (!cardInfo.number || cardInfo.number.replace(/\D/g, '').length < 12) return false;
        return true;
    };
    // Hiển thị số thẻ dạng **** **** **** 1234
    const formatCardNumber = (number) => {
        if (!number) return "•••• •••• •••• ••••";
        const cleaned = number.replace(/\D/g, ''); // Loại bỏ tất cả ký tự không phải số
        const last4 = cleaned.slice(-4); // Lấy 4 chữ số cuối
        return `•••• •••• •••• ${last4}`; // Sử dụng template literal với ${last4}
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getDataFromDB();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const loadSavedPayment = async () => {
            try {
                const savedData = await AsyncStorage.getItem('paymentInfo');
                if (savedData) {
                    const parsedData = JSON.parse(savedData);

                    // Kiểm tra tính hợp lệ của dữ liệu
                    if (parsedData && parsedData.type) {
                        setPaymentInfo({
                            type: parsedData.type,
                            number: parsedData.number || ""
                        });
                    }
                }
            } catch (error) {
                console.error('Lỗi khi tải thông tin thanh toán', error);
            }
        };

        loadSavedPayment();
    }, []);

    const getPaymentIcon = (paymentType) => {
        if (!paymentType) return 'credit-card-outline';

        const type = paymentType.toLowerCase();
        const iconMap = {
            'visa': 'credit-card',
            'mastercard': 'credit-card-multiple',
            'amex': 'credit-card',
            'discover': 'credit-card',
            'jcb': 'credit-card',
            'diners': 'credit-card',
            'paypal': 'paypal',
            'momo': 'cellphone',
            'zalopay': 'wallet',
            'vnpay': 'wallet',
        };

        return iconMap[type] || 'credit-card-outline';
    };

    // Lấy dữ liệu từ database
    const getDataFromDB = async () => {
        let items = await AsyncStorage.getItem('cartItems');
        let savedQuantities = await AsyncStorage.getItem('quantities');

        items = items ? JSON.parse(items) : [];
        savedQuantities = savedQuantities ? JSON.parse(savedQuantities) : {};

        let productData = [];
        let quantityData = { ...savedQuantities };

        if (items.length > 0) {
            Items.forEach(data => {
                if (items.includes(data.id)) {
                    productData.push(data);
                    if (!quantityData[data.id]) quantityData[data.id] = 1;
                }
            });
            setProduct(productData);
            setQuantities(quantityData);
            getTotal(productData);
        } else {
            setProduct([]);
            setTotal(0);
        }
    };

    // Cập nhật số lượng sản phẩm
    const updateQuantity = async (id, change) => {
        const newQuantities = { ...quantities };
        newQuantities[id] = (newQuantities[id] || 1) + change;

        if (newQuantities[id] < 1) {
            newQuantities[id] = 1;
        }

        setQuantities(newQuantities);
        await AsyncStorage.setItem('quantities', JSON.stringify(newQuantities));
        getTotal(product);
    };

    // Tính tổng tiền
    const getTotal = (productData) => {
        if (!productData || productData.length === 0) {
            setTotal(0);
            return;
        }

        let total = 0;
        for (let i = 0; i < productData.length; i++) {
            const item = productData[i];
            const quantity = quantities[item.id] || 1;
            total += item.productPrice * quantity;
        }

        setTotal(total);
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const removeItemFromCart = async (id) => {
        let itemArray = await AsyncStorage.getItem('cartItems');
        let quantities = await AsyncStorage.getItem('quantities');

        itemArray = itemArray ? JSON.parse(itemArray) : [];
        quantities = quantities ? JSON.parse(quantities) : {};

        if (itemArray.includes(id)) {
            itemArray = itemArray.filter(item => item !== id);
            delete quantities[id];

            await AsyncStorage.setItem('cartItems', JSON.stringify(itemArray));
            await AsyncStorage.setItem('quantities', JSON.stringify(quantities));
            getDataFromDB();
        }
    };

    // Thanh toán
    const checkOut = async () => {
        try {
            await AsyncStorage.removeItem('cartItems');
            await AsyncStorage.removeItem('quantities');
            ToastAndroid.show('Sản phẩm sẽ được giao sớm!', ToastAndroid.SHORT);
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
            ToastAndroid.show('Thanh toán thất bại!', ToastAndroid.SHORT);
        }
    };

    // Hiển thị sản phẩm
    const renderProducts = (data, index) => {
        return (
            <TouchableOpacity
                key={data.id}
                onPress={() => navigation.navigate('Product', { productID: data.id })}
                style={{
                    width: '100%',
                    height: 100,
                    marginVertical: 6,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        width: '30%',
                        height: 100,
                        padding: 14,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLOURS.backgroundLight,
                        borderRadius: 10,
                        marginRight: 22,
                    }}
                >
                    <Image
                        source={data.productImage}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        height: '100%',
                        justifyContent: 'space-around',
                    }}
                >
                    <View style={{}}>
                        <Text
                            style={{
                                fontSize: 14,
                                maxWidth: '100%',
                                color: COLOURS.black,
                                fontWeight: '600',
                                letterSpacing: 1,
                            }}
                        >
                            {data.productName}
                        </Text>
                        <View
                            style={{
                                marginTop: 4,
                                flexDirection: 'row',
                                alignItems: 'center',
                                opacity: 0.6,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '400',
                                    maxWidth: '85%',
                                    marginRight: 4,
                                }}
                            >
                                {formatCurrency(data.productPrice)}
                            </Text>
                            <Text>

                                (~{formatCurrency(data.productPrice * (quantities[data.id] || 1))})
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    borderRadius: 100,
                                    marginRight: 20,
                                    padding: 4,
                                    borderWidth: 1,
                                    borderColor: COLOURS.backgroundMedium,
                                    opacity: 0.5,
                                }}
                            >
                                <TouchableOpacity onPress={() => updateQuantity(data.id, -1)}>
                                    <MaterialCommunityIcons
                                        name="minus"
                                        style={{
                                            fontSize: 16,
                                            color: COLOURS.backgroundDark,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text>{quantities[data.id] || 1}</Text>
                            <View
                                style={{
                                    borderRadius: 100,
                                    marginLeft: 20,
                                    padding: 4,
                                    borderWidth: 1,
                                    borderColor: COLOURS.backgroundMedium,
                                    opacity: 0.5,
                                }}
                            >
                                <TouchableOpacity onPress={() => updateQuantity(data.id, 1)}>
                                    <MaterialCommunityIcons
                                        name="plus"
                                        style={{
                                            fontSize: 16,
                                            color: COLOURS.backgroundDark,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
                            <MaterialCommunityIcons
                                name="delete-outline"
                                style={{
                                    fontSize: 16,
                                    color: COLOURS.backgroundDark,
                                    backgroundColor: COLOURS.backgroundLight,
                                    padding: 8,
                                    borderRadius: 100,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: COLOURS.white,
                position: 'relative',
            }}
        >
            <ScrollView>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        paddingTop: 16,
                        paddingHorizontal: 16,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="chevron-left"
                            style={{
                                fontSize: 18,
                                color: COLOURS.backgroundDark,
                                padding: 12,
                                backgroundColor: COLOURS.backgroundLight,
                                borderRadius: 12,
                            }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 14,
                            color: COLOURS.black,
                            fontWeight: '400',
                        }}
                    >
                        Chi tiết đơn hàng
                    </Text>
                    <View></View>
                </View>
                <Text
                    style={{
                        fontSize: 20,
                        color: COLOURS.black,
                        fontWeight: '500',
                        letterSpacing: 1,
                        paddingTop: 20,
                        paddingLeft: 16,
                        marginBottom: 10,
                    }}
                >
                    Giỏ hàng của tôi
                </Text>
                <View style={{ paddingHorizontal: 16 }}>
                    {product.length > 0 ? (
                        product.map((item, index) => renderProducts(item, index))
                    ) : (
                        <Text style={{
                            textAlign: 'center',
                            marginTop: 20,
                            color: COLOURS.black,
                            opacity: 0.5,
                        }}>
                            Giỏ hàng của bạn đang trống
                        </Text>
                    )}
                </View>
                <View>
                    {/* Địa chỉ giao hàng Section */}
                    <View style={{ paddingHorizontal: 16, marginVertical: 10 }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLOURS.black,
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginBottom: 20,
                        }}>
                            Địa chỉ giao hàng
                        </Text>

                        <TouchableOpacity onPress={handleEditDelivery}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center' }}>
                                    <View style={{
                                        color: COLOURS.blue,
                                        backgroundColor: COLOURS.backgroundLight,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 12,
                                        borderRadius: 10,
                                        marginRight: 18,
                                    }}>
                                        <MaterialCommunityIcons
                                            name="truck-delivery-outline"
                                            style={{ fontSize: 18, color: COLOURS.blue }}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{
                                            fontSize: 14,
                                            color: COLOURS.black,
                                            fontWeight: '500',
                                        }}>
                                            {deliveryInfo?.address || "Chưa có địa chỉ"}
                                        </Text>
                                        <Text style={{
                                            fontSize: 12,
                                            color: COLOURS.black,
                                            fontWeight: '400',
                                            lineHeight: 20,
                                            opacity: 0.5,
                                        }}>
                                            {deliveryInfo?.city || "Chưa có thành phố"}
                                        </Text>
                                    </View>
                                </View>
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    style={{ fontSize: 22, color: COLOURS.black }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* Phương thức thanh toán Section */}
                    <View style={{ paddingHorizontal: 16, marginVertical: 10 }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLOURS.black,
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginBottom: 20,
                        }}>
                            Phương thức thanh toán
                        </Text>
                        <TouchableOpacity onPress={handleEditPayment}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center' }}>
                                    {/* Phần icon phương thức thanh toán */}
                                    <View style={{
                                        backgroundColor: COLOURS.backgroundLight,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 12,
                                        borderRadius: 10,
                                        marginRight: 18,
                                    }}>
                                        <MaterialCommunityIcons
                                            name={getPaymentIcon(paymentInfo?.type)}
                                            size={24}
                                            color={COLOURS.blue}
                                            onError={(e) => {
                                                console.log('Icon error:', e.nativeEvent.error);
                                                // Fallback to default icon if needed
                                                console.log('Payment type:', paymentInfo?.type);
                                                console.log('Resolved icon:', getPaymentIcon(paymentInfo?.type));
                                            }}
                                        />
                                    </View>

                                    <View>
                                        <Text style={{
                                            fontSize: 14,
                                            color: COLOURS.black,
                                            fontWeight: '500',
                                        }}>
                                            {paymentInfo?.type || "Chưa chọn phương thức"}
                                        </Text>
                                        <Text style={{
                                            fontSize: 12,
                                            color: COLOURS.black,
                                            fontWeight: '400',
                                            lineHeight: 20,
                                            opacity: 0.5,
                                        }}>
                                            {paymentInfo?.number ? `•••• •••• •••• ${paymentInfo.number.slice(-4)}` : "•••• •••• •••• ••••"}
                                        </Text>
                                    </View>
                                </View>
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    style={{ fontSize: 22, color: COLOURS.black }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 16,
                            marginTop: 40,
                            marginBottom: 80,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                color: COLOURS.black,
                                fontWeight: '500',
                                letterSpacing: 1,
                                marginBottom: 20,
                            }}
                        >
                            Thông tin đơn hàng
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 8,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '400',
                                    maxWidth: '80%',
                                    color: COLOURS.black,
                                    opacity: 0.5,
                                }}
                            >
                                Tạm tính
                            </Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '400',
                                    color: COLOURS.black,
                                    opacity: 0.8,
                                }}
                            >
                                ${total}.00
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 22,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '400',
                                    maxWidth: '80%',
                                    color: COLOURS.black,
                                    opacity: 0.5,
                                }}
                            >
                                Phí vận chuyển
                            </Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '400',
                                    color: COLOURS.black,
                                    opacity: 0.8,
                                }}
                            >
                                {formatCurrency(total / 2)}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '400',
                                    maxWidth: '80%',
                                    color: COLOURS.black,
                                    opacity: 0.5,
                                }}
                            >
                                Tổng cộng
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '500',
                                    color: COLOURS.black,
                                }}
                            >
                                {formatCurrency(total + total / 2)}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {product.length > 0 && (
                <View
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        height: '8%',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={checkOut}
                        style={{
                            width: '86%',
                            height: '90%',
                            backgroundColor: COLOURS.blue,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '500',
                                letterSpacing: 1,
                                color: COLOURS.white,
                                textTransform: 'uppercase',
                            }}
                        >
                            THANH TOÁN ({formatCurrency(total + total / 2)})
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default OderScreen;
