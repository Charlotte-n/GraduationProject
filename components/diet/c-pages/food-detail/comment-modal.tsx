import { PostCommentsApi } from '@/apis'
import { PostFoodCommentData } from '@/apis/types/food'
import { useFoodStore, useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { BottomSheet, Button, Icon } from '@rneui/themed'
import { memo, useEffect, useRef } from 'react'
import {
    Keyboard,
    StyleSheet,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'

const CommentModal = ({
    isVisible,
    onClose,
    foodId,
    getComment,
}: {
    foodId: number
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
            const data: PostFoodCommentData = {
                content: comment.current,
                dishId: foodId,
                userId: userInfo.id as number,
                parentId: parentId,
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
        <BottomSheet isVisible={isVisible} containerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Icon type="antdesign" name="close" />
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                <TextInput
                    ref={commentInput}
                    style={{
                        backgroundColor: '#f6f6f6',
                        borderRadius: 30,
                        flex: 1,
                        marginRight: 10,
                        paddingHorizontal: 10,
                        borderBottomWidth: 1,
                        height: 45,
                    }}
                    placeholder="写评论....."
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
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 300,
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
