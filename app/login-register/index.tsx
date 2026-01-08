import theme from '@/styles/theme/color'
import { Button } from '@rneui/themed'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('screen').height

export default function LoginAndRegister() {
    const router = useRouter()

    const goLogin = () => {
        console.log('goLogin')
        router.navigate('/login-register/login')
    }

    const goRegister = () => {
        router.navigate('/login-register/register')
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={require('@/assets/images/bg_welcome_header.png')}
                    style={{
                        width,
                        height: height / 1.5,
                    }}
                    contentFit="cover"
                />
            </View>
            <View style={styles.form}>
                {/* 表單內容將在這裡 */}
                <Button
                    title="登录"
                    buttonStyle={{
                        backgroundColor: theme.colors.deep01Primary,
                        borderRadius: 30,
                        paddingVertical: 10,
                    }}
                    containerStyle={{
                        width: 250,
                        borderRadius: 30,
                        marginVertical: 20,
                    }}
                    titleStyle={{
                        fontSize: 20,
                    }}
                    onPress={goLogin}
                />
                <Button
                    title="注册"
                    buttonStyle={{
                        backgroundColor: 'white',
                        borderRadius: 30,
                        paddingVertical: 10,
                    }}
                    containerStyle={{
                        width: 250,
                        borderRadius: 30,
                        marginTop: 10,
                    }}
                    titleStyle={{
                        color: theme.colors.deep01Primary,
                        fontSize: 20,
                    }}
                    onPress={goRegister}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary,
    },
    content: {
        width: '100%',
        height: Dimensions.get('screen').height / 1.5,
    },
    form: {
        alignItems: 'center',
    },
})
