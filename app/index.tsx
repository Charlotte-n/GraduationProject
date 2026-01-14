import { useLoginRegisterStore } from '@/store'
import { useRouter, useSegments } from 'expo-router'
import { useLayoutEffect } from 'react'
import { InteractionManager, StyleSheet, View } from 'react-native'

export default function Index() {
    const router = useRouter()
    // 改為使用響應式的 hook
    const { token } = useLoginRegisterStore.getState()
    const segments = useSegments()

    useLayoutEffect(() => {
        // 確保 Root Layout 已經掛載後再執行導航
        const interaction = InteractionManager.runAfterInteractions(() => {
            const inAuthGroup = segments[0] === 'login-register'
            console.log('inAuthGroup', inAuthGroup)

            if (!token) {
                // 未登入，重定向到登入頁面
                router.replace('/login-register')
            } else if (token) {
                // 已登入，重定向到主頁
                // router.replace('/login-register')
                router.replace('/tabs/home')
            }
        })

        return () => {
            interaction.cancel()
        }
    }, [])
    return (
        <View style={styles.container}>
            <View>1111</View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
})
