import { View, Text, FlatList, TouchableOpacity, Modal, Alert, Pressable, TextInput, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../lib/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/header';
import AntDesign from '@expo/vector-icons/AntDesign';

interface Customer {
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

const customer = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([])
    const [addCustomer, setAddCustomer] = useState<string>('');
    const [addPhoneNumber, setAddPhoneNumber] = useState<string>('');
    const [addAddress, setAddAddress] = useState<string>('');

    const fetchCustomer = async () => {

        const token = await AsyncStorage.getItem('token');

        if (!token) {
            console.error("Token tidak ditemukan");
            return;
        }

        try {
            const response = await axiosInstance.get('/customers', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setCustomers(response.data.data);
        } catch (error: any) {
            console.log(error)
        }
    };



    useEffect(() => {
        fetchCustomer();
    }, []);


    return (
        <SafeAreaView className='flex-1'>
            <View className='flex-1 bg-gray-100 p-4'>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View className='flex-1 bg-black/50 justify-end'>
                        <View className='bg-white w-full h-[80%] rounded-t-3xl p-5'>
                            <Text className='text-lg font-semibold mb-2'>Tambah Customer Baru</Text>

                            <View className='mb-5'>
                                <Text>Nama Customer</Text>
                                <TextInput
                                    className='border rounded-lg p-2 bg-white'
                                    placeholder='Masukkan Nama Customer'
                                    keyboardType='default'
                                    value={addCustomer}
                                    onChangeText={(text) => setAddCustomer(text)}
                                />
                            </View>

                            <View className='mb-5'>
                                <Text>Phone Number</Text>
                                <TextInput
                                    className='border rounded-lg p-2 bg-white'
                                    placeholder='Masukkan Nomor HP Customer'
                                    keyboardType='default'
                                    value={addPhoneNumber}
                                    onChangeText={(text) => setAddPhoneNumber(text)}
                                />
                            </View>

                            <View className='mb-5'>
                                <Text>Address</Text>
                                <TextInput
                                    className='border rounded-lg p-2 bg-white'
                                    placeholder='Masukkan Alamat Customer'
                                    keyboardType='default'
                                    value={addAddress}
                                    onChangeText={(text) => setAddAddress(text)}
                                />
                            </View>

                            <TouchableOpacity className='bg-blue-500 p-3 rounded-lg'>
                                <Text className='text-white text-center font-semibold'>SUBMIT</Text>
                            </TouchableOpacity>

                            <Pressable
                                className='absolute top-5 right-5'
                                onPress={() => setModalVisible(!modalVisible)}>
                                <AntDesign name="closecircleo" size={24} color="black" />
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                <Header
                    title='Customer'
                    type='Customer'
                    setModalVisible={setModalVisible}
                    icon={<AntDesign name="pluscircle" size={45} color="blue" />}
                />

                <FlatList
                    data={customers}
                    renderItem={({ item }) => (
                        <View className='bg-white p-4 mb-3 rounded-xl shadow flex-row items-center'>
                            <View className={`w-12 h-12 rounded-full flex items-center bg-green-300 justify-center mr-3`}>
                                <Text>SU</Text>
                            </View>

                            <View className='flex-1'>
                                <Text className='font-semibold text-gray-900'>{item.name}</Text>
                                <Text className='text-gray-600 text-sm'>{item.phoneNumber}</Text>
                                <Text className='text-gray-500 text-xs'>{item.address}</Text>
                            </View>

                            <TouchableOpacity className='bg-blue-600 px-4 py-2 rounded-lg'>
                                <Text className='text-white text-sm font-semibold'>Lihat Customer</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

            </View>
        </SafeAreaView>
    )
}

export default customer