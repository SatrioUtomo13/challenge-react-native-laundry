import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'

const header = ({ setModalVisible, icon, title }: { setModalVisible: (visible: boolean) => void, icon: any, title: string }) => {
    return (
        <View className='flex flex-row items-center justify-between'>
            <View>
                <Text className='text-blue-700 text-xl font-bold mb-2'>Daftar {title}</Text>
                <Text className='text-gray-600 mb-4'>Semua {title}</Text>
            </View>
            <TouchableOpacity>
                <Pressable
                    onPress={() => setModalVisible(true)}
                >
                    {icon && icon}
                </Pressable>
            </TouchableOpacity>
        </View>
    )
}

export default header