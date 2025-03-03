import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const TabIcon = ({ focused, icon, title }: { focused: boolean, icon: any, title: string }) => (
    <View className='flex-1 mt-3 flex flex-row w-32 justify-center gap-2 items-center'>
        {icon}
        {focused ? <Text className='text-xs text-blue-500'>{title}</Text> : null}
    </View>
)


const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "white",
                    position: 'absolute',
                    borderTopColor: "#0061FF1A",
                    borderTopWidth: 1,
                    borderRadius: 20,
                    margin: 10,
                    padding: 5,
                    height: 60,
                }
            }}
        >

            <Tabs.Screen
                name="transaksi"
                options={{
                    title: 'Transaksi',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={<AntDesign name="wallet" size={20} color={focused ? '#0061ff' : '#666876'} />}
                            title="Transaksi"
                        />
                    )

                }}
            />
            <Tabs.Screen
                name="customer"
                options={{
                    title: 'Customer',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={<Ionicons name="people-sharp" size={20} color={focused ? '#0061ff' : '#666876'} />}
                            title="Customer"
                        />
                    )

                }}
            />
            <Tabs.Screen
                name="produk"
                options={{
                    title: 'Produk',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={<AntDesign name="inbox" size={20} color={focused ? '#0061ff' : '#666876'} />}
                            title="Produk"
                        />
                    )

                }}
            />
        </Tabs>
    )
}

export default TabsLayout