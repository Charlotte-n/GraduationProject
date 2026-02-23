import { getCommentApi, LogCommentApi, LogCommentSingleApi } from '@/apis'
import { CommunicateSingleContentData, FoodCommentListData } from '@/apis/types'
import { windowWidth } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import { useCommunicateStore, useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { useRouter } from 'expo-router'
import { memo, useEffect, useState } from 'react'
import {
    Image,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'
import Avatar from '../mine/avatar'

interface Props {
    index: number
    data: CommunicateSingleContentData
}

const topicMap = ['饮食打卡', '吃多了报道']

enum LikeMap {
    NONE = 0,
    LIKE = 1,
    DISLIKE = 2,
}

const buttonsConfig = (
    likeCounts: [number, number],
    currentType: LikeMap,
    getLikes: (type: LikeMap) => void,
) => {
    const [eatMore = 0, eatLess = 0] = likeCounts
    return [
        {
            title: ` 要少吃 ${eatLess}人`,
            handlePress: () => getLikes(LikeMap.DISLIKE),
            style: {
                backgroundColor:
                    LikeMap.DISLIKE === currentType
                        ? theme.colors.deep01Primary
                        : 'white',
            },
            textStyle: {
                color: LikeMap.DISLIKE === currentType ? 'white' : 'black',
            },
        },
        {
            title: ` 要多吃 ${eatMore}人`,
            handlePress: () => getLikes(LikeMap.LIKE),
            style: {
                backgroundColor:
                    LikeMap.LIKE === currentType
                        ? theme.colors.deep01Primary
                        : 'white',
            },
            textStyle: {
                color: LikeMap.LIKE === currentType ? 'white' : 'black',
            },
        },
    ]
}

export const UserButton = memo(
    ({ id }: { id: number }) => {
        const userInfo = useLoginRegisterStore((state) => state.userInfo)
        const updateOneCommunicate = useCommunicateStore((state) => state.updateOneCommunicate)
        const currentItem = useCommunicateStore((state) =>
            state.communicate.find((item) => item.id === id),
        )
        const currentType = currentItem?.type ?? 0
        const displayLikes: [number, number] = [
            currentItem?.likeNum ?? 0,
            currentItem?.disLikeNum ?? 0,
        ]

        const logComment = (type?: number, lodId?: number) => {
            LogCommentApi(type || 0, userInfo.id as number, lodId!)
                .then((res) => {
                    if (!res.data) {
                        ToastAndroid.show('操作失败', ToastAndroid.SHORT)
                        return
                    }
                    const counts = res.data as number[]
                    updateOneCommunicate(id, {
                        type: type ?? 0,
                        likeNum: counts[0],
                        disLikeNum: counts[1],
                    })
                })
                .catch((err) => {
                    ToastAndroid.show('操作失败', ToastAndroid.SHORT)
                })
        }

        const getLikes = (type?: number) => {
            logComment(type, id)
        }

        const logs = () => {
            LogCommentSingleApi(userInfo.id as number, id)
                .then((res) => {
                    if (!res.data) {
                        ToastAndroid.show(
                            '获取单个评论失败',
                            ToastAndroid.SHORT,
                        )
                        return
                    }
                    const counts = res.data as number[]
                    updateOneCommunicate(id, {
                        likeNum: counts[0],
                        disLikeNum: counts[1],
                    })
                })
                .catch((err) => {
                    ToastAndroid.show('获取单个评论失败', ToastAndroid.SHORT)
                })
        }

        useEffect(() => {
            logs()
        }, [id])

        const buttons = buttonsConfig(displayLikes, currentType, getLikes)
        return (
            <>
                {buttons.map((item, index) => (
                    <TouchableOpacity
                        key={item.title}
                        style={{
                            borderRadius: 10,
                            marginRight: index === buttons.length - 1 ? 0 : 5,
                            paddingHorizontal: 10,
                            paddingVertical: 3,
                            alignSelf: 'center',
                            ...item.style,
                        }}
                        onPress={item.handlePress}
                    >
                        <AutoText fontSize={4} style={item.textStyle}>
                            {item.title}
                        </AutoText>
                    </TouchableOpacity>
                ))}
            </>
        )
    },
)

const CommentCard = ({ data, index }: Props) => {
    const [comments, setComments] = useState<FoodCommentListData>([])
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const router = useRouter()

    const gotoCommunicateDetail = () => {
        router.navigate(
            `/more-cpages/communicate/c-pages/communicate-detail?id=${data.id}&type=${data.topicId}`,
        )
    }

    const getComment = (logId: number) => {
        getCommentApi({ logId, userId: userInfo.id as number })
            .then((res) => {
                setComments(res?.data || [])
            })
            .catch((err) => {
                ToastAndroid.show('获取评论失败', ToastAndroid.SHORT)
            })
    }

    useEffect(() => {
        getComment(data.id)
    }, [data.id])

    return (
        <TouchableOpacity
            onPress={gotoCommunicateDetail}
            style={[
                styles.container,
                index % 2 == 0
                    ? { backgroundColor: '#FBF1E4' }
                    : { backgroundColor: '#E1EEDD' },
            ]}
        >
            {/* 头像 */}
            <View style={styles.avatarContainer}>
                <Avatar
                    avatarUrl={data.avatar}
                    showIcon={false}
                    avatarStyle={styles.avatar}
                    textStyle={styles.text}
                    name={data.username}
                />
            </View>
            {/* 展示内容 */}
            <View style={styles.contentContainer}>
                <Text selectable={true} numberOfLines={2}>
                    <Text
                        selectable={true}
                        style={{
                            fontSize: 15,
                            color: '#EABC68',
                            lineHeight: 25,
                        }}
                        numberOfLines={2}
                    >
                        #{topicMap[data.topicId - 1]}{' '}
                    </Text>
                    <Text
                        selectable={true}
                        style={{
                            lineHeight: 25,
                        }}
                        numberOfLines={2}
                    >
                        {data.content}
                    </Text>
                </Text>
                {/* 图片 */}
                <View style={styles.imageContainer}>
                    {data.images &&
                        data.images instanceof Array &&
                        (data.images as string[]).map((item, imgIndex) => (
                            <Image
                                key={imgIndex}
                                source={{
                                    uri: item,
                                }}
                                style={styles.image}
                            />
                        ))}
                </View>
            </View>
            {/* 展示部分用户评论 */}
            {comments.length > 0 && (
                <View style={styles.commentContainer}>
                    <Text
                        style={{
                            fontSize: 12,
                            color: '#A9AAAF',
                            marginRight: 10,
                        }}
                    >
                        {comments[0]?.username}:
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            flex: 1,
                            color: '#A9AAAF',
                        }}
                        numberOfLines={1}
                    >
                        {comments[0]?.content}
                    </Text>
                </View>
            )}

            {/* 别人的建议选项 */}
            <View style={styles.suggestionContainer}>
                <TouchableOpacity style={styles.suggestionButton}>
                    <Image
                        style={styles.suggestionImage}
                        source={require('@/assets/icon/remark.png')}
                    ></Image>
                    <Text
                        style={{
                            fontSize: 12,
                        }}
                    >
                        {comments?.length}
                    </Text>
                </TouchableOpacity>
                {/* buttons */}
                <UserButton id={data.id} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
    },
    avatarContainer: {
        marginBottom: 20,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 100,
        marginRight: 15,
    },
    text: {
        fontSize: 16,
    },
    contentContainer: {
        marginBottom: 10,
    },
    imageContainer: {
        flexDirection: 'row',
    },
    image: {
        height: 80,
        width: (windowWidth - 80) / 4,
        marginRight: 5,
        borderRadius: 10,
    },
    commentContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    suggestionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    suggestionButton: {
        flexDirection: 'row',
        flex: 1,
    },
    suggestionImage: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
})

export default memo(CommentCard)
