import { Tabs } from 'expo-router'
import React from 'react'

import Container from '@/common/components/container'
import { HapticTab } from '@/components/haptic-tab'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

export default function TabLayout() {
    const colorScheme = useColorScheme()

    return (
        <Container>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                    tabBarButton: HapticTab,
                }}
            >
                <Tabs.Screen
                    name="home/index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => (
                            <IconSymbol
                                size={28}
                                name="house.fill"
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="mine/index"
                    options={{
                        title: 'Mine',
                        tabBarIcon: ({ color }) => (
                            <IconSymbol
                                size={28}
                                name="person.fill"
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="more/index"
                    options={{
                        title: 'More',
                        tabBarIcon: ({ color }) => (
                            <IconSymbol
                                size={28}
                                name="ellipsis.circle"
                                color={color}
                            />
                        ),
                    }}
                ></Tabs.Screen>
                <Tabs.Screen
                    name="diet/index"
                    options={{
                        title: 'Diet',
                        tabBarIcon: ({ color }) => (
                            <IconSymbol
                                size={28}
                                name="fork.knife"
                                color={color}
                            />
                        ),
                    }}
                />
            </Tabs>
        </Container>
    )
}
