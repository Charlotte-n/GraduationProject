import type { GroupInfoType } from '@/apis/types'
import AutoText from '@/common/components/AutoText'
import Avatar from '@/components/mine/avatar'
import { useLoginRegisterStore } from '@/store'
import { Icon } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { memo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

const GroupInfo = ({ groupDetail }: { groupDetail: GroupInfoType }) => {
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const router = useRouter()

    const goBack = () => {
        router.back()
    }

    const goRanking = () => {
        router.navigate(
            `/more-cpages/group/c-pages/ranking?id=${groupDetail.id}`,
        )
    }

    const goMemberManagement = () => {
        router.navigate(
            `/more-cpages/group/c-pages/member-manage?id=${groupDetail.id}`,
        )
    }
    return (
        <>
            <View style={styles.groupDailyContainer}>
                <TouchableOpacity
                    onPress={goBack}
                    style={styles.groupDailyBack}
                >
                    <Icon
                        color={'white'}
                        type={'antdesign'}
                        name={'arrow-left'}
                        size={30}
                    />
                </TouchableOpacity>
                <View style={styles.groupDailyTitle}>
                    <Avatar
                        showIcon={false}
                        avatarStyle={styles.groupDailyAvatar}
                        name={groupDetail.groupName}
                        textStyle={{
                            display: 'none',
                        }}
                    />
                    <View>
                        {groupDetail.groupName && (
                            <AutoText
                                fontSize={5}
                                style={{
                                    marginBottom: 10,
                                    color: 'white',
                                }}
                            >
                                {groupDetail.groupName}
                            </AutoText>
                        )}
                        <AutoText
                            fontSize={4}
                            style={{
                                color: 'white',
                            }}
                        >
                            {groupDetail.introduce}
                        </AutoText>
                    </View>
                </View>
                {/* 打卡率 */}
                <View style={styles.groupDailyRate}>
                    <AutoText
                        fontSize={4.5}
                        style={{
                            marginRight: 10,
                            color: 'white',
                        }}
                    >
                        打卡率
                        {((groupDetail.rate as number) * 100).toFixed(1)}%
                    </AutoText>
                    <AutoText
                        fontSize={4.5}
                        style={{
                            color: 'white',
                        }}
                    >
                        成员数{groupDetail.curNum}
                    </AutoText>
                </View>
                {/* 排行榜 */}
                <View style={styles.groupRanking}>
                    <TouchableOpacity
                        onPress={goRanking}
                        style={styles.groupRankingButton}
                    >
                        <AutoText
                            fontSize={4}
                            style={{
                                color: 'white',
                            }}
                        >
                            排行榜
                        </AutoText>
                    </TouchableOpacity>
                    {/* 群主权限 */}
                    {groupDetail.ownerId === userInfo.id && (
                        <TouchableOpacity
                            onPress={goMemberManagement}
                            style={styles.groupMemberManagementButton}
                        >
                            <AutoText
                                fontSize={4}
                                style={{
                                    color: 'white',
                                }}
                            >
                                成员管理
                            </AutoText>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    groupDailyContainer: {
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    groupDailyBack: {
        borderRadius: 100,
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupDailyTitle: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    groupDailyRate: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    groupRanking: {
        flexDirection: 'row',
    },
    groupRankingButton: {
        paddingHorizontal: 5,
        borderWidth: 1,
        borderRadius: 20,
        marginRight: 10,
        borderColor: 'white',
    },
    groupMemberManagementButton: {
        paddingHorizontal: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'white',
    },
    groupDailyAvatar: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
})

export default memo(GroupInfo)
