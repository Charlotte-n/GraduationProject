import { JoinGroupByCodeApi, searchGroupApi } from '@/apis'
import { GroupInfoType } from '@/apis/types'
import { windowWidth } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import Container from '@/common/components/container'
import Empty from '@/components/diet/c-pages/search/empty'
import Avatar from '@/components/mine/avatar'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { Button } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'

export default function SearchPage() {
    const searchTitle = useRef<string>('')
    const [searchGroupInfo, setSearchGroupInfo] = useState<GroupInfoType[]>([])
    const router = useRouter()
    const userInfo = useLoginRegisterStore((state) => state.userInfo)


    const handleChangeSearchTitle = (text: string) => {
        searchTitle.current = text
    }

    const searchGroup = () => {
        searchGroupApi(searchTitle.current, userInfo?.id as number)
            .then((res) => {
                if (!res.data) {
                    setSearchGroupInfo([])
                    return
                }
                setSearchGroupInfo(res.data)
            })
            .catch((err) => {
                ToastAndroid.show('搜索失败', ToastAndroid.SHORT)
            })
    }

    const JoinGroup = (code: string) => {
        JoinGroupByCodeApi(userInfo?.id as number, code)
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('加入失败', ToastAndroid.SHORT)
                    return
                }
                ToastAndroid.show('加入成功', ToastAndroid.SHORT)
            })
            .catch((err) => {
                ToastAndroid.show('加入失败', ToastAndroid.SHORT)
            })
    }

    const goGroupDetail = (id: number) => {
        router.navigate(`/more-cpages/group/c-pages/group-detail?id=${id}`)
    }

    return (
        <Container>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TextInput
                        style={styles.searchInput}
                        defaultValue={searchTitle.current}
                        onChangeText={handleChangeSearchTitle}
                        placeholder="搜索小组"
                        placeholderTextColor="#cccccc"
                    />
                    <Button
                        title={'搜索'}
                        onPress={searchGroup}
                        titleStyle={styles.searchButtonTitle}
                        containerStyle={styles.searchButtonContainer}
                        buttonStyle={styles.searchButtonStyle}
                        color={'white'}
                    />
                </View>
                {/* 搜索结果 */}
                <View style={styles.searchResult}>
                    {searchGroupInfo.length > 0 &&
                        searchGroupInfo.map((item) => {
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => goGroupDetail(item.id)}
                                    style={styles.searchResultItem}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Avatar
                                            avatarUrl={item.avatar}
                                            name={item.groupName}
                                            avatarStyle={
                                                styles.searchResultItemAvatar
                                            }
                                            textStyle={{
                                                marginRight: 4,
                                                fontSize: 15,
                                                display: 'none',
                                            }}
                                            showIcon={false}
                                        />
                                        <View>
                                            {item.groupName && (
                                                <AutoText
                                                    numberOfLines={1}
                                                    style={{
                                                        width: 150,
                                                    }}
                                                    fontSize={4}
                                                >
                                                    {item.groupName}
                                                </AutoText>
                                            )}
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    marginTop: 5,
                                                }}
                                            >
                                                {item.rate && (
                                                    <AutoText
                                                        fontSize={3.5}
                                                        style={{
                                                            marginRight: 10,
                                                            backgroundColor:
                                                                theme.colors
                                                                    .secondary,
                                                            paddingHorizontal: 2,
                                                            borderRadius: 3,
                                                        }}
                                                    >
                                                        打卡率
                                                        {(
                                                            item.rate * 100
                                                        ).toFixed(1)}{' '}
                                                        %
                                                    </AutoText>
                                                )}
                                                {item.curNum && (
                                                    <AutoText
                                                        fontSize={3.5}
                                                        style={{
                                                            width: 150 / 2.5,
                                                            backgroundColor:
                                                                theme.colors
                                                                    .secondary,
                                                            paddingHorizontal: 2,
                                                            borderRadius: 3,
                                                        }}
                                                    >
                                                        成员数 {item.curNum}
                                                    </AutoText>
                                                )}
                                            </View>
                                            {item.introduce && (
                                                <AutoText
                                                    fontSize={3.5}
                                                    style={{
                                                        marginTop: 5,
                                                        color: '#cccccc',
                                                    }}
                                                >
                                                    {item.introduce}
                                                </AutoText>
                                            )}
                                        </View>
                                    </View>

                                    {/* 进入 / 加入 */}
                                    <View style={{ height: 25, width: 60 }}>
                                        <Button
                                            onPress={() =>
                                                item.isInner
                                                    ? goGroupDetail(item.id)
                                                    : () =>
                                                        JoinGroup(
                                                            item.codeInfo,
                                                        )
                                            }
                                            title={
                                                item.isInner ? '进入' : '加入'
                                            }
                                            containerStyle={{
                                                borderRadius: 20,
                                                borderColor:
                                                    theme.colors.deep01Primary,
                                                borderWidth: 1,
                                                height: 25,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                            titleStyle={{
                                                fontSize: 10,
                                                color: theme.colors
                                                    .deep01Primary,
                                                height: 15,
                                            }}
                                            buttonStyle={{
                                                backgroundColor: 'white',
                                                borderColor:
                                                    theme.colors.deep01Primary,
                                            }}
                                        ></Button>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    {searchGroupInfo.length === 0 && (
                        <Empty text="暂无搜索结果" />
                    )}
                </View>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    searchInput: {
        width: windowWidth / 1.5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#cccccc',
        borderRadius: 5,
        marginRight: 10,
        color: 'black',
    },
    searchButtonTitle: {
        fontSize: 15,
        height: 20,
        color: theme.colors.deep01Primary,
    },
    searchButtonContainer: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.deep01Primary,
    },
    searchButtonStyle: {
        width: 55,
        height: 30,
    },
    searchResult: {
        paddingHorizontal: 20,
    },
    searchResultItem: {
        flexDirection: 'row',
        marginBottom: 30,
        justifyContent: 'space-between',
    },
    searchResultItemAvatar: {
        height: 30,
        width: 30,
        borderRadius: 10,
        marginRight: 10,
    },
})
