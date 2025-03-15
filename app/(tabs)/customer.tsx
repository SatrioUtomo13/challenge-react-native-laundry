import { View, Text, FlatList, TouchableOpacity, Modal, Alert, Pressable, TextInput, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react'
import Header from '../components/header';
import { fetchCustomer, createCustomer, deleteCustomer, updateCustomer } from '@/lib/axios'
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from '@expo/vector-icons/AntDesign';

const customer = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { customers, form, selectedCustomer } = useSelector((state: any) => state.customer)

    const dispatch = useDispatch()

    const getCustomers = async () => {
        const data = await fetchCustomer();

        dispatch({
            type: "FETCH_CUSTOMERS",
            payload: data
        })
    }

    useEffect(() => {
        getCustomers();
    }, []);


    // Fungsi untuk menambahkan customer
    const handleCreateCustomer = async () => {
        const newCustomer = await createCustomer(form.name, form.phoneNumber, form.address);

        if (newCustomer) {
            dispatch({
                type: "CREATE_CUSTOMER",
                payload: newCustomer
            })

            // Reset form setelah menambahkan customer
            dispatch({ type: "SET_FORM", field: "name", value: "" })
            dispatch({ type: "SET_FORM", field: "phoneNumber", value: "" })
            dispatch({ type: "SET_FORM", field: "address", value: "" })

            // Reset selected customer
            dispatch({ type: "SET_SELECTED_CUSTOMER", payload: null })

            setModalVisible(false)

            Alert.alert("Sukses", "Customer berhasil ditambahkan")
        }

    }

    // Fungsi untuk menghapus customer
    const handleDeleteCustomer = async (id: string) => {

        Alert.alert(
            'Konfirmasi',
            'Apakah anda yakin ingin menghapus Customer ini?',
            [
                {
                    'text': 'Batal',
                    'style': 'cancel'
                },
                {
                    'text': 'Hapus',
                    onPress: async () => {
                        try {
                            await deleteCustomer(id)

                            // dispatch to Redux
                            dispatch({
                                type: "DELETE_CUSTOMER",
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

    // Fungsi untuk mengubah customer
    const handleUpdateCustomer = (id: string) => {

        // Find customer by id
        const customerEdit = customers.find((customer: any) => customer.id === id)

        if (customerEdit) {
            dispatch({ type: 'SET_SELECTED_CUSTOMER', payload: customerEdit })
            dispatch({ type: "SET_FORM", field: "name", value: customerEdit.name })
            dispatch({ type: "SET_FORM", field: "phoneNumber", value: customerEdit.phoneNumber })
            dispatch({ type: "SET_FORM", field: "address", value: customerEdit.address })

            setModalVisible(true)
        }
    }

    // Fungsi untuk menyimpan perubahan customer
    const handleSaveCustomer = async (id: string) => {
        const updatedCustomer = await updateCustomer(id, form.name, form.phoneNumber, form.address)

        if (updatedCustomer) {
            dispatch({
                type: "UPDATE_CUSTOMER",
                payload: updatedCustomer
            })

            getCustomers()

            // Reset form setelah update
            dispatch({ type: "SET_FORM", field: "name", value: "" })
            dispatch({ type: "SET_FORM", field: "phoneNumber", value: "" })
            dispatch({ type: "SET_FORM", field: "address", value: "" })

            // Reset selected customer
            dispatch({ type: "SET_SELECTED_CUSTOMER", payload: null })

            Alert.alert('Sukses', 'Customer berhasil diperbaharui')

            setModalVisible(false)
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
                            <Text className='text-lg font-semibold mb-2'>Tambah Customer Baru</Text>

                            <View className='mb-5'>
                                <Text>Nama Customer</Text>
                                <TextInput
                                    className='border rounded-lg p-2 bg-white'
                                    placeholder='Masukkan Nama Customer'
                                    keyboardType='default'
                                    value={form.name}
                                    onChangeText={(text) => handleChange('name', text)}
                                />
                            </View>

                            <View className='mb-5'>
                                <Text>Phone Number</Text>
                                <TextInput
                                    className='border rounded-lg p-2 bg-white'
                                    placeholder='Masukkan Nomor HP Customer'
                                    keyboardType='default'
                                    value={form.phoneNumber}
                                    onChangeText={(text) => handleChange('phoneNumber', text)}
                                />
                            </View>

                            <View className='mb-5'>
                                <Text>Address</Text>
                                <TextInput
                                    className='border rounded-lg p-2 bg-white'
                                    placeholder='Masukkan Alamat Customer'
                                    keyboardType='default'
                                    value={form.address}
                                    onChangeText={(text) => handleChange('address', text)}
                                />
                            </View>

                            <TouchableOpacity
                                className='bg-blue-500 p-3 rounded-lg'
                                onPress={selectedCustomer ? () => handleSaveCustomer(selectedCustomer.id) : handleCreateCustomer}>
                                <Text className='text-white text-center font-semibold'>
                                    {selectedCustomer ? 'Update' : 'Submit'}
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
                    title='Customer'
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

                            <View className='flex flex-row'>
                                <TouchableOpacity
                                    className='bg-blue-600 p-2 rounded-lg mr-2'
                                    onPress={() => handleUpdateCustomer(item.id)}
                                >
                                    <AntDesign name="edit" size={24} color="white" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className='bg-red-600 p-2 rounded-lg'
                                    onPress={() => handleDeleteCustomer(item.id)}
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

export default customer