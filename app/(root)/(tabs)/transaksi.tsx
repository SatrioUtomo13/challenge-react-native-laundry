import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from 'react'

const transactions = [
    { date: "25 April 2024", type: "Dry Clean", amount: "Rp 6.000", qty: "2 Pcs" },
    { date: "1 April 2024", type: "Setrika", amount: "Rp 100.000", qty: "20 Kg" },
    { date: "4 April 2024", type: "Setrika", amount: "Rp 50.000", qty: "10 Kg" },
    { date: "7 April 2024", type: "Setrika", amount: "Rp 55.000", qty: "11 Kg" },
    { date: "21 April 2024", type: "Setrika", amount: "Rp 65.000", qty: "13 Kg" },
];

const transaksi = () => {
    return (
        <View className="bg-gray-100 flex-1">
            <View className="bg-blue-500 p-4 rounded-b-3xl">
                <Text className="text-white text-xl font-bold">Riwayat Transaksi</Text>
                <Text className="text-white">Gina Rodriguez</Text>
            </View>

            <ScrollView>
                {transactions.map((item, index) => (
                    <View
                        key={index}
                        className="bg-white p-4 mb-3 rounded-lg shadow"
                    >
                        <Text className="text-gray-800 font-semibold">{item.date}</Text>
                        <Text className="text-red-500 text-sm">{item.type}</Text>
                        <View className="flex-row justify-between mt-1">
                            <Text className="text-gray-600 text-sm">{item.qty}</Text>
                            <Text className="text-blue-500 font-bold">{item.amount}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default transaksi