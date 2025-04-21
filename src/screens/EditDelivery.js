import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const EditDelivery = ({ route, navigation }) => {
    // Get parameters with proper defaults
    const { currentInfo = { address: "", city: "" }, onSave } = route.params || {};
    
    // Local state with proper initialization
    const [deliveryData, setDeliveryData] = useState({
        address: currentInfo?.address || "",
        city: currentInfo?.city || ""
    });

    const handleSave = () => {
        if (onSave) {
            onSave(deliveryData);
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Địa chỉ:</Text>
            <TextInput
                style={styles.input}
                value={deliveryData.address}
                onChangeText={(text) => setDeliveryData({...deliveryData, address: text})}
                placeholder="Nhập địa chỉ"
            />
            
            <Text style={styles.label}>Thành phố:</Text>
            <TextInput
                style={styles.input}
                value={deliveryData.city}
                onChangeText={(text) => setDeliveryData({...deliveryData, city: text})}
                placeholder="Nhập thành phố"
            />
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
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
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditDelivery;
