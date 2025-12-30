import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useColorScheme } from '@/hooks/use-color-scheme'
import { useLoginRegisterStore } from '@/store'

export const unstable_settings = {
    anchor: 'tabs',
}

export default function RootLayout() {
    const colorScheme = useColorScheme()
    const { token } = useLoginRegisterStore.getState()

    return (
        <SafeAreaProvider>
            <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
                <Stack>
                    {token ? (
                        <Stack.Screen
                            name="tabs"
                            options={{ headerShown: false }}
                        />
                    ) : (
                        <Stack.Screen
                            name="login-register"
                            options={{ headerShown: false }}
                        />
                    )}
                </Stack>
                <StatusBar style="auto" />
            </ThemeProvider>
        </SafeAreaProvider>
    )
}
