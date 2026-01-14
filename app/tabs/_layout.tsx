import { Tabs } from 'expo-router'
import React from 'react'

import Container from '@/common/components/container'
import { HapticTab } from '@/components/haptic-tab'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import theme from '@/styles/theme/color'
import { Icon } from '@rneui/themed'
import { useState } from 'react'
import {
    Image,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from 'react-native'
import More from './more'

export default function TabLayout() {
    const colorScheme = useColorScheme()
    const [isMoreVisible, setIsMoreVisible] = useState(false)

    return (
        <Container>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                    tabBarButton: HapticTab,
                    tabBarStyle: {
                        backgroundColor: theme.colors.primary,
                        borderTopColor: theme.colors.primary,
                    },
                }}
            >
                <Tabs.Screen
                    name="home/index"
                    options={{
                        title: '首页',

                        tabBarIcon: ({ color, size, focused }) => {
                            return focused ? (
                                <Icon
                                    name={'home'}
                                    color={theme.colors.deep01Primary}
                                    type={'feather'}
                                ></Icon>
                            ) : (
                                <Icon name={'home'} type={'feather'} />
                            )
                        },
                    }}
                />

                <Tabs.Screen
                    name="diet/index"
                    options={{
                        title: '饮食',
                        tabBarIcon: ({ color, size, focused }) => {
                            return focused ? (
                                <Icon
                                    name={'slightly-smile'}
                                    color={theme.colors.deep01Primary}
                                    type={'fontisto'}
                                ></Icon>
                            ) : (
                                <Icon
                                    name={'slightly-smile'}
                                    type={'fontisto'}
                                />
                            )
                        },
                    }}
                />

                <Tabs.Screen
                    name="more/index"
                    options={{
                        tabBarActiveTintColor: theme.colors.deep01Primary,
                        tabBarButton: (props) => (
                            <TouchableOpacity
                                {...(props as TouchableOpacityProps)}
                                activeOpacity={1}
                                onPress={() => setIsMoreVisible(!isMoreVisible)}
                                style={{
                                    position: 'relative',
                                    top: -15,
                                }}
                            >
                                <View>
                                    <Image
                                        source={require('@/assets/images/add2.png')}
                                        style={{
                                            width: 60,
                                            height: 60,
                                        }}
                                    ></Image>
                                </View>
                                <More
                                    isVisible={isMoreVisible}
                                    onClose={() => setIsMoreVisible(false)}
                                />
                            </TouchableOpacity>
                        ),
                    }}
                ></Tabs.Screen>
                <Tabs.Screen
                    name="health-meal/index"
                    options={{
                        title: '健康食谱',
                        tabBarIcon: ({ color, size, focused }) => {
                            return focused ? (
                                <Icon
                                    name={'file-text'}
                                    color={theme.colors.deep01Primary}
                                    type={'antdesign'}
                                ></Icon>
                            ) : (
                                <Icon name={'file-text'} type={'antdesign'} />
                            )
                        },
                        tabBarActiveTintColor: theme.colors.deep01Primary,
                    }}
                />

                <Tabs.Screen
                    name="mine/index"
                    options={{
                        title: '个人中心',
                        tabBarIcon: ({ color, size, focused }) =>
                            focused ? (
                                <Icon
                                    name="user"
                                    type="feather"
                                    color={theme.colors.deep01Primary}
                                    size={size}
                                />
                            ) : (
                                <Icon name="user" type="feather" size={size} />
                            ),
                        tabBarActiveTintColor: theme.colors.deep01Primary,
                    }}
                />
            </Tabs>
        </Container>
    )
}
