import { screenHeight } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import Container from '@/common/components/container'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { Button, Icon, Text } from '@rneui/themed'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import {
    Animated,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ChatItem = memo(({ data }: { data: any }) => {
    const cursorAnimation = useRef(new Animated.Value(0)).current
    const userInfo = useLoginRegisterStore((state) => state.userInfo)

    useEffect(() => {
        // 只在需要顯示游標時啟動動畫
        if (!(data as any).flag && !(data as any).end && data.sender === 'ai') {
            const animation = Animated.loop(
                Animated.sequence([
                    Animated.timing(cursorAnimation, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(cursorAnimation, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
            )
            animation.start()
            return () => animation.stop()
        }
    }, [cursorAnimation, data])

    const showCursor =
        data.sender === 'ai' && !(data as any).flag && !(data as any).end

    if (data.sender === 'ai') {
        return (
            <View style={styles.aiMessageContainer}>
                <Image
                    style={styles.avatar}
                    source={require('@/assets/images/robot.png')}
                    resizeMode="cover"
                />
                <View style={styles.aiBubble}>
                    <AutoText style={styles.messageText}>{data.text}</AutoText>
                    {showCursor && (
                        <Animated.View
                            style={[
                                styles.cursor,
                                {
                                    opacity: cursorAnimation,
                                },
                            ]}
                        />
                    )}
                </View>
            </View>
        )
    }

    return (
        <View style={styles.userMessageContainer}>
            <View style={styles.userBubble}>
                <AutoText style={styles.messageText}>{data.text}</AutoText>
            </View>
            <Image
                style={styles.userAvatar}
                source={
                    userInfo?.avatar
                        ? { uri: userInfo.avatar }
                        : require('@/assets/images/bg_login_header.png')
                }
                resizeMode="cover"
            />
        </View>
    )
})

interface messageType {
    sender: string
    text: string
    flag?: number
    end?: boolean
}

export default function AI() {
    const insets = useSafeAreaInsets()
    const [inputContent, setInputContent] = useState('')
    const [isSending, setIsSending] = useState(false)
    const inputRef = useRef<TextInput>(null)
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const scrollViewRef = useRef<ScrollView>(null)
    const [message, setMessage] = useState<messageType[]>(() => {
        return [
            {
                text: '你好！很高兴能为你提供有关饮食健康的建议。',
                sender: 'ai',
                flag: 1,
            },
        ]
    })
    const ws = useRef(
        null as unknown as WebSocket,
    )
    const msg = useRef('')
    const first = useRef(true)

    const renderItem = useCallback(({ item }: { item: any }) => {
        return <ChatItem data={item} />
    }, [])


    const handleSend = useCallback(async () => {
        if (isSending) return
        setIsSending(true)
        // 获取ai回复
        console.log('inputContent', inputContent)
        addNewMessage(inputContent, 'user')
        ws.current?.send(inputContent)
        setInputContent('')
    }, [inputContent, isSending])

    const clearMsg = useCallback(() => {
        msg.current = ''
    }, [])

    // 标记消息结束
    const markMessageEnd = useCallback(() => {
        setMessage((prevState) => {
            if (prevState.length === 0) return prevState
            return prevState.map((msg, index) =>
                index === prevState.length - 1 ? { ...msg, end: true } : msg,
            )
        })
    }, [])

    // 添加新消息
    const addNewMessage = useCallback((text: string, sender: string) => {
        setMessage((prevState) => [...prevState, { text, sender }])
    }, [])

    // 更新最后一条消息
    const updateLastMessage = useCallback((text: string) => {
        setMessage((prevState) => {
            if (prevState.length === 0) return prevState
            return prevState.map((msg, index) =>
                index === prevState.length - 1 ? { ...msg, text } : msg,
            )
        })
    }, [])

    useEffect(() => {
        ws.current = new WebSocket('ws://10.178.89.117:8080/ws/' + userInfo?.id)
        ws.current.onopen = () => {
            console.log('连接成功')
        }

        ws.current.onmessage = (event) => {
            scrollViewRef.current?.scrollToEnd({ animated: true })
            console.log('event前端收到消息', event)
            // 收到结束标记 '|'，标记消息完成并重置状态
            if (event.data === '|') {
                first.current = true
                setIsSending(false)
                markMessageEnd()
                clearMsg()
                return
            }

            // 累积消息内容
            msg.current += event.data

            // 根据是否是第一条消息片段，决定是创建新消息还是更新现有消息
            if (first.current) {
                first.current = false
                addNewMessage(msg.current, 'ai')
            } else {
                updateLastMessage(msg.current)
            }
        }

        ws.current.onclose = () => {
            console.log('连接关闭')
        }

        ws.current.onerror = (error) => {
            console.log('WebSocket错误:', error)
        }

        return () => {
            ws.current?.close()
            ws.current.onmessage = null as any
            ws.current.onclose = null as any
            ws.current.onerror = null as any
            ws.current.onopen = null as any
        }
    }, [])
    return (
        <Container>
            <KeyboardAvoidingView
                style={[
                    styles.container,
                    { paddingBottom: insets.bottom || 25 },
                ]}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {/* ai对话 */}
                <ScrollView
                    style={styles.aiConversation}
                    showsVerticalScrollIndicator={false}
                    ref={scrollViewRef}
                >
                    {/* 首先ai显示自我介绍 */}
                    <FlatList
                        scrollEnabled={false}
                        data={message}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ScrollView>
                {/* 文本框 */}
                <View
                    style={[
                        styles.inputContainer,
                        {
                            paddingBottom: Math.max(insets.bottom, 10),
                        },
                    ]}
                >
                    <View style={styles.inputWrapper}>
                        <TextInput
                            ref={inputRef}
                            style={styles.textInput}
                            placeholder="輸入消息..."
                            placeholderTextColor="#999"
                            multiline={false}
                            maxLength={500}
                            returnKeyType="send"
                            value={inputContent}
                            editable={!isSending}
                            onChangeText={setInputContent}
                        />
                        {inputContent.trim().length > 0 && (
                            <TouchableOpacity
                                style={styles.clearButton}
                                hitSlop={{
                                    top: 10,
                                    bottom: 10,
                                    left: 10,
                                    right: 10,
                                }}
                                onPress={() => {
                                    setInputContent('')
                                }}
                            >
                                <Icon
                                    name="close"
                                    type="material"
                                    size={18}
                                    color="#999"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    <Button
                        onPress={(inputContent.length === 0 || isSending) ? () => { } : handleSend}
                        loading={isSending}
                        buttonStyle={[
                            styles.sendButton,
                            (inputContent.length === 0 || isSending) && styles.sendButtonDisabled
                        ]}
                        titleStyle={styles.sendButtonText}
                        icon={
                            !isSending && (
                                <Icon
                                    name="send"
                                    type="material"
                                    size={18}
                                    color="#fff"
                                    style={styles.sendIcon}
                                />
                            )
                        }
                    >
                        <Text>{isSending ? '发送中...' : '发送'}</Text>
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    aiConversation: {
        height: screenHeight * 0.8,
        position: 'relative',
    },
    aiMessageContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    userMessageContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    avatar: {
        width: 30,
        height: 30,
        marginRight: 10,
        borderRadius: 15,
    },
    userAvatar: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        marginLeft: 10,
    },
    aiBubble: {
        maxWidth: 280,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: theme.colors.secondary,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    userBubble: {
        maxWidth: 280,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: theme.colors.secondary,
    },
    messageText: {
        flex: 1,
    },
    cursor: {
        width: 2,
        height: 16,
        backgroundColor: '#000',
        marginLeft: 2,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        // backgroundColor: 'gray',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        // position: 'relative',
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        height: 45,
        minHeight: 45,
        maxHeight: 100,
        borderWidth: 1,
        borderColor: theme.colors.deep01Primary,
        borderRadius: 22,
        backgroundColor: '#fff',
        fontSize: 14,
        color: '#333',
    },
    clearButton: {
        position: 'absolute',
        right: 8,
        padding: 4,
    },
    sendButton: {
        height: 45,
        paddingHorizontal: 20,
        borderRadius: 22,
        minWidth: 70,
        backgroundColor: theme.colors.deep01Primary,
    },
    sendButtonDisabled: {
        backgroundColor: theme.colors.deep01Primary,
        opacity: 0.6,
    },
    sendButtonText: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 4,
    },
    sendIcon: {
        marginRight: 4,
    },
})
