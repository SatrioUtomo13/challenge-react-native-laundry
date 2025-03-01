import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
interface Customer {
    name: string;
    phone: string;
    transactions: number;
    initials: string;
    color: string;
}

const listData = ({ customers }: { customers: Customer[] }) => {
    return (
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
    )
}

export default listData