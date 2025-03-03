import { View, Text, FlatList, TouchableOpacity, Modal, Alert, Pressable, TextInput, SafeAreaView } from 'react-native';
import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from 'react'

import ListData from '../components/listData';
import Header from '../components/header';

import AntDesign from '@expo/vector-icons/AntDesign';

const customers = [
    { id: '1', name: 'Gina Maryani', phone: '0811832614', transactions: 4, initials: 'GM', color: 'bg-purple-700' },
    { id: '2', name: 'Gina Alghifari', phone: '0813913253', transactions: 3, initials: 'GA', color: 'bg-pink-500' },
    { id: '3', name: 'Fahri Chen', phone: '0812637710', transactions: 1, initials: 'FC', color: 'bg-gray-500' },
    { id: '4', name: 'Gina Rodriguez', phone: '0812655652', transactions: 5, initials: 'GR', color: 'bg-green-500' },
    { id: '5', name: 'Ana Rodriguez', phone: '0811083630', transactions: 1, initials: 'AR', color: 'bg-yellow-500' },
    { id: '6', name: 'Satrio', phone: '0811083630', transactions: 1, initials: 'AR', color: 'bg-yellow-500' },
];

const validCustomers = [
    { key: "1", value: "Gina Maryani" },
    { key: "2", value: "Gina Alchiferi" },
];

const packages = [
    { key: "1", value: "Paket Reguler" },
    { key: "2", value: "Paket Express" },
];

const customer = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [customer, setCustomer] = useState("");
    const [packageType, SetPackageType] = useState("")
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    return (
        <SafeAreaView className='flex-1'>
            <View className='flex-1 bg-gray-100 p-4'>
                {/* Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View className='flex-1 bg-black/50 justify-end'>
                        {/* Modal Content */}
                        <View className='bg-white w-full h-[80%] rounded-t-3xl p-5'>
                            <Text className='text-lg font-semibold mb-2'>Tambah Transaksi Baru</Text>

                            <View className='mb-5'>
                                <Text className='text-gray-600'>Nama Pelanggan</Text>
                                <SelectList
                                    setSelected={setCustomer}
                                    data={validCustomers}
                                    placeholder='Pilih Pelanggan'
                                />
                            </View>

                            <View className='mb-5'>
                                <Text>Pilih Paket Laundry</Text>
                                <SelectList
                                    setSelected={SetPackageType}
                                    data={packages}
                                    placeholder='Pilih Paket'
                                />
                            </View>

                            <View className='mb-5'>
                                <Text>Kuantitas (Kg)</Text>
                                <TextInput
                                    className='border rounded-lg p-2 bg-white'
                                    placeholder='Masukkan berapa kilogram'
                                    keyboardType='numeric'
                                    value={quantity.toString()}
                                    onChangeText={(text) => setQuantity(parseInt(text))}
                                />
                            </View>

                            <View className='mb-5'>
                                <Text className='text-gray-600'>Total Biaya</Text>
                                <View className='border rounded-lg p-2 bg-gray-200 mb-4'>
                                    <Text>Rp {price}</Text>
                                </View>
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

                <ListData customers={customers} />

            </View>
        </SafeAreaView>
    )
}

export default customer