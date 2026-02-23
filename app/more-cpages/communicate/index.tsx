import {
    getCommunicateContentApi,
    getRecordMemoryApi,
    getTopicApi,
} from '@/apis'
import { GetCommunicateContentData } from '@/apis/types'
import Container from '@/common/components/container'
import CommunicateHeader from '@/components/communicate/communicate-header'
import CommunicateList from '@/components/communicate/communicate-list'
import StickyHeader from '@/components/communicate/sticky-header'
import { useCommunicateStore, useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
    Animated,
    RefreshControl,
    StyleSheet,
    ToastAndroid,
    View,
} from 'react-native'

export default function Communicate() {
    const [refreshing, setRefreshing] = useState(false)
    const scrollY = useRef(new Animated.Value(0)).current
    const headHeight = -1
    const [titles, setTitles] = useState<
        { id: string; title: string; desc: string }[]
    >([])
    const [topicId, setTopicId] = useState(0)
    const setCommunicate = useCommunicateStore((state) => state.setCommunicate)
    const communicate = useCommunicateStore((state) => state.communicate)
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const [recordNumber, setRecordNumber] = useState([0, 0, 0])

    const onRefresh = () => {
        getTopic()
        getDietRecord()
        getCommunicateContent()
    }

    const getCommunicateContent = () => {
        const data: GetCommunicateContentData = {
            id: topicId === 0 ? 0 : null,
            pageNum: 1,
            topicId: topicId,
            pageSize: 1000,
        }

        getCommunicateContentApi(data, userInfo.id as number)
            .then((res) => {
                setRefreshing(true)
                if (!res.data) {
                    ToastAndroid.show(
                        '获取饮食圈广场内容失败',
                        ToastAndroid.SHORT,
                    )
                    return
                }
                const result = (res.data ?? []).map((item) => {
                    if (item.images) {
                        item.images = (item.images as string)?.split('|')
                        item.images = item.images.slice(
                            0,
                            item.images.length > 4 ? 4 : item.images.length - 1,
                        )
                    }
                    return item
                })
                setCommunicate(result)
            })
            .catch((err) => {
                console.log(err)
                ToastAndroid.show('获取饮食圈广场内容失败', ToastAndroid.SHORT)
            })
            .finally(() => {
                setRefreshing(false)
            })
    }

    const getTopic = () => {
        getTopicApi()
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('获取饮食圈主题失败', ToastAndroid.SHORT)
                    return
                }
                res.data.unshift({
                    desc: '全部',
                    id: 0,
                    status: 1,
                })
                setTitles(res.data)
            })
            .catch((err) => {
                console.log(err)
                ToastAndroid.show('获取饮食圈主题失败', ToastAndroid.SHORT)
            })
    }

    //获取饮食记录的
    const getDietRecord = () => {
        getRecordMemoryApi(userInfo.id as number)
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('获取饮食记录失败', ToastAndroid.SHORT)
                    return
                }
                setRecordNumber(res.data)
            })
            .catch((err) => {
                console.log(err)
                ToastAndroid.show('获取饮食记录失败', ToastAndroid.SHORT)
            })
    }

    const getId = useCallback((id: number) => {
        setTopicId(id)
    }, [])

    useEffect(() => {
        onRefresh()
    }, [])

    useEffect(() => {
        getCommunicateContent()
    }, [topicId])
    return (
        <Container>
            <Animated.ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={theme.colors.deep01Primary}
                        title={refreshing ? '刷新中...' : '下拉刷新'}
                    />
                }
                showsVerticalScrollIndicator={false}
                style={styles.container}
                onScroll={
                    Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: { y: scrollY },
                                }, // 记录滑动距离
                            },
                        ],
                        { useNativeDriver: true },
                    ) // 使用原生动画驱动
                }
                scrollEventThrottle={1}
            >
                {/* 标题 */}
                <CommunicateHeader recordNumber={recordNumber} />
                {/* 饮食圈广场 */}
                <StickyHeader
                    stickyHeaderY={headHeight}
                    stickyScrollY={scrollY}
                    titles={titles}
                    getId={getId}
                />
                {/* 广场内容 */}
                <View style={{ marginTop: 15, flex: 1 }}>
                    <CommunicateList communicate={communicate} />
                </View>
            </Animated.ScrollView>
        </Container >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
})
