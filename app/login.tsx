import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useRouter } from 'expo-router';
import { login } from '@/lib/axios'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "expo-router";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';


const LoginScreen = () => {
    const router = useRouter();
    const { loginForm } = useSelector((state: any) => state.auth)

    const dispatch = useDispatch()

    const handleChange = (field: string, value: string) => {
        dispatch({ type: "SET_LOGIN_FORM", field, value })
    }

    const handleLogin = async () => {
        const loggedInUser = await login(loginForm.username, loginForm.password)

        if (loggedInUser) {
            dispatch({ type: "LOGIN", payload: loggedInUser })
            router.push('/customer')
        }

        // Reset form setelah login
        dispatch({ type: "SET_LOGIN_FORM", field: "username", value: "" })
        dispatch({ type: "SET_LOGIN_FORM", field: "password", value: "" })
    }

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
                    onChangeText={(text) => handleChange('username', text)}
                    value={loginForm.username}
                />
            </View>

            <View className='input-login'>
                <AntDesign name="lock" size={24} color="black" />
                <TextInput
                    placeholder="Password"
                    className='flex-1 text-base ml-2'
                    onChangeText={(text) => handleChange('password', text)}
                    value={loginForm.password}
                />
                <AntDesign name="eyeo" size={24} color="black" />
            </View>

            <TouchableOpacity
                className='text-lg font-bold bg-blue-500 py-3 w-full rounded-lg items-center mb-4'
                onPress={() => handleLogin()}
            >
                <Text className='text-lg font-bold text-white'>Masuk</Text>
            </TouchableOpacity>

            <Text className='text-sm text-gray-600'>Baru di Enigma? <Text className='text-blue-500 font-bold'><Link href="/signUp">Buat Akun</Link></Text></Text>
        </View>
    )
}

export default LoginScreen