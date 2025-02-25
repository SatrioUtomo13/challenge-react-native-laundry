import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

const customers = [
    { id: '1', name: 'Gina Maryani', phone: '0811832614', transactions: 4, initials: 'GM', color: 'bg-purple-700' },
    { id: '2', name: 'Gina Alghifari', phone: '0813913253', transactions: 3, initials: 'GA', color: 'bg-pink-500' },
    { id: '3', name: 'Fahri Chen', phone: '0812637710', transactions: 1, initials: 'FC', color: 'bg-gray-500' },
    { id: '4', name: 'Gina Rodriguez', phone: '0812655652', transactions: 5, initials: 'GR', color: 'bg-green-500' },
    { id: '5', name: 'Ana Rodriguez', phone: '0811083630', transactions: 1, initials: 'AR', color: 'bg-yellow-500' },
];

const produk = () => {
    return (
        <View className='flex-1 bg-gray-100 p-4'>
            <View className='flex flex-row items-center justify-between'>
                <View>
                    <Text className='text-blue-700 text-xl font-bold mb-2'>Daftar Transaksi</Text>
                    <Text className='text-gray-600 mb-4'>Semua Pelanggan</Text>
                </View>
                <TouchableOpacity>
                    <AntDesign name="pluscircle" size={45} color="blue" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={customers}
                renderItem={({ item }) => (
                    <View className='bg-white p-4 mb-3 rounded-xl shadow flex-row items-center'>
                        <View className={`w-12 h-12 rounded-full flex items-center ${item.color} justify-center mr-3`}>
                            <Text>{item.initials}</Text>
                        </View>

                        <View className='flex-1'>
                            <Text className='font-semibold text-gray-900'>{item.name}</Text>
                            <Text className='text-gray-600 text-sm'>{item.phone}</Text>
                            <Text className='text-gray-500 text-xs'>{item.transactions} Transaksi</Text>
                        </View>

                        <TouchableOpacity className='bg-blue-600 px-4 py-2 rounded-lg'>
                            <Text className='text-white text-sm font-semibold'>Lihat Transaksi</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

export default produk