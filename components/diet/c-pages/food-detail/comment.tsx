import AutoText from '@/common/components/AutoText'
import Avatar from '@/components/mine/avatar'
import { useFoodStore } from '@/store'
import theme from '@/styles/theme/color'
import {
    ComponentRef,
    forwardRef,
    memo,
    Ref,
    useImperativeHandle,
    useRef,
} from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import UserComment from './user-comment'

interface CommentProps {
    foodId: number
    showCommentModal: () => void
}

const Comment = (
    { foodId, showCommentModal }: CommentProps,
    ref: Ref<{ getComment: () => void }>,
) => {
    const comments = useFoodStore((state) => state.comments)
    const comment = useRef('')
    const userCommentRef = useRef<ComponentRef<typeof UserComment>>(null)

    const handleComment = (text: string) => {
        comment.current = text
    }

    const getComment = () => {
        userCommentRef.current?.getComment()
    }

    useImperativeHandle(ref, () => ({
        getComment,
    }))

    return (
        <View>
            {/* 标题 */}
            <AutoText
                fontSize={6.5}
                style={{
                    fontWeight: 700,
                    marginBottom: 10,
                }}
            >
                这道菜的评论 {comments?.length}
            </AutoText>
            {/*用户发评论的帖子*/}
            <View style={styles.commentContainer}>
                <Avatar showIcon={false} avatarStyle={styles.avatar} textStyle={styles.text} />
                <TouchableOpacity style={styles.commentUserInfoContainer} onPress={showCommentModal}>
                    <TextInput
                        editable={false}
                        style={{
                            backgroundColor: '#F6F6F6',
                            borderRadius: 30,
                            flex: 1,
                            paddingHorizontal: 10,
                            minHeight: 35,
                        }}
                        placeholder="喜欢评论的人,做饭一定很好吃~"
                        defaultValue={comment.current}
                        placeholderTextColor={theme.colors.deep01Primary}
                        onChangeText={handleComment}
                    ></TextInput>
                </TouchableOpacity>
            </View>
            {/* 用户的评论 */}
            <UserComment
                ref={userCommentRef}
                comments={comments}
                showCommentModal={showCommentModal}
                foodId={foodId}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    commentUserInfoContainer: {
        flex: 1,
        minHeight: 35,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 100,
        marginRight: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
        maxWidth: 50,
    },
})

export default memo(forwardRef(Comment))
