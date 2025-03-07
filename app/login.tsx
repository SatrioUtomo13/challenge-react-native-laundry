import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { login } from '@/lib/axios';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';


const LoginScreen = () => {
    const router = useRouter();
    const [form, setForm] = useState({ username: '', password: '' });

    return (
        <View className='flex-1 items-center justify-center bg-white p-5'>
            <Image
                source={require('../assets/images/washing-machine.png')}
                className="w-24 h-24 mb-5"
            />

            <Text
                className='text-xl font-bold text-gray-800 mb-1'>Enigma Laundry Management
            </Text>
            <Text
                className='text-sm text-gray-600 mb-5'>Kelola bisnis laundry Anda dengan mudah
            </Text>

            <View className='input-login'>
                <MaterialIcons name="email" size={24} color="black" />
                <TextInput
                    placeholder="Email"
                    className='flex-1 text-base ml-2'
                    onChangeText={(text) => setForm({ ...form, username: text })}
                    value={form.username}
                />
            </View>

            <View className='input-login'>
                <AntDesign name="lock" size={24} color="black" />
                <TextInput
                    placeholder="Password"
                    className='flex-1 text-base ml-2'
                    onChangeText={(text) => setForm({ ...form, password: text })}
                    value={form.password}
                />
                <AntDesign name="eyeo" size={24} color="black" />
            </View>

            <TouchableOpacity
                className='text-lg font-bold bg-blue-500 py-3 w-full rounded-lg items-center mb-4'
                onPress={() => login(form, router)}
            >
                <Text className='text-lg font-bold text-white'>Masuk</Text>
            </TouchableOpacity>

            <Text className='text-sm text-gray-600'>Baru di Enigma? <Text className='text-blue-500 font-bold'>Buat Akun</Text></Text>
        </View>
    )
}

export default LoginScreen