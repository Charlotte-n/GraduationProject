import { showMemberRankingApi } from '@/apis'
import { RankingMemberBody, RankingType } from '@/apis/types'
import AutoText from '@/common/components/AutoText'
import Container from '@/common/components/container'
import Avatar from '@/components/mine/avatar'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, ToastAndroid, View } from 'react-native'

export default function RankingPage() {
    const [ranking, setRanking] = useState<RankingType>([])
    const { id } = useLocalSearchParams()
    const userInfo = useLoginRegisterStore((state) => state.userInfo)

    const getRanking = () => {
        const params: RankingMemberBody = {
            groupId: Number(id),
            pageNum: 0,
            pageSize: 50,
            userId: userInfo?.id as number,
        }
        showMemberRankingApi(params)
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('获取排行榜失败', ToastAndroid.SHORT)
                    return
                }
                setRanking(res.data)
            })
            .catch((err) => {
                ToastAndroid.show('获取排行榜失败', ToastAndroid.SHORT)
            })
    }

    useEffect(() => {
        getRanking()
    }, [])

    const rankingListHeader = useMemo(() => {
        return [
            {
                title: `排名榜`,
                key: 'total',
                style: {
                    backgroundColor: '#F1F1F1',
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: '#F1F1F1',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    textAlign: 'center',
                },
            },
            {
                title: '用户',
                key: 'today',
                style: {
                    backgroundColor: theme.colors.deep01Primary,
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: theme.colors.deep01Primary,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    color: 'white',
                    marginRight: 10,
                    textAlign: 'center',
                },
            },
            {
                title: '打卡率',
                key: 'clockTime',
                style: {
                    backgroundColor: theme.colors.deep01Primary,
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: theme.colors.deep01Primary,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    color: 'white',
                    textAlign: 'center',
                },
            },
        ]
    }, [ranking])

    const renderRankingListHeader = useCallback(() => {
        return (
            rankingListHeader.length > 0 &&
            rankingListHeader.map((item) => {
                return (
                    <AutoText fontSize={4} style={item.style}>
                        {item.title}
                    </AutoText>
                )
            })
        )
    }, [rankingListHeader])
    return (
        <Container>
            <View style={styles.container}>
                <View style={styles.header}>
                    <AutoText fontSize={7}>今日排行榜</AutoText>
                </View>
                {/* 排行榜列表header */}
                <View style={styles.rankingListHeader}>
                    {renderRankingListHeader && renderRankingListHeader()}
                </View>
                {/* 排行榜 */}
                <ScrollView style={styles.rankingList}>
                    {ranking.length > 0 &&
                        ranking.map((item, index) => {
                            return (
                                <View key={item.id} style={styles.rankingItem}>
                                    <View style={styles.rankingHeader}>
                                        <AutoText fontSize={6}>
                                            {index + 1}
                                        </AutoText>
                                    </View>
                                    <View style={styles.rankingUser}>
                                        <Avatar
                                            avatarUrl={item.avatar}
                                            avatarStyle={styles.rankingAvatar}
                                            name={item.username}
                                            textStyle={{
                                                marginLeft: 10,
                                                fontSize: 15,
                                                display: 'none',
                                            }}
                                            showIcon={false}
                                        />
                                        <AutoText fontSize={4}>
                                            {item.username}
                                        </AutoText>
                                    </View>
                                    <AutoText
                                        fontSize={4}
                                        style={{
                                            width: '33%',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {(item.rate * 100).toFixed(1)}%
                                    </AutoText>
                                </View>
                            )
                        })}
                </ScrollView>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#F7F7F7',
    },
    header: {
        alignItems: 'center',
        marginBottom: 10,
    },
    rankingListHeader: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    rankingList: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
        borderRadius: 10,
    },
    rankingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F1F1',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    rankingHeader: {
        flexDirection: 'row',
        width: '33%',
    },
    rankingAvatar: {
        width: 30,
        height: 30,
        borderRadius: 100,
        marginLeft: 10,
        marginRight: 5,
    },
    rankingUser: {
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
})
