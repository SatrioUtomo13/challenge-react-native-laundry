import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useRouter, Link } from 'expo-router';
import { register } from '@/lib/axios'
import { useDispatch, useSelector } from 'react-redux';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';


const SignUpScreen = () => {
    const router = useRouter();
    const { registerForm } = useSelector((state: any) => state.auth)

    const dispatch = useDispatch()

    const handleChange = (field: string, value: string) => {
        dispatch({ type: "SET_REGISTER_FORM", field, value })
    }

    const handleRegister = async () => {
        const registeredUser = await register(registerForm.name, registerForm.email, registerForm.username, registerForm.password, registerForm.role)

        if (registeredUser) {
            router.push('/login')
        }

        // Reset form setelah login
        dispatch({ type: "SET_REGISTER_FORM", field: "email", value: "" })
        dispatch({ type: "SET_REGISTER_FORM", field: "name", value: "" })
        dispatch({ type: "SET_REGISTER_FORM", field: "role", value: "" })
        dispatch({ type: "SET_REGISTER_FORM", field: "username", value: "" })
        dispatch({ type: "SET_REGISTER_FORM", field: "password", value: "" })
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
                <MaterialIcons name="person" size={24} color="black" />
                <TextInput
                    placeholder="Name"
                    className='flex-1 text-base ml-2'
                    onChangeText={(text) => handleChange('name', text)}
                    value={registerForm.name}
                />
            </View>

            <View className='input-login'>
                <MaterialIcons name="email" size={24} color="black" />
                <TextInput
                    placeholder="Email"
                    className='flex-1 text-base ml-2'
                    onChangeText={(text) => handleChange('email', text)}
                    value={registerForm.email}
                />
            </View>

            <View className='input-login'>
                <MaterialIcons name="supervised-user-circle" size={24} color="black" />
                <TextInput
                    placeholder="Username"
                    className='flex-1 text-base ml-2'
                    onChangeText={(text) => handleChange('username', text)}
                    value={registerForm.username}
                />
            </View>

            <View className='input-login'>
                <AntDesign name="lock" size={24} color="black" />
                <TextInput
                    placeholder="Password"
                    className='flex-1 text-base ml-2'
                    secureTextEntry={true}
                    onChangeText={(text) => handleChange('password', text)}
                    value={registerForm.password}
                />
                <AntDesign name="eyeo" size={24} color="black" />
            </View>

            <View className='input-login'>
                <MaterialIcons name="tag" size={24} color="black" />
                <TextInput
                    placeholder="Role"
                    className='flex-1 text-base ml-2'
                    onChangeText={(text) => handleChange('role', text)}
                    value={registerForm.role}
                />
            </View>

            <TouchableOpacity
                className='text-lg font-bold bg-blue-500 py-3 w-full rounded-lg items-center mb-4'
                onPress={() => handleRegister()}
            >
                <Text className='text-lg font-bold text-white'>Daftar</Text>
            </TouchableOpacity>

            <Text className='text-sm text-gray-600'>Sudah punya akun? <Text className='text-blue-500 font-bold'><Link href="/login">Masuk</Link></Text></Text>
        </View>
    )
}

export default SignUpScreen