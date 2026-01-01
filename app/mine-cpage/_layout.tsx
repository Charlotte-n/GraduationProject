import theme from '@/styles/theme/color'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function MineCpageLayout() {
    const insets = useSafeAreaInsets()
    return (
        <View style={styles.container}>
            <View
                style={{
                    height: insets.top,
                    backgroundColor: theme.colors.deep01Primary,
                }}
            ></View>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="collect/index" />
                <Stack.Screen name="collect/cpages/recipe/index" />
                <Stack.Screen name="body/index" />
                <Stack.Screen name="intake/index" />
                <Stack.Screen name="profile/index" />
            </Stack>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
