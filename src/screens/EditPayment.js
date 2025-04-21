import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS } from "../../components/database/Data";
import { Picker } from '@react-native-picker/picker';

const EditPayment = ({ route, navigation }) => {
    // Get parameters with proper defaults
    const { currentInfo = { type: "Visa", number: "" }, onSave } = route.params || {};

    // Local state with proper initialization
    const [paymentData, setPaymentData] = useState({
        type: currentInfo?.type || "Visa",
        number: currentInfo?.number || ""
    });

    const handleSave = () => {
        if (onSave) {
            onSave(paymentData);
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Loại thẻ:</Text>
            <Picker
                selectedValue={paymentData.type}
                style={styles.picker}
                onValueChange={(itemValue) => setPaymentData({ ...paymentData, type: itemValue })}>

                <Picker.Item
                    label="Visa"
                    value="Visa"
                    icon={() => <MaterialCommunityIcons name="credit-card" size={20} color="#0066cc" />}
                />
                <Picker.Item
                    label="MasterCard"
                    value="MasterCard"
                    icon={() => <MaterialCommunityIcons name="credit-card-multiple" size={20} color="#0066cc" />}
                />
                <Picker.Item
                    label="PayPal"
                    value="PayPal"
                    icon={() => <MaterialCommunityIcons name="paypal" size={20} color="#0066cc" />}
                />
                <Picker.Item
                    label="MoMo"
                    value="MoMo"
                    icon={() => <MaterialCommunityIcons name="cellphone" size={20} color="#0066cc" />}
                />
            </Picker>

            <Text style={styles.label}>Số thẻ:</Text>
            <TextInput
                style={styles.input}
                value={paymentData.number}
                onChangeText={(text) => setPaymentData({ ...paymentData, number: text })}
                placeholder="Nhập số thẻ"
                keyboardType="numeric"
                maxLength={16}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Lưu thông tin</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#0066cc',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    paymentIconContainer: {
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 10,
        padding: 10,
        marginRight: 15,
    },
    paymentIcon: {
        width: 24,
        height: 24,
        tintColor: COLOURS.blue,
    },
});

export default EditPayment;
