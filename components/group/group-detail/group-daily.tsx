import { getClockContentApi } from '@/apis'
import type { ClockContentType, GroupInfoType } from '@/apis/types'
import { windowWidth } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import Empty from '@/components/diet/c-pages/search/empty'

import Avatar from '@/components/mine/avatar'
import { Card } from '@rneui/themed'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { memo, useEffect, useState } from 'react'
import {
    Image,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'

const GroupDaily = ({
    groupDetail,
    showSetting,
}: {
    groupDetail: GroupInfoType
    showSetting: () => void
}) => {
    const router = useRouter()
    const { id, time } = useLocalSearchParams()

    const [ClockContent, setClockContent] = useState<ClockContentType>([])

    const goCalendar = () => {
        router.navigate(
            `/more-cpages/group/c-pages/calendar?id=${id}&name=${groupDetail.groupName}`,
        )
    }

    // 获取打卡内容
    const getClockContent = () => {
        getClockContentApi(Number(id))
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('获取打卡内容失败', ToastAndroid.SHORT)
                    return
                }
                res.data = res.data?.map((item) => {
                    if (item.image) {
                        item.image = (item.image as string).split('|')
                        item.image.pop()
                    }
                    return item
                })
                setClockContent(res.data)
            })
            .catch((err) => {
                console.log(err)
                ToastAndroid.show('获取打卡内容失败', ToastAndroid.SHORT)
            })
    }

    useEffect(() => {
        getClockContent()
    }, [])

    return (
        <Card containerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <AutoText
                    fontSize={4.5}
                    style={{
                        flex: 1,
                    }}
                >
                    {groupDetail.groupName || ''}
                </AutoText>
                <View style={styles.titleRightContainer}>
                    <TouchableOpacity
                        style={styles.calendarButton}
                        onPress={goCalendar}
                    >
                        <Image
                            style={{
                                height: 16,
                                width: 16,
                            }}
                            source={require('@/assets/icon/rili.png')}
                        />
                        <AutoText
                            fontSize={4.5}
                            style={{
                                marginRight: 10,
                            }}
                        >
                            日历
                        </AutoText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.settingButton}
                        onPress={showSetting}
                    >
                        <Image
                            style={{
                                width: 16,
                                height: 16,
                            }}
                            source={require('@/assets/icon/setting.png')}
                        ></Image>
                        <AutoText fontSize={4.5}>设置</AutoText>
                    </TouchableOpacity>
                </View>
            </View>
            {/* 打卡内容 */}
            {ClockContent.length > 0 ? (
                ClockContent.map((item) => {
                    return (
                        <View
                            style={styles.clockContentContainer}
                            key={item.id}
                        >
                            <View style={styles.clockContentTitleContainer}>
                                <View style={styles.clockContentTitle}>
                                    <Avatar
                                        showIcon={false}
                                        avatarUrl={item.avatar}
                                        avatarStyle={{
                                            width: 30,
                                            height: 30,
                                            borderRadius: 15,
                                        }}
                                        name={item.username}
                                        textStyle={{
                                            display: 'none',
                                        }}
                                    />
                                    <AutoText fontSize={5}>
                                        {item.username}
                                    </AutoText>
                                </View>
                                {/* 内容 */}
                                <View style={styles.clockContentContent}>
                                    {item.content && (
                                        <AutoText>{item.content}</AutoText>
                                    )}

                                    {/* 图片 */}
                                    <View
                                        style={
                                            styles.clockContentImageContainer
                                        }
                                    >
                                        {item.image &&
                                            item.image.length > 0 &&
                                            (item.image as string[]).map(
                                                (image, index) => {
                                                    return (
                                                        <Image
                                                            style={
                                                                styles.clockContentImage
                                                            }
                                                            key={index}
                                                            source={{
                                                                uri: image,
                                                            }}
                                                        />
                                                    )
                                                },
                                            )}
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })
            ) : (
                <Empty text="暂无打卡内容, 成为第一个打卡的人吧" />
            )}
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: '100%',
        height: '100%',
        marginHorizontal: 0,
        backgroundColor: '#F7F7F7',
        borderTopLeftRadius: 20,
        marginVertical: 0,
        borderTopRightRadius: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    titleRightContainer: {
        flexDirection: 'row',
    },
    calendarButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    clockContentContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    clockContentTitleContainer: {
        width: windowWidth - 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        //阴影
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    clockContentTitle: {
        flexDirection: 'row',
    },
    clockContentContent: {
        paddingHorizontal: 10,
    },
    clockContentImageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    clockContentImage: {
        height: 100,
        width: 90,
        borderRadius: 20,
        marginRight: 20,
        marginBottom: 10,
    },
})

export default memo(GroupDaily)
