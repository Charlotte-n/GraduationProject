import { doLike, PostDoLikeApi } from '@/apis'
import { FoodCommentListData } from '@/apis/types'
import AutoText from '@/common/components/AutoText'
import Avatar from '@/components/mine/avatar'
import { useFoodStore, useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { useRouter } from 'expo-router'
import { memo, useCallback } from 'react'
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import LikeDislike from './change-icon'

interface UserCommentProps {
    comments: FoodCommentListData
    showCommentModal: () => void
    foodId: number
    getComment: () => void
    type?: number
}

const UserComment = (
    { comments, showCommentModal, getComment, type }: UserCommentProps,
) => {
    const { setParentId } = useFoodStore.getState()
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const router = useRouter()


    const handleComment = (parentId: number) => {
        showCommentModal()
        setParentId(parentId)
    }

    const goCommentComply = (id: number, logCommentId?: number) => {
        router.navigate(`/diet-cpages/comment-apply/comment-apply?id=${id}&type=${type}&logCommentId=${logCommentId}`)
    }

    const handleLike = useCallback(async (commentId: number, logCommentId?: number) => {
        try {
            type === 1 ? await doLike(userInfo.id as number, commentId) : await PostDoLikeApi(userInfo.id as number, commentId)
            getComment()
        } catch (error) {
            ToastAndroid.show('点赞失败', ToastAndroid.SHORT)
            console.log(error)
        }
    }, [])

    return (
        <>
            {comments &&
                comments.length > 0 &&
                comments.map((comment) => {
                    return (
                        <View
                            key={comment.id}
                            style={styles.commentItemContainer}
                        >
                            <Avatar
                                avatarUrl={comment.avatar}
                                showIcon={false}
                                showName={false}
                                avatarStyle={{
                                    width: 30,
                                    height: 30,
                                    marginRight: 10,
                                }}
                                isImagePickerType={false}
                            />
                            <View style={styles.commentUserInfoContainer}>
                                {/* 自己的评论 */}
                                <View
                                    style={{
                                        width: 200,
                                        marginBottom: 10
                                    }}
                                >
                                    {comment.username && (
                                        <AutoText
                                            numberOfLines={1}
                                            fontSize={5.5}
                                            style={{
                                                color: '#cccccc',
                                                marginBottom: 10,
                                            }}
                                        >
                                            {comment.username}
                                        </AutoText>
                                    )}
                                    <TouchableOpacity
                                        onPress={() =>
                                            handleComment(comment.id)
                                        }
                                    >
                                        <AutoText fontSize={4.8}>
                                            {comment.content}
                                        </AutoText>
                                    </TouchableOpacity>
                                </View>
                                {/* 子评论 */}
                                {comment?.children?.length > 0 && (
                                    <View
                                        style={styles.childCommentContainer}
                                    >
                                        {comment.children[0].avatar && (
                                            <Avatar
                                                avatarUrl={comment.children[0].avatar}
                                                textStyle={styles.text}
                                                avatarStyle={styles.avatar}
                                                isImagePickerType={false}
                                                showIcon={false}
                                                showName={false} />
                                        )}
                                        <View
                                            style={
                                                styles.childCommentContentContainer
                                            }
                                        >
                                            <AutoText
                                                numberOfLines={1}
                                                fontSize={4.3}
                                                style={{
                                                    color: '#cccccc',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                {
                                                    comment.children[0]
                                                        .username
                                                }评论
                                                {comment.username}
                                            </AutoText>
                                            <AutoText fontSize={4.3}>
                                                {
                                                    comment.children[0]
                                                        .content
                                                }
                                            </AutoText>
                                            {comment?.children && comment?.children?.length >
                                                1 && (
                                                    <TouchableOpacity
                                                        style={{ marginTop: 5 }}
                                                        onPress={() => {
                                                            goCommentComply(
                                                                comment.id,
                                                                comment?.logId
                                                            )
                                                        }
                                                        }
                                                    >
                                                        <AutoText
                                                            fontSize={4.3}
                                                            style={{
                                                                color: theme
                                                                    .colors
                                                                    .deep01Primary,
                                                            }}
                                                        >
                                                            查看全部 (
                                                            {
                                                                comment.children
                                                                    .length
                                                            }
                                                            )
                                                        </AutoText>
                                                    </TouchableOpacity>
                                                )}
                                        </View>
                                        {/* 喜欢不喜欢 */}
                                        <LikeDislike
                                            isShowNum={false}
                                            likeData={comment.children[0]}
                                            likeImages={{
                                                like: '@/assets/icon/zan2.png',
                                                unlike: '@/assets/icon/zan1.png',
                                            }}
                                            ImageStyle={{
                                                width: 15,
                                                height: 15,
                                                marginRight: 5,
                                                marginBottom: 28,
                                            }}
                                            handleLike={() =>
                                                handleLike(
                                                    comment.children[0].id,
                                                )
                                            }
                                        />
                                    </View>
                                )}
                            </View>
                            <LikeDislike
                                isShowNum={false}
                                likeData={comment}
                                likeImages={{
                                    like: '@/assets/icon/zan2.png',
                                    unlike: '@/assets/icon/zan1.png',
                                }}
                                ImageStyle={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 5,
                                    marginBottom: 28,
                                }}
                                handleLike={() => handleLike(comment.id)}
                            />
                        </View>
                    )
                })}
        </>
    )
}

const styles = StyleSheet.create({
    commentItemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        marginBottom: 20,
    },
    commentUserInfoContainer: {
        marginLeft: 10,
        flex: 1,
        marginBottom: 10,
    },
    childCommentContainer: {
        flexDirection: 'row',
    },
    childCommentContentContainer: {
        position: 'relative',
        top: 1,
        marginLeft: 5,
        flex: 1,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 100,
        marginRight: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default memo(UserComment)
