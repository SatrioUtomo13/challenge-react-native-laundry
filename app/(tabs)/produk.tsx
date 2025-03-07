import { View, Text, FlatList, TouchableOpacity, Modal, Alert, Pressable, TextInput, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { axiosInstance } from '@/lib/axios'
import Header from '../components/header';

import AntDesign from '@expo/vector-icons/AntDesign';

interface Product {
    id: string,
    name: string,
    price: number,
    type: string,
    createdAt: string,
    updatedAt: string
}

const produk = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [modalVisible, setModalVisible] = useState(false)
    const [addProduct, setAddProduct] = useState<string>('')
    const [addProductPrice, setAddProductPrice] = useState<string>('')
    const [addTypeProduct, setAddTypeProduct] = useState<string>('')

    const fetchProduk = async () => {

        const token = await AsyncStorage.getItem('token')

        if (!token) {
            console.error("Token tidak ditemukan")
            return
        }

        try {
            const response = await axiosInstance.get('products/', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            setProducts(response.data.data)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProduk()
    }, [])

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
                            <Text className='text-lg font-semibold mb-2'>Tambah Produk Baru</Text>

                            <View className='mb-5'>
                                <Text>Nama Produk</Text>
                                <TextInput
                                    className='border rounded-lg p-2 bg-white'
                                    placeholder='Masukkan Nama Produk'
                                    keyboardType='default'
                                    value={addProduct}
                                    onChangeText={(text) => setAddProduct(text)}
                                />
                            </View>

                            <View className='mb-5'>
                                <Text>Harga Produk</Text>
                                <TextInput
                                    className='border rounded-lg p-2 bg-white'
                                    placeholder='Masukkan Harga Produk'
                                    keyboardType='default'
                                    value={addProductPrice}
                                    onChangeText={(text) => setAddProductPrice(text)}
                                />
                            </View>

                            <View className='mb-5'>
                                <Text>Type Produk</Text>
                                <TextInput
                                    className='border rounded-lg p-2 bg-white'
                                    placeholder='Masukkan Type Produk'
                                    keyboardType='default'
                                    value={addTypeProduct}
                                    onChangeText={(text) => setAddTypeProduct(text)}
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
                    data={products}
                    renderItem={({ item }) => (
                        <View className='bg-white p-4 mb-3 rounded-xl shadow flex-row items-center'>
                            <View className={`w-12 h-12 rounded-full flex items-center bg-green-300 justify-center mr-3`}>
                                <Text>SU</Text>
                            </View>

                            <View className='flex-1'>
                                <Text className='font-semibold text-gray-900'>{item.name}</Text>
                                <Text className='text-gray-600 text-sm'>{item.price}</Text>
                                <Text className='text-gray-500 text-xs'>{item.type}</Text>
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

export default produk
