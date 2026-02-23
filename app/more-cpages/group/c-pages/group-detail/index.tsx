import {
    DeleteGroupNumberApi,
    getThreeGroupApi,
    GroupDetailApi,
    JoinGroupByCodeApi,
} from '@/apis'
import { GroupInfoType } from '@/apis/types'
import { windowWidth } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import Container from '@/common/components/container'
import GroupDaily from '@/components/group/group-detail/group-daily'
import GroupInfo from '@/components/group/group-detail/group-info'
import { useGroupStore, useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { BottomSheet, Button } from '@rneui/themed'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'

export default function GroupDetailPage() {
    const [groupDetail, setGroupDetail] = useState<GroupInfoType>(
        {} as GroupInfoType,
    )
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const { setRateTopThree } = useGroupStore.getState()
    const { id } = useLocalSearchParams()
    const [isJoin, setIsJoin] = useState(false)
    const [showBottomSheet, setShowBottomSheet] = useState(false)
    const router = useRouter()

    const bottomConfig = [
        {
            title: groupDetail.isInner ? '退出小组' : '加入小组',
            onPress: () => disBottom(),
            containerStyle: {
                borderBottomWidth: 0.2,
                borderColor: '#cccccc',
                paddingVertical: 10,
                backgroundColor: 'white',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
            },
        },
        {
            title: '取消',
            onPress: () => {
                setShowBottomSheet(false)
            },
            containerStyle: {
                paddingVertical: 10,
                backgroundColor: 'white',
            },
        },
    ] as const

    const renderBottomSheet = useCallback(
        (
            bottomConfigData: typeof bottomConfig,
            showBottomSheet: boolean,
            setShowBottomSheet: (show: boolean) => void,
        ) => {
            return (
                <BottomSheet
                    isVisible={showBottomSheet}
                    onBackdropPress={() => setShowBottomSheet(false)}
                >
                    {bottomConfigData.length > 0 &&
                        bottomConfigData.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={item.containerStyle}
                                    onPress={item.onPress}
                                >
                                    <AutoText style={{ textAlign: 'center' }}>
                                        {item.title}
                                    </AutoText>
                                </TouchableOpacity>
                            )
                        })}
                </BottomSheet>
            )
        },
        [bottomConfig, showBottomSheet],
    )

    // 小组详情
    const getGroupDetail = () => {
        GroupDetailApi(Number(id), userInfo?.id as number)
            .then((res) => {
                if (!res.data) {
                    setGroupDetail({} as GroupInfoType)
                    return
                }
                setGroupDetail(res.data)
                setIsJoin(!!res.data.isInner)
            })
            .catch((err) => {
                ToastAndroid.show('获取小组详情失败', ToastAndroid.SHORT)
            })
    }

    const showSetting = () => {
        setShowBottomSheet(true)
    }

    const clockIn = () => {
        router.navigate(`/more-cpages/group/c-pages/clock?id=${id}`)
    }

    const joinGroup = () => {
        JoinGroupByCodeApi(userInfo?.id as number, groupDetail.codeInfo)
            .then((res) => {
                if (res.code !== 1) {
                    ToastAndroid.show('加入小组失败', ToastAndroid.SHORT)
                    return
                }
                getRateTopThree()
                Alert.alert('加入小组成功')
                getGroupDetail()
            })
            .catch((err) => {
                ToastAndroid.show('加入小组失败', ToastAndroid.SHORT)
            })
    }

    // 获取打卡率前三
    const getRateTopThree = () => {
        getThreeGroupApi(userInfo?.id as number)
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('获取打卡率前三失败', ToastAndroid.SHORT)
                    return
                }
                setRateTopThree(res.data)
            })
            .catch((err) => {
                ToastAndroid.show('获取打卡率前三失败', ToastAndroid.SHORT)
            })
    }

    const deleteGroup = () => {
        DeleteGroupNumberApi(userInfo?.id as number, Number(id))
            .then((res) => {
                if (res.code !== 1) {
                    ToastAndroid.show('退出小组失败', ToastAndroid.SHORT)
                    return
                }
                // 获取前三小组信息
                getRateTopThree()
                ToastAndroid.show('退出小组成功', ToastAndroid.SHORT)
            })
            .catch((err) => {
                ToastAndroid.show('退出小组失败', ToastAndroid.SHORT)
            })
    }

    const disBottom = () => {
        if (isJoin) {
            Alert.alert('确定退出小组吗？', '退出小组后将无法再加入小组', [
                {
                    text: '确定',
                    onPress: () => {
                        deleteGroup()
                    },
                },
                {
                    text: '取消',
                    onPress: () => {
                        setShowBottomSheet(false)
                    },
                },
            ])
        } else {
            joinGroup()
        }
        getGroupDetail()
        setShowBottomSheet(false)
    }

    useEffect(() => {
        getGroupDetail()
    }, [])

    return (
        <Container>
            <View style={styles.container}>
                {/* 小组信息 */}
                <View>
                    <View style={styles.groupInfo}>
                        <Image
                            source={
                                groupDetail.avatar
                                    ? { uri: groupDetail.avatar }
                                    : require('@/assets/images/bg_login_header.png')
                            }
                            style={styles.groupInfoImage}
                            blurRadius={50}
                        />
                        <View style={styles.groupInfoContent}></View>
                    </View>
                    <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false} style={styles.groupContentContainer}>
                        <GroupInfo groupDetail={groupDetail} />
                        {/* 小组打卡内容 */}
                        <GroupDaily
                            groupDetail={groupDetail}
                            showSetting={showSetting}
                        />
                    </ScrollView>
                </View>
                {/* 固定按钮 */}
                <View style={styles.fixedButtonContainer}>
                    <Button
                        onPress={() => (isJoin ? clockIn() : joinGroup())}
                        title={isJoin ? '打卡' : '加入'}
                        containerStyle={styles.fixedButton}
                        color={theme.colors.deep01Primary}
                    />
                </View>

                {/* 底部显示 */}
                {renderBottomSheet(
                    bottomConfig,
                    showBottomSheet,
                    setShowBottomSheet,
                )}
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7f7',
    },
    groupInfo: {
        position: 'relative',
    },
    groupInfoImage: {
        height: 250,
        position: 'relative',
        top: 0,
        left: 0,
    },
    groupInfoContent: {
        backgroundColor: 'black',
        height: 250,
        position: 'relative',
        top: -300,
        opacity: 0.3,
    },
    groupContentContainer: {
        position: 'relative',
        top: -500,
        left: 0,
    },
    fixedButtonContainer: {
        position: 'relative',
        top: -20,
        alignItems: 'center',
    },
    fixedButton: {
        width: windowWidth / 2,
        borderRadius: 30,
    },
})
