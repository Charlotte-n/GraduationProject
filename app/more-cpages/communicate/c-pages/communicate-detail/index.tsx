import { getCommentApi, getRecordDetailApi } from '@/apis'
import { FoodCommentListData, GetRecordDetail } from '@/apis/types'
import { windowWidth } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import Container from '@/common/components/container'
import { UserButton } from '@/components/communicate/comment-card'
import CommentModal from '@/components/diet/c-pages/food-detail/comment-modal'
import UserComment from '@/components/diet/c-pages/food-detail/user-comment'
import Empty from '@/components/diet/c-pages/search/empty'
import Avatar from '@/components/mine/avatar'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'

const topicMap = ['饮食打卡', '吃多了报道']

export default function CommunicateDetail() {
    const [RecordDetail, setRecordDetail] = useState<GetRecordDetail>(
        {} as GetRecordDetail,
    )
    const { id, type: topicId } = useLocalSearchParams()
    const topicWidth =
        Number(topicId) === 1 ? windowWidth / 4.5 : windowWidth / 4
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const [comments, setComments] = useState<FoodCommentListData>([])
    const [isCommentModalVisible, setIsCommentModalVisible] = useState(false)
    const [parentId, setParentId] = useState<number | undefined>(undefined)
    const textInputRef = useRef<TextInput>(null)

    const showCommentModal = () => {
        setIsCommentModalVisible(true)
        setTimeout(() => {
            textInputRef.current?.focus()
        }, 300)
    }

    const getComment = () => {
        const param = {
            logId: Number(id),
            userId: userInfo.id as number,
            parentCommentId: parentId,
        }
        getCommentApi(param)
            .then((res) => {
                setComments(res?.data || [])
            })
            .catch((err) => {
                ToastAndroid.show('获取评论失败', ToastAndroid.SHORT)
                console.log(err)
            })
    }

    const getRecordDetail = () => {
        getRecordDetailApi(Number(id))
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('获取记录详情失败', ToastAndroid.SHORT)
                    return
                }
                const result = res.data.logImages
                    ? (res.data.logImages as string).split('|')
                    : null
                res.data.logImages = result
                    ? result.slice(0, result.length - 1)
                    : null
                setRecordDetail(res?.data || {})
            })
            .catch((e) => {
                ToastAndroid.show('获取记录详情失败', ToastAndroid.SHORT)
                console.log(e, '出错了')
            })
    }

    useEffect(() => {
        getRecordDetail()
        getComment()
    }, [])
    return (
        <Container>
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.headerContainer}>
                        <Avatar
                            avatarUrl={RecordDetail.avatar}
                            avatarStyle={styles.avatar}
                            textStyle={styles.text}
                            name={RecordDetail.username}
                            showIcon={false}
                        />
                    </View>
                    {/* 内容 */}
                    <View style={styles.content}>
                        <AutoText
                            fontSize={4.6}
                            style={{
                                lineHeight: 22,
                            }}
                        >
                            {RecordDetail.logContent}
                        </AutoText>
                        {/* 图片 */}
                        <View style={styles.imageContainer}>
                            {RecordDetail.logImages &&
                                (Array.isArray(RecordDetail.logImages)
                                    ? RecordDetail.logImages
                                    : [RecordDetail.logImages as string]
                                ).map((item: string, index: number) => (
                                    <TouchableOpacity key={index}>
                                        <Image
                                            style={styles.imageItem}
                                            source={{ uri: item }}
                                        />
                                    </TouchableOpacity>
                                ))}
                        </View>
                        <AutoText
                            fontSize={4.5}
                            style={[
                                styles.topicItem,
                                {
                                    width: topicWidth,
                                },
                            ]}
                        >
                            #{topicMap[Number(topicId) - 1]}
                        </AutoText>
                    </View>

                    {/* 饮食评论 */}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <AutoText
                            style={{
                                marginBottom: 10,
                            }}
                        >
                            评论({comments?.length}):
                        </AutoText>
                        {comments && comments.length > 0 ? (
                            <UserComment
                                comments={comments}
                                showCommentModal={() => { }}
                                foodId={Number(topicId)}
                            />
                        ) : (
                            <Empty text="暂无评论,快来评论吧!" />
                        )}
                    </ScrollView>
                </View>
                {/* 底部固定的内容 */}
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={{
                            height: 35,
                            flex: 1,
                        }}
                        onPress={showCommentModal}
                    >
                        <TextInput
                            ref={textInputRef}
                            editable={false}
                            placeholder={'说点什么...'}
                            placeholderTextColor={'#999'}
                            style={styles.input}
                        />
                    </TouchableOpacity>

                    <UserButton
                        id={Number(id)}
                    />
                </View>

                {/* 显示底部发表评论的弹窗 */}
                <CommentModal
                    isVisible={isCommentModalVisible}
                    onClose={() => setIsCommentModalVisible(false)}
                    getComment={getComment}
                    logId={Number(id)}
                />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        flex: 1,
        padding: 10,
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
    headerContainer: {
        marginBottom: 10,
    },
    content: {
        marginBottom: 15,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imageItem: {
        marginTop: 12,
        marginRight: 12,
        width: (windowWidth - 60) / 3,
        height: 100,
        borderRadius: 10,
    },
    topicItem: {
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.deep01Primary,
        paddingHorizontal: 5,
        paddingVertical: 2,
        color: theme.colors.deep01Primary,
    },
    bottomContainer: {
        flexDirection: 'row',
        backgroundColor: '#E0EDDC',
        alignItems: 'center',
        minHeight: 90,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 20,
        height: 35,
        backgroundColor: 'white',
        borderColor: 'white',
        flex: 1,
        fontSize: 12,
        paddingHorizontal: 2,
        marginRight: 10,
    },
})
