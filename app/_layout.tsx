// app/_layout.tsx
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useColorScheme } from '@/hooks/use-color-scheme'
import { useLoginRegisterStore } from '@/store'

export const unstable_settings = {
    anchor: 'tabs',
}

export default function RootLayout() {
    const colorScheme = useColorScheme()
    // 改為使用響應式的 hook
    const { token } = useLoginRegisterStore.getState()
    const segments = useSegments()
    const router = useRouter()

    useEffect(() => {
        const inAuthGroup = segments[0] === 'login-register'

        if (!token && !inAuthGroup) {
            // 未登入，重定向到登入頁面
            router.replace('/login-register')
        } else if (token && inAuthGroup) {
            // 已登入，重定向到主頁
            router.replace('/tabs')
        }
    }, [token, segments])

    return (
        <SafeAreaProvider>
            <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="login-register" />
                    <Stack.Screen name="tabs" />
                    <Stack.Screen name="mine-cpage" />
                </Stack>
                <StatusBar style="auto" />
            </ThemeProvider>
        </SafeAreaProvider>
    )
}
