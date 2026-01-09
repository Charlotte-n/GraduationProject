import { getCategoryGroupsApi, JoinGroupByCodeApi } from '@/apis'
import { GroupInfoType } from '@/apis/types'
import AutoText from '@/common/components/AutoText'
import Container from '@/common/components/container'
import Avatar from '@/components/mine/avatar'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { Button } from '@rneui/themed'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
    Alert,
    ScrollView,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'

export default function MoreGroupPage() {
    const [groups, setGroups] = useState<GroupInfoType[]>([])
    const router = useRouter()
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const { category } = useLocalSearchParams()

    const gotoGroupDetail = (id: number) => {
        router.navigate(`/more-cpages/group/c-pages/group-detail?id=${id}`)
    }

    const getCategoryGroup = () => {
        getCategoryGroupsApi(category as string)
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('获取小组失败', ToastAndroid.SHORT)
                    return
                }
                const result = res.data.map((item) => {
                    item.createTime = (
                        item.createTime.slice(0, 3) as number[]
                    ).join('-')
                    return item
                })
                setGroups(result as unknown as GroupInfoType[])
            })
            .catch((err) => {
                ToastAndroid.show('获取小组失败', ToastAndroid.SHORT)
            })
    }

    const joinGroup = (id: number, codeInfo: string) => {
        JoinGroupByCodeApi(userInfo?.id as number, codeInfo)
            .then((res) => {
                if (res.code !== 1) {
                    ToastAndroid.show('加入小组失败', ToastAndroid.SHORT)
                    return
                }
                getCategoryGroup()
                Alert.alert('加入小组成功')
            })
            .catch((err) => {
                ToastAndroid.show('加入小组失败', ToastAndroid.SHORT)
            })
    }

    useEffect(() => {
        getCategoryGroup()
    }, [])

    return (
        <Container>
            <ScrollView style={styles.container}>
                {groups.length > 0 &&
                    groups.map((group) => {
                        return (
                            <TouchableOpacity
                                style={styles.groupItemContainer}
                                key={group.id}
                                onPress={() => gotoGroupDetail(group.id)}
                            >
                                <View style={styles.groupInfo}>
                                    <Avatar
                                        showIcon={false}
                                        avatarUrl={group.avatar}
                                        avatarStyle={styles.groupAvatar}
                                    />
                                    <View>
                                        <AutoText
                                            style={{
                                                marginBottom: 15,
                                            }}
                                        >
                                            {group.groupName} {group.createTime}
                                        </AutoText>
                                        <AutoText>{group.introduce}</AutoText>
                                    </View>
                                </View>
                                <View>
                                    <Button
                                        color={'white'}
                                        title="加入"
                                        containerStyle={{
                                            borderRadius: 20,
                                            width: 70,
                                            height: 30,
                                            borderWidth: 1,
                                            borderColor:
                                                theme.colors.deep01Primary,
                                        }}
                                        titleStyle={{
                                            color: theme.colors.deep01Primary,
                                            fontSize: 10,
                                            lineHeight: 10,
                                        }}
                                        onPress={() => {
                                            joinGroup(group.id, group.codeInfo)
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        )
                    })}
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    groupItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    groupInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupAvatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginRight: 20,
    },
})
