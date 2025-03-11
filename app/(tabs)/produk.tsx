import { View, Text, FlatList, TouchableOpacity, Modal, Alert, Pressable, TextInput, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react'
import { fetchProduk, createProduct, deleteProduct, updateProduct } from '@/lib/axios'
import { getInitials } from '@/utils/textUtils';
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

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProduk() // Panggil fungsi fetchProduk
            setProducts(data)
        }

        getProducts()
    }, [])

    // Fungsi untuk menambahkan produk
    const handleCreateProduct = async () => {
        const newProduct = await createProduct(addProduct, addProductPrice, addTypeProduct);

        if (newProduct) {
            setProducts([...products, newProduct])
            setAddProduct(''); // Reset form
            setAddProductPrice('');
            setAddTypeProduct('');
            setModalVisible(false); // Tutup modal
        }
    }

    // Fungsi untuk menghapus produk
    const handleDeleteProduct = async (id: string) => {

        Alert.alert(
            'konfirmasi',
            'Apakah anda yakin ingin menghapus produk ini?',
            [
                {
                    text: 'Batal',
                    style: 'cancel'
                },
                {
                    text: 'Hapus',
                    onPress: async () => {
                        try {
                            await deleteProduct(id)
                            Alert.alert('Sukses', 'Data berhasil dihapus')
                            const data = await fetchProduk()
                            setProducts(data)
                        } catch (error) {
                            Alert.alert('Error', 'Terjadi kesalahan saat menghapus data')
                        }
                    }
                }
            ]
        )
    }

    // Fungsi untuk mengubah produk
    const handleUpdateProduct = (id: string) => {

        const productEdit = products.find((product) => product.id === id)

        if (productEdit) {
            setSelectedProduct(productEdit)
            setAddProduct(productEdit.name)
            setAddProductPrice(productEdit.price.toString())
            setAddTypeProduct(productEdit.type)
            setModalVisible(true)
        }

    }

    const handleSaveProduct = async (id: string) => {

        try {
            const updatedProduct = await updateProduct(id, addProduct, parseFloat(addProductPrice), addTypeProduct)

            if (updatedProduct) {
                Alert.alert('Sukses', 'Produk berhasil diperbaharui')

                // re-fetch data
                const data = await fetchProduk()
                setProducts(data)

                // Reset state
                setModalVisible(false);
                setSelectedProduct(null);
                setAddProduct('');
                setAddProductPrice('');
                setAddTypeProduct('');
            }
        } catch (error) {
            Alert.alert('Error', 'Terjadi kesalahan saat memperbaharui produk');
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

                            <TouchableOpacity
                                className='bg-blue-500 p-3 rounded-lg'
                                onPress={selectedProduct ? () => handleSaveProduct(selectedProduct.id) : handleCreateProduct}>
                                <Text className='text-white text-center font-semibold'>
                                    {selectedProduct ? 'Update' : 'Submit'}
                                </Text>
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
                    title='Produk'
                    setModalVisible={setModalVisible}
                    icon={<AntDesign name="pluscircle" size={45} color="blue" />}
                />

                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <View className='bg-white p-4 mb-3 rounded-xl shadow flex-row items-center'>
                            <View className={`w-12 h-12 rounded-full flex items-center bg-green-300 justify-center mr-3`}>
                                <Text>{getInitials(item.name)}</Text>
                            </View>

                            <View className='flex-1'>
                                <Text className='font-semibold text-gray-900'>{item.name}</Text>
                                <Text className='text-gray-600 text-sm'>{item.price}</Text>
                                <Text className='text-gray-500 text-xs'>{item.type}</Text>
                            </View>

                            <View className='flex flex-row'>
                                <TouchableOpacity
                                    className='bg-blue-600 p-2 rounded-lg mr-2'
                                    onPress={() => handleUpdateProduct(item.id)}
                                >
                                    <AntDesign name="edit" size={24} color="white" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className='bg-red-600 p-2 rounded-lg'
                                    onPress={() => handleDeleteProduct(item.id)}
                                >
                                    <AntDesign name="delete" size={24} color="white" />
                                </TouchableOpacity>

                            </View>
                        </View>
                    )}
                />

            </View>
        </SafeAreaView>
    )
}

export default produk
