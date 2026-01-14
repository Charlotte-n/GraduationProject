// app/_layout.tsx
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useLoginRegisterStore } from '@/store'
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export const unstable_settings = {
    anchor: 'index',
}

export default function RootLayout() {
    const colorScheme = useColorScheme()
    const { token } = useLoginRegisterStore.getState()

    return (
        <SafeAreaProvider>
            <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="login-register" />
                    <Stack.Screen name="tabs" />
                </Stack>
                <StatusBar style="auto" />
            </ThemeProvider>
        </SafeAreaProvider>
    )
}
