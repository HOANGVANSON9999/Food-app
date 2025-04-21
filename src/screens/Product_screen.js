import React, { useState, useEffect } from "react";
import {
    View, Text, StatusBar, ScrollView, TouchableOpacity,
    FlatList, Dimensions, Image, Animated, ToastAndroid, ActivityIndicator
} from "react-native";
import { COLOURS, Items } from "../../components/database/Data.js";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Product_screen = ({ route, navigation }) => {
    const productID = route?.params?.productID;
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cartCount, setCartCount] = useState(0);

    const width = Dimensions.get("window").width;
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getDataFromDB();
            getCartCount();
        });
        return unsubscribe;
    }, [navigation]);

    const getDataFromDB = async () => {
        setIsLoading(true);
        setTimeout(() => {
            const found = Items.find((item) => item.id == productID);
            setProduct(found);
            setIsLoading(false);
        }, 1000);
    };

    const getCartCount = async () => {
        const cartItems = await AsyncStorage.getItem("cartItems");
        if (cartItems) {
            const items = JSON.parse(cartItems);
            setCartCount(items.length);
        } else {
            setCartCount(0);
        }
    };

    const addToCart = async (id) => {
        try {
            let cartItems = await AsyncStorage.getItem("cartItems");
            let quantities = await AsyncStorage.getItem("quantities");

            cartItems = cartItems ? JSON.parse(cartItems) : [];
            quantities = quantities ? JSON.parse(quantities) : {};

            if (cartItems.includes(id)) {
                quantities[id] = (quantities[id] || 1) + 1;
            } else {
                cartItems.push(id);
                quantities[id] = 1;
            }

            await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
            await AsyncStorage.setItem("quantities", JSON.stringify(quantities));

            ToastAndroid.show("Đã thêm vào giỏ hàng", ToastAndroid.SHORT);
            getCartCount();

        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ:", error);
            ToastAndroid.show("Lỗi khi thêm vào giỏ hàng", ToastAndroid.SHORT);
        }
    };

    const renderProduct = ({ item }) => (
        <View
            style={{
                width: width,
                height: 240,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Image source={item} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
        </View>
    );

    const formatCurrency = (number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(number);
    };


    return (
        <View style={{ flex: 1, backgroundColor: COLOURS.white }}>
            <StatusBar backgroundColor={COLOURS.backgroundLight} barStyle={"dark-content"} />

            {isLoading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color={COLOURS.blue} />
                    <Text style={{ marginTop: 12 }}>Đang tải sản phẩm...</Text>
                </View>
            ) : (
                <>
                    <ScrollView>
                        {/* HEADER */}
                        <View
                            style={{
                                backgroundColor: COLOURS.backgroundLight,
                                borderBottomRightRadius: 20,
                                borderBottomLeftRadius: 20,
                                alignItems: "center",
                                paddingBottom: 16,
                            }}
                        >
                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    padding: 16,
                                }}
                            >
                                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                                    <Entypo
                                        name="chevron-left"
                                        size={20}
                                        color={COLOURS.backgroundDark}
                                        style={{
                                            padding: 12,
                                            backgroundColor: COLOURS.white,
                                            borderRadius: 10,
                                        }}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => navigation.navigate("Order")}>
                                    <View>
                                        <Ionicons
                                            name="cart-outline"
                                            size={24}
                                            color={COLOURS.backgroundDark}
                                            style={{
                                                padding: 12,
                                                backgroundColor: COLOURS.white,
                                                borderRadius: 10,
                                            }}
                                        />
                                        {cartCount > 0 && (
                                            <View
                                                style={{
                                                    position: "absolute",
                                                    top: 5,
                                                    right: 5,
                                                    backgroundColor: "red",
                                                    borderRadius: 10,
                                                    paddingHorizontal: 5,
                                                    paddingVertical: 1,
                                                }}
                                            >
                                                <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
                                                    {cartCount}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                data={product.productImageList}
                                horizontal
                                renderItem={renderProduct}
                                showsHorizontalScrollIndicator={false}
                                decelerationRate={0.8}
                                snapToInterval={width}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                    { useNativeDriver: false }
                                )}
                            />

                            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>
                                {product.productImageList?.map((_, index) => {
                                    const opacity = position.interpolate({
                                        inputRange: [index - 1, index, index + 1],
                                        outputRange: [0.3, 1, 0.3],
                                        extrapolate: "clamp",
                                    });
                                    return (
                                        <Animated.View
                                            key={index}
                                            style={{
                                                height: 4,
                                                width: 30,
                                                backgroundColor: COLOURS.black,
                                                marginHorizontal: 4,
                                                opacity,
                                                borderRadius: 100,
                                            }}
                                        />
                                    );
                                })}
                            </View>
                        </View>

                        {/* INFO */}
                        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
                            <Text style={{ fontSize: 22, fontWeight: "bold", color: COLOURS.black }}>
                                {product.productName}
                            </Text>

                            {/* Đánh giá */}
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                <Ionicons name="star" size={18} color="gold" />
                                <Text style={{ marginLeft: 4, fontSize: 14, color: COLOURS.black }}>
                                    4.8 / 5.0 (200 đánh giá)
                                </Text>
                            </View>

                            <Text
                                style={{
                                    fontSize: 13,
                                    color: COLOURS.black,
                                    opacity: 0.7,
                                    marginTop: 12,
                                    lineHeight: 20,
                                }}
                            >
                                {product.description}
                            </Text>

                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", color: COLOURS.black }}>
                                    Giá gốc: {formatCurrency(product.productPrice)}
                                </Text>
                                <Text style={{ fontSize: 14, color: COLOURS.backgroundDark, marginTop: 4 }}>
                                    Khuyến mãi: {formatCurrency(product.productPrice * 0.5)}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Nút thêm vào giỏ */}
                    <View style={{ position: "absolute", bottom: 10, width: "100%", alignItems: "center" }}>
                        <TouchableOpacity
                            onPress={() => product.isAvailable && addToCart(product.id)}
                            style={{
                                width: "86%",
                                height: 50,
                                backgroundColor: COLOURS.blue,
                                borderRadius: 20,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: COLOURS.white }}>
                                {product.isAvailable ? "Thêm vào giỏ hàng" : "Không có sẵn"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

export default Product_screen;
