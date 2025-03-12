import { View, Text, FlatList, TouchableOpacity, Modal, Alert, Pressable, TextInput, SafeAreaView } from 'react-native';
import { SelectList } from "react-native-dropdown-select-list";
import React, { useEffect, useState } from 'react'
import { axiosInstance, fetchTransaction } from '@/lib/axios';
import { Transaction } from '@/types/transactionType';
import ListData from '../components/listData';
import Header from '../components/header';

import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const transaksi = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [modalVisible, setModalVisible] = useState(false);
    const [customer, setCustomer] = useState("");
    const [packageType, SetPackageType] = useState("")
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const getTransactions = async () => {
            const data = await fetchTransaction()
            setTransactions(data)
        }

        getTransactions()
    })

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
                    title='Transaksi'
                    setModalVisible={setModalVisible}
                    icon={<AntDesign name="pluscircle" size={45} color="blue" />}
                />

                {/* <ListData customers={customers} /> */}

                <FlatList
                    data={transactions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View className='bg-white p-4 mb-3 rounded-xl shadow flex-row items-center'>
                            <View className={`w-12 h-12 rounded-full flex items-center bg-green-500 justify-center mr-3`}>
                                <Text>{item.customer.name.slice(0, 2).toUpperCase()}</Text>
                            </View>

                            <View className='flex-1'>
                                <Text className='font-semibold text-gray-900'>{item.customer.name}</Text>
                                <Text className='text-gray-600 text-sm'>{item.customer.phoneNumber}</Text>
                                <Text className='text-gray-500 text-xs'>{item.billDetails.length} Transaksi</Text>
                            </View>

                            <TouchableOpacity className='bg-blue-600 px-4 py-2 rounded-lg'>
                                <Text className='text-white text-sm font-semibold'>Lihat Transaksi</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

            </View>
        </SafeAreaView>
    )
}

export default transaksi