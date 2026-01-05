import AutoText from '@/common/components/AutoText'
import Avatar from '@/components/mine/avatar'
import { useFoodStore } from '@/store'
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
                <Avatar showIcon={false} />
                <TouchableOpacity style={styles.commentUserInfoContainer}>
                    <TextInput
                        editable={false}
                        style={{
                            backgroundColor: '#F6F6F6',
                            borderRadius: 30,
                            flex: 1,
                            marginLeft: 10,
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            minHeight: 35,
                        }}
                        placeholder="喜欢评论的人,做饭一定很好吃~"
                        defaultValue={comment.current}
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
})

export default memo(forwardRef(Comment))
