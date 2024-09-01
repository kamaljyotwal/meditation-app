import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.primary }}>
            <Tabs.Screen
                name='nature-meditate'
                options={{
                    tabBarLabel: 'Meditate',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name='flower-tulip' color={color} size={24} />
                }}
            />
            <Tabs.Screen
                name='affirmations'
                options={{
                    tabBarLabel: 'Affirmations',
                    tabBarIcon: ({ color }) => <Entypo name='open-book' color={color} size={24} />
                }}
            />

        </Tabs>
    )
}

export default TabsLayout