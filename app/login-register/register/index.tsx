import { VerifyCodeParamType } from '@/apis'
import { screenHeight, screenWidth, windowWidth } from '@/common/common'
import CountDown from '@/components/count-down'
import theme from '@/styles/theme/color'
import type { InputRef } from '@/types'
import { verifyEmail } from '@/utils/validation'
import { Button, Icon, Image, Input } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRegisterInterface } from '../../../services/login-register/pageInterface/register'
import SeePassWord from '../components/see-password'

export default function Register() {
    const router = useRouter()
    const { top: safeAreaTop } = useSafeAreaInsets()
    const emailInput = useRef<InputRef>(null)
    const passwordinput = useRef<InputRef>(null)
    const twicepasswordInput = useRef<InputRef>(null)
    const [isEmail, setIsEmail] = useState(true)
    const [isPassword, setIsPassword] = useState(true)
    const [isTwicePassword, setIsTwicePassword] = useState(true)
    const [isVerifyCode, setIsVerifyCode] = useState(true)
    const [isSee, setIsSee] = useState(false)
    const [isTwiceSee, setIsTwiceSee] = useState(false)
    const [code, setCode] = useState(false)
    const verifyCode = useRef('')
    const password = useRef('')
    const twicePassword = useRef('')
    const email = useRef('')
    const { requestCode, requestVerifyCodeApi } = useRegisterInterface()

    const getTime = (value: string | number) => {
        if (value == 0) {
            setCode(false)
        }
    }

    const getIsSee = (value: boolean) => {
        setIsSee(value)
    }

    const getIsTwiceSee = (value: boolean) => {
        setIsTwiceSee(value)
    }

    //校验邮箱是否正确
    const verifyEmailRule = () => {
        setIsEmail(verifyEmail(email.current))
        if (!verifyEmail(email.current)) {
            emailInput.current?.shake?.()
        }
    }

    //校验第二次输入密码是否和第一次一样
    const verifyPassword = () => {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
        setIsPassword(reg.test(password.current))
        if (!isPassword) {
            passwordinput.current?.shake?.()
        }
    }

    const verifyTwicePassword = () => {
        if (password.current !== twicePassword.current) {
            setIsTwicePassword(false)
            twicepasswordInput.current?.shake?.()
            return
        }
        setIsTwicePassword(true)
    }

    const handleCode = () => {
        verifyEmailRule()
        if (!isEmail) {
            return
        }

        requestCode(email.current, router)
            .then((res) => {
                if (res) {
                    setCode((value) => !value)
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    // 校验
    const verifyRegister = () => {
        verifyEmailRule()
        verifyPassword()
        verifyTwicePassword()
    }

    // 注册
    const handleRegister = () => {
        verifyRegister()
        if (!isEmail || !isPassword || !isTwicePassword) {
            return
        }

        const params: VerifyCodeParamType = {
            code: verifyCode.current,
            email: email.current,
            password: password.current,
        }

        requestVerifyCodeApi(params)
            .then((res) => {
                if (!res) {
                    setIsVerifyCode(false)
                    return
                }

                setIsVerifyCode(true)
                Alert.alert('', '注册成功,是否要去登录', [
                    {
                        text: '取消',
                        style: 'cancel',
                    },
                    {
                        text: '确定',
                        onPress: () => router.replace('/login-register/login'),
                    },
                ])
            })
            .catch((error) => {
                setIsVerifyCode(false)
                console.error(error)
            })
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableOpacity
                style={[styles.Back, { top: safeAreaTop + 10 }]}
                touchSoundDisabled
                onPress={() => router.back()}
            >
                <Icon
                    name="left"
                    type="antdesign"
                    color={theme.colors.deep01Primary}
                    size={30}
                />
            </TouchableOpacity>
            <ScrollView style={{ flex: 1 }}>
                <StatusBar backgroundColor={theme.colors.primary} />
                <View style={styles.content}>
                    <Image
                        source={require('@/assets/images/bg_login_header.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </View>

                {/* Bottom */}
                <View style={styles.Bottom}>
                    <Text style={styles.LoginText}>注册</Text>
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
                            onChangeText={(value: string) =>
                                (email.current = value)
                            }
                        />

                        <Input
                            ref={passwordinput}
                            placeholder="输入密码"
                            leftIcon={
                                <Icon
                                    name={'password'}
                                    size={24}
                                    color={'#FB7F86'}
                                    style={{ marginRight: 10 }}
                                />
                            }
                            onBlur={() => verifyPassword()}
                            defaultValue=""
                            secureTextEntry={!isSee}
                            containerStyle={{
                                marginTop: 20,
                            }}
                            ErrorComponent={() => {
                                if (!isPassword) {
                                    return (
                                        <Text style={{ color: 'red' }}>
                                            密码必须包含数字、字母，且长度为8-16位
                                        </Text>
                                    )
                                }
                            }}
                            rightIcon={<SeePassWord getIsSee={getIsSee} />}
                            onChangeText={(value: string) =>
                                (password.current = value)
                            }
                        />

                        <Input
                            ref={twicepasswordInput}
                            placeholder="再次输入密码"
                            leftIcon={
                                <Icon
                                    name={'password'}
                                    size={24}
                                    color={'#FB7F86'}
                                    style={{ marginRight: 10 }}
                                />
                            }
                            containerStyle={{
                                marginTop: 20,
                            }}
                            onBlur={() => verifyTwicePassword()}
                            onChangeText={(value: any) =>
                                (twicePassword.current = value)
                            }
                            defaultValue=""
                            secureTextEntry={!isTwiceSee}
                            rightIcon={<SeePassWord getIsSee={getIsTwiceSee} />}
                            ErrorComponent={() => {
                                if (!isTwicePassword) {
                                    return (
                                        <Text style={{ color: 'red' }}>
                                            和上面的密码不一样
                                        </Text>
                                    )
                                }
                            }}
                        />
                        <View style={styles.Code}>
                            <Input
                                placeholder="输入验证码"
                                onChangeText={(value) => {
                                    verifyCode.current = value
                                }}
                                defaultValue=""
                                leftIcon={
                                    <Icon
                                        name={'code'}
                                        size={24}
                                        color={'#FB7F86'}
                                        style={{
                                            marginRight: 10,
                                        }}
                                    />
                                }
                                containerStyle={{
                                    marginTop: 20,
                                    marginRight: 10,
                                    width: windowWidth / 2,
                                }}
                                ErrorComponent={() => {
                                    if (!isVerifyCode) {
                                        return (
                                            <Text style={{ color: 'red' }}>
                                                验证码错误
                                            </Text>
                                        )
                                    }
                                }}
                            />
                            {code ? (
                                <CountDown
                                    getTime={getTime}
                                    defaultTime={120}
                                ></CountDown>
                            ) : (
                                <Button
                                    title={'获取验证码'}
                                    buttonStyle={{
                                        backgroundColor: '#F17A81',
                                        borderRadius: 30,
                                        paddingVertical: 10,
                                    }}
                                    containerStyle={{
                                        width: windowWidth / 3,
                                        borderRadius: 30,
                                    }}
                                    titleStyle={{
                                        fontSize: 15,
                                    }}
                                    onPress={() => handleCode()}
                                ></Button>
                            )}
                        </View>
                    </View>

                    {/* 注册按钮 */}
                    <View style={styles.LoginButton}>
                        <Button
                            onPress={() => handleRegister()}
                            title={'注册'}
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
                                backgroundColor: '#F17A81',
                                borderRadius: 30,
                                paddingVertical: 10,
                            }}
                            containerStyle={{
                                width: screenWidth / 2.5,
                                borderRadius: 30,
                                marginVertical: 20,
                            }}
                            titleStyle={{
                                fontSize: 20,
                                marginRight: 15,
                            }}
                        ></Button>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        height: screenHeight / 3.8,
        position: 'relative',
    },
    Bottom: {
        paddingTop: 50,
        paddingHorizontal: 30,
        flex: 1,
        width: '100%',
    },
    LoginText: {
        fontSize: 28,
        color: '#3D0007',
        marginBottom: 15,
    },
    LoginButton: {
        alignItems: 'flex-end',
    },
    Back: {
        position: 'absolute',
        zIndex: 10,
        borderRadius: 100,
        marginLeft: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    //   获取验证码
    Code: {
        width: windowWidth,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    CodeButton: {
        color: '#F17A81',
        margin: 0,
    },
})
