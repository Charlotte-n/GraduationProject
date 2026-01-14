import { PostCommentsApi } from '@/apis'
import { useFoodStore, useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { BottomSheet, Button, Icon } from '@rneui/themed'
import { memo, useEffect, useRef } from 'react'
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native'

const CommentModal = ({
    isVisible,
    onClose,
    foodId,
    getComment,
    logId,
}: {
    logId?: number
    foodId?: number
    isVisible: boolean
    onClose: () => void
    getComment: () => void
}) => {
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const parentId = useFoodStore((state) => state.parentId)
    const commentInput = useRef<TextInput>(null)
    const comment = useRef('')

    const handleComment = (text: string) => {
        comment.current = text
    }

    const handleSendComment = () => {
        postComments()
        onClose()
    }

    const postComments = async () => {
        if (comment.current.trim() === '') {
            ToastAndroid.show('请输入评论', ToastAndroid.SHORT)
            return
        }
        try {
            const data = {
                content: comment.current,
                userId: userInfo.id as number,
                parentId: parentId,
                dishId: foodId as number,
                logId: logId as number,
            }

            await PostCommentsApi(data)
            await getComment()
            comment.current = ''
            ToastAndroid.show('评论成功', ToastAndroid.SHORT)
        } catch (error) {
            ToastAndroid.show('评论失败', ToastAndroid.SHORT)
            console.log(error)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            commentInput.current?.focus()
        }, 500)
        return () => {
            Keyboard.dismiss()
        }
    }, [])
    return (
        <BottomSheet isVisible={isVisible} containerStyle={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Icon type="antdesign" name="close" />
                    </TouchableOpacity>
                </View>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss()
                    }}
                >
                    <View style={styles.contentContainer}>
                        <TextInput
                            ref={commentInput}
                            style={{
                                backgroundColor: '#f6f6f6',
                                borderRadius: 30,
                                flex: 1,
                                marginRight: 10,
                                paddingHorizontal: 10,
                                height: 45,
                                color: 'black',
                            }}
                            placeholder="写评论....."
                            placeholderTextColor="#999"
                            defaultValue=""
                            multiline={true}
                            onChangeText={handleComment}
                        />
                        <TouchableOpacity>
                            <Button
                                title={'发送'}
                                buttonStyle={{
                                    backgroundColor: theme.colors.deep01Primary,
                                    borderRadius: 15,
                                    paddingVertical: 10,
                                    paddingHorizontal: 10,
                                }}
                                onPress={handleSendComment}
                            ></Button>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
    },
    headerContainer: {
        backgroundColor: 'white',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingTop: 5,
    },
    closeButton: {
        paddingRight: 30,
    },
    contentContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        height: 80,
    },
})

export default memo(CommentModal)
