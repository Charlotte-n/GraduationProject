import { DeleteGroupNumberApi, showMemberRankingApi } from '@/apis'
import {
    RankingMemberBody,
    RankingType,
    SingleRankingMemberType,
} from '@/apis/types'
import AutoText from '@/common/components/AutoText'
import Container from '@/common/components/container'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { useLocalSearchParams } from 'expo-router'
import { memo, useEffect, useState } from 'react'
import {
    Alert,
    Image,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

const renderItem = ({
    data,
    index,
}: {
    data: SingleRankingMemberType
    index: number
}) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemContent}>
                <AutoText
                    style={{
                        marginRight: 10,
                    }}
                >
                    {index + 1}
                </AutoText>
                <Image
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        marginRight: 10,
                    }}
                    source={{ uri: data.avatar }}
                />
                <AutoText>{data.username}</AutoText>
            </View>
            <View>
                <AutoText>{(data.rate * 100).toFixed(1)}%</AutoText>
            </View>
        </View>
    )
}

const renderHiddenItem = ({
    rowMap,
    rowKey,
    id,
    getMemberList,
}: {
    rowMap: any
    rowKey: number
    id: number
    getMemberList: () => void
}) => {
    const deleteRow = (rowMap: any, rowKey: number) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow()
        }

        DeleteGroupNumberApi(rowKey, id)
            .then((res) => {
                if (res.code !== 0) {
                    ToastAndroid.show('删除失败', ToastAndroid.SHORT)
                    return
                }
                getMemberList()
                ToastAndroid.showWithGravity(
                    '删除成功',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                )
            })
            .catch((err) => {
                ToastAndroid.show('删除失败,接口错误', ToastAndroid.SHORT)
            })
    }

    const deleteMember = (rowMap: any, rowKey: number) => {
        rowMap[rowKey].closeRow()
        Alert.alert('删除成员', '是否要删除该成员', [
            {
                text: '取消',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: '确定',
                onPress: () => {
                    deleteRow(rowMap, rowKey)
                },
            },
        ])
    }

    return (
        <TouchableOpacity
            style={styles.hiddenItemContainer}
            onPress={() => deleteMember(rowMap, rowKey)}
        >
            <View
                style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    backgroundColor: 'red',
                }}
            >
                <AutoText
                    style={{
                        color: 'white',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    删除
                </AutoText>
            </View>
        </TouchableOpacity>
    )
}

const MemberManagePage = () => {
    const [memberList, setMemberList] = useState<RankingType>([])
    const { id } = useLocalSearchParams()
    const userInfo = useLoginRegisterStore((state) => state.userInfo)

    const getMemberList = () => {
        const body: RankingMemberBody = {
            pageNum: 50,
            pageSize: 1,
            groupId: Number(id),
            userId: userInfo.id as number,
        }
        showMemberRankingApi(body)
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('获取成员列表失败', ToastAndroid.SHORT)
                    return
                }
                setMemberList(res.data)
            })
            .catch((err) => {
                ToastAndroid.show(
                    '获取成员列表失败,接口错误',
                    ToastAndroid.SHORT,
                )
            })
    }

    useEffect(() => {
        getMemberList()
    }, [])

    return (
        <>
            <Container>
                <SwipeListView
                    style={styles.container}
                    keyExtractor={(item: SingleRankingMemberType) =>
                        String(item.id)
                    }
                    data={memberList}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    disableRightSwipe={true}
                    renderItem={({ item, index }) =>
                        renderItem({ data: item, index })
                    }
                    renderHiddenItem={(data, rowMap) =>
                        renderHiddenItem({
                            rowMap,
                            rowKey: Number(data.item.id),
                            id: Number(id),
                            getMemberList: getMemberList,
                        })
                    }
                />
            </Container>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    itemContainer: {
        paddingBottom: 10,
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    itemContent: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    hiddenItemContainer: {
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
        height: '100%',
        width: 75,
    },
})

export default memo(MemberManagePage)
