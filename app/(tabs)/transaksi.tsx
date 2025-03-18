import { View, Text, FlatList, TouchableOpacity, Modal, Alert, Pressable, TextInput, SafeAreaView } from 'react-native';
import { SelectList } from "react-native-dropdown-select-list";
import React, { useEffect, useState } from 'react'
import { axiosInstance, fetchTransaction, createTransaction, fetchCustomer, fetchProduk } from '@/lib/axios';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/header';

import AntDesign from '@expo/vector-icons/AntDesign';

const transaksi = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [price, setPrice] = useState(0);

    const { transactions, form } = useSelector((state: any) => state.transaction)
    const { customers } = useSelector((state: any) => state.customer)
    const { products } = useSelector((state: any) => state.product)

    const dispatch = useDispatch()

    const getTransactions = async () => {
        try {
            const transactionData = await fetchTransaction();
            dispatch({ type: "FETCH_TRANSACTIONS", payload: transactionData || [] });

            const customerData = await fetchCustomer();
            dispatch({ type: "FETCH_CUSTOMERS", payload: customerData || [] });

            const productData = await fetchProduk();
            dispatch({ type: "FETCH_PRODUCTS", payload: productData || [] });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getTransactions()
    }, [])

    // Fungsi untuk mendambahkan transaksi
    const handleCreateTransaction = async () => {
        const newTransaction = await createTransaction(form.customerId, form.billDetails[0].product.id, form.billDetails[0].qty)

        // console.log(newTransaction)

        if (newTransaction) {
            dispatch({
                type: "CREATE_TRANSACTION",
                payload: newTransaction
            })

            // Reset form setelah menambahkan transaksi
            dispatch({ type: "SET_FORM", field: "customerId", value: "" })
            dispatch({ type: "SET_FORM", field: "billDetails", value: [{ product: { id: "" }, qty: 0 }] })

            setModalVisible(false);

            Alert.alert("Sukses", "Transaksi berhasil ditambahkan")
        }
    }

    // Fungsi untuk mengubbah nilai form
    const handleChange = async (field: string, value: string) => {
        if (field === 'customerId') {
            dispatch({
                type: 'SET_FORM',
                payload: { customerId: value }
            });
        } else if (field === 'billDetails') {
            // Jika yang diubah adalah product.id
            dispatch({
                type: 'SET_FORM',
                payload: {
                    billDetails: [{ ...form.billDetails[0], product: { id: value } }]
                }
            });
        } else if (field === 'qty') {
            // Jika yang diubah adalah qty
            dispatch({
                type: 'SET_FORM',
                payload: {
                    billDetails: [{ ...form.billDetails[0], qty: Number(value) }]
                }
            });
        }
    }

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
                                    setSelected={(customerId: any) => handleChange('customerId', customerId)}
                                    data={customers?.map((customer: any) => ({ key: customer.id, value: customer.name }))}
                                    placeholder='Pilih Pelanggan'
                                />
                            </View>

                            <View className='mb-5'>
                                <Text>Pilih Paket Laundry</Text>
                                <SelectList
                                    setSelected={(productId: any) => handleChange('billDetails', productId)}
                                    data={products.map((product: any) => ({ key: product.id, value: product.name }))}
                                    placeholder='Pilih Paket'
                                />
                            </View>

                            <View className='mb-5'>
                                <Text>Kuantitas (Kg)</Text>
                                <TextInput
                                    className='border rounded-lg p-2 bg-white'
                                    placeholder='Masukkan berapa kilogram'
                                    keyboardType='numeric'
                                    value={form.billDetails?.[0]?.qty?.toString() || '0'}
                                    onChangeText={(text) => handleChange('qty', text)}
                                />
                            </View>

                            <View className='mb-5'>
                                <Text className='text-gray-600'>Total Biaya</Text>
                                <View className='border rounded-lg p-2 bg-gray-200 mb-4'>
                                    <Text>Rp {form.billDetails[0].qty * (products.find((p: any) => p.id === form.billDetails[0].product.id)?.price || 0)}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                className='bg-blue-500 p-3 rounded-lg'
                                onPress={handleCreateTransaction}>
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
                                <Text className='text-gray-500 text-xs'>{item.billDetails?.length} Transaksi</Text>
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