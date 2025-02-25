import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';


const LoginScreen = () => {
    return (
        <View className='flex-1 items-center justify-center bg-white p-5'>
            <Image source={require('../assets/images/washing-machine.png')} className="w-24 h-24 mb-5" />
            <Text className='text-xl font-bold text-gray-800 mb-1'>Enigma Laundry Management</Text>
            <Text className='text-sm text-gray-600 mb-5'>Kelola bisnis laundry Anda dengan mudah</Text>

            <View className='flex-row items-center bg-gray-100 rounded-lg px-3 w-full h-12 mb-4'>
                <MaterialIcons name="email" size={24} color="black" />
                <TextInput placeholder="Email" className='flex-1 text-base ml-2' />
            </View>

            <View className='flex-row items-center bg-gray-100 rounded-lg px-3 w-full h-12 mb-4'>
                <AntDesign name="lock" size={24} color="black" />
                <TextInput placeholder="Email" className='flex-1 text-base ml-2' />
                <AntDesign name="eyeo" size={24} color="black" />
            </View>

            <TouchableOpacity className='bg-blue-500 py-3 w-full rounded-lg items-center mb-4'>
                <Text className='text-white text-lg font-bold'>Masuk</Text>
            </TouchableOpacity>

            <Text className='text-sm text-gray-600'>Baru di Enigma? <Text className='text-blue-500 font-bold'>Buat Akun</Text></Text>
        </View>
    )
}

export default LoginScreen