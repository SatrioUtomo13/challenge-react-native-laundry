import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'

const header = ({ setModalVisible, icon, title, type }: { setModalVisible: (visible: boolean) => void, icon: any, title: string, type: string }) => {
    return (
        <View className='flex flex-row items-center justify-between'>
            <View>
                <Text className='text-blue-700 text-xl font-bold mb-2'>Daftar {title}</Text>
                <Text className='text-gray-600 mb-4'>Semua {type}</Text>
            </View>
            <TouchableOpacity>
                <Pressable
                    onPress={() => setModalVisible(true)}
                >
                    {icon && icon}
                    {/* <AntDesign name="pluscircle" size={45} color="blue" /> */}
                </Pressable>
            </TouchableOpacity>
        </View>
    )
}

export default header