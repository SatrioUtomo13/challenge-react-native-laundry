import { View, Text, FlatList, TouchableOpacity, Modal, Alert, Pressable, TextInput, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react'
import { fetchProduk, createProduct, deleteProduct, updateProduct } from '@/lib/axios'
import { getInitials } from '@/utils/textUtils';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/header';

import AntDesign from '@expo/vector-icons/AntDesign';

const produk = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const { products, form, selectedProduct } = useSelector((state: any) => state.product)

    const dispatch = useDispatch()

    const getProducts = async () => {
        const data = await fetchProduk() // Panggil fungsi fetchProduk
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data
        })
    }

    useEffect(() => {
        getProducts()
    }, [])

    // Fungsi untuk menambahkan produk
    const handleCreateProduct = async () => {
        const newProduct = await createProduct(form.name, form.price, form.type);

        if (newProduct) {
            dispatch({
                type: "CREATE_PRODUCT",
                payload: newProduct
            })

            // Reset form setelah menambahkan produk
            dispatch({ type: "SET_FORM", field: "name", value: "" })
            dispatch({ type: "SET_FORM", field: "price", value: "" })
            dispatch({ type: "SET_FORM", field: "type", value: "" })

            setModalVisible(false); // Tutup modal

            Alert.alert("Sukses", "Produk berhasil ditambahkan")
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

                            // dispatch to Redux
                            dispatch({
                                type: "DELETE_PRODUCT",
                                payload: id
                            })

                            Alert.alert('Sukses', 'Data berhasil dihapus')
                        } catch (error) {
                            Alert.alert('Error', 'Terjadi kesalahan saat menghapus data')
                        }
                    }
                }
            ]
        )
    }

    // Fungsi untuk mengubah nilai form
    const handleChange = (field: string, value: string) => {
        dispatch({ type: "SET_FORM", field, value })
    }

    // Fungsi untuk mengubah produk
    const handleUpdateProduct = (id: string) => {

        const productEdit = products.find((product: any) => product.id === id)

        if (productEdit) {
            dispatch({ type: 'SET_SELECTED_PRODUCT', payload: productEdit })
            dispatch({ type: "SET_FORM", field: "name", value: productEdit.name })
            dispatch({ type: "SET_FORM", field: "price", value: productEdit.price.toString() })
            dispatch({ type: "SET_FORM", field: "type", value: productEdit.type })

            setModalVisible(true)
        }

    }

    // Fungsi untuk menyimpan perubahan produk
    const handleSaveProduct = async (id: string) => {

        const updatedProduct = await updateProduct(id, form.name, parseFloat(form.price), form.type)

        if (updatedProduct) {
            dispatch({
                type: "UPDATE_PRODUCT",
                payload: updatedProduct
            })
            Alert.alert('Sukses', 'Produk berhasil diperbaharui')

            getProducts()

            // Reset form setelah update
            dispatch({ type: "SET_FORM", field: "name", value: "" })
            dispatch({ type: "SET_FORM", field: "price", value: "" })
            dispatch({ type: "SET_FORM", field: "type", value: "" })

            // Reset selected product
            dispatch({ type: "SET_SELECTED_PRODUCT", payload: null })

            setModalVisible(false);
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
                                    value={form.name}
                                    onChangeText={(text) => handleChange('name', text)}
                                />
                            </View>

                            <View className='mb-5'>
                                <Text>Harga Produk</Text>
                                <TextInput
                                    className='border rounded-lg p-2 bg-white'
                                    placeholder='Masukkan Harga Produk'
                                    keyboardType='default'
                                    value={form.price}
                                    onChangeText={(text) => handleChange('price', text)}
                                />
                            </View>

                            <View className='mb-5'>
                                <Text>Type Produk</Text>
                                <TextInput
                                    className='border rounded-lg p-2 bg-white'
                                    placeholder='Masukkan Type Produk'
                                    keyboardType='default'
                                    value={form.type}
                                    onChangeText={(text) => handleChange('type', text)}
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
