import { useLoginRegisterStore } from '@/store'
import { Redirect } from 'expo-router'
import { StyleSheet, View } from 'react-native'

export default function Index() {
    // 改為使用響應式的 hook
    const { token } = useLoginRegisterStore.getState()

    return (
        <View style={styles.container}>
            <Redirect href={token ? '/tabs/home' : '/login-register'} />
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
