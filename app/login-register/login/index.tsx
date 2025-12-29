import { requestLogin } from '@/services/login'
import theme from '@/styles/theme/color'
import { verifyEmail } from '@/utils/validation'
import { Button, Icon, Image, Input } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import type { ComponentRef } from 'react'
import { useRef, useState } from 'react'
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import SeePassWord from '../components/see-password'

type BaseInputRef = ComponentRef<typeof TextInput>
type InputRef = BaseInputRef & {
    shake?: () => void
}

const { height } = Dimensions.get('screen')
const { height: windowHeight } = Dimensions.get('window')

export default function Login() {
    const router = useRouter()
    const [isEmail, setIsEmail] = useState(true)
    const [isPassWord, setIsPassWord] = useState(true)
    const [isSee, setIsSee] = useState(false)
    const password = useRef('')
    const email = useRef('')
    const passwordInput = useRef<InputRef>(null)
    const emailInput = useRef<InputRef>(null)

    const getIsSee = (value: boolean) => {
        setIsSee(value)
    }

    // 验证邮箱规则
    const verifyEmailRule = () => {
        setIsEmail(verifyEmail(email.current))
        if (!verifyEmail(email.current)) {
            emailInput.current?.shake?.()
        }
    }

    // 验证密码规则
    const verifyPasswordRule = () => {
        if (password.current.length === 0) {
            passwordInput.current?.shake?.()
            setIsPassWord(false)
            return
        }
        setIsPassWord(true)
    }

    // 校验
    const verifyLogin = () => {
        verifyEmailRule()
        verifyPasswordRule()
    }

    // 跳转
    const goToMine = () => {
        verifyLogin()
        if (!isEmail || !isPassWord) {
            return
        }

        requestLogin(email.current, password.current)
            .then((res) => {
                if (res) {
                    // 存储token & 跳转
                    router.navigate('/tabs')
                } else {
                    Alert.alert('', '邮箱或者密码错误,请重新输入', [
                        {
                            text: '确定',
                            onPress: () => console.log('OK Pressed'),
                            style: 'cancel',
                        },
                    ])
                }
            })
            .catch((error) => {
                // 提示错误
                console.error(error)
            })
    }
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView style={{ flex: 1 }}>
                <StatusBar backgroundColor={theme.colors.primary} />
                <View style={styles.content}>
                    <Image
                        source={require('@/assets/images/bg_login_header.png')}
                        style={styles.loginHeaderImage}
                    />
                    <TouchableOpacity
                        style={styles.Back}
                        touchSoundDisabled
                        onPress={() => router.back()}
                    >
                        <Icon
                            name={'left'}
                            type={'antdesign'}
                            color={theme.colors.deep01Primary}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                {/* bottom */}
                <View style={styles.Bottom}>
                    <Text style={styles.LoginText}>登录</Text>
                    <View>
                        <Input
                            ref={emailInput}
                            placeholder="输入邮箱"
                            leftIcon={
                                <Icon
                                    name={'email'}
                                    size={24}
                                    color={'#FB7F86'}
                                    style={{ marginRight: 10 }}
                                />
                            }
                            onBlur={() => verifyEmailRule()}
                            onChangeText={() => {
                                verifyEmailRule()
                            }}
                            defaultValue=""
                            ErrorComponent={() => {
                                if (!isEmail) {
                                    return (
                                        <Text style={{ color: 'red' }}>
                                            邮箱错误
                                        </Text>
                                    )
                                }
                            }}
                        />
                        <Input
                            placeholder="输入密码"
                            defaultValue=""
                            ref={passwordInput}
                            onChangeText={() => {
                                verifyPasswordRule()
                            }}
                            ErrorComponent={() => {
                                if (!isPassWord) {
                                    return (
                                        <Text style={{ color: 'red' }}>
                                            密码错误
                                        </Text>
                                    )
                                }
                            }}
                            leftIcon={
                                <Icon
                                    name={'password'}
                                    size={24}
                                    color={'#FB7F86'}
                                    style={{
                                        marginRight: 10,
                                    }}
                                />
                            }
                            rightIcon={<SeePassWord getIsSee={getIsSee} />}
                            containerStyle={{
                                marginTop: 25,
                            }}
                            secureTextEntry={!isSee}
                        />
                    </View>
                    {/* 登录按钮 */}
                    <View style={styles.LoginButtonContainer}>
                        <Button
                            title={'登录'}
                            icon={
                                <Icon
                                    name="right"
                                    type="antdesign"
                                    color={'white'}
                                    size={25}
                                ></Icon>
                            }
                            iconRight
                            buttonStyle={{
                                backgroundColor: theme.colors.deep01Primary,
                                borderRadius: 30,
                                paddingVertical: 10,
                            }}
                            containerStyle={{
                                width: Dimensions.get('screen').width / 2.5,
                                borderRadius: 30,
                                marginVertical: 20,
                            }}
                            titleStyle={{
                                fontSize: 20,
                                marginRight: 10,
                            }}
                            onPress={() => goToMine()}
                        ></Button>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height,
    },
    content: {
        height: windowHeight / 1.5,
        width: '100%',
    },
    loginHeaderImage: {
        aspectRatio: 1,
        width: '100%',
        height: '100%',
    },
    Back: {
        position: 'absolute',
        borderRadius: 100,
        marginTop: 10,
        marginLeft: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    Bottom: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        width: '100%',
    },
    LoginText: {
        fontSize: 28,
        color: '#3D0007',
        marginBottom: 15,
    },
    LoginButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingLeft: 10,
    },
})
