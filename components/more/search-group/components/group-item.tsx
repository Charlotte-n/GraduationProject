import { JoinGroupByCodeApi } from '@/apis'
import { GroupInfoType } from '@/apis/types'
import AutoText from '@/common/components/AutoText'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { Button } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { memo } from 'react'
import {
    Alert,
    Image,
    ImageStyle,
    StyleProp,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native'

const GroupItem = ({
    groupItem,
    showRateOther = true,
    showButton = true,
    stylesGroup = {},
    updateGroupList,
}: {
    groupItem: GroupInfoType
    showRateOther?: boolean
    showButton?: boolean
    stylesGroup?: {
        groupItemStyle?: StyleProp<ViewStyle>
        containerStyle?: StyleProp<ViewStyle>
        ImageStyles?: StyleProp<ImageStyle>
    }
    updateGroupList: () => void
}) => {
    const router = useRouter()
    const userInfo = useLoginRegisterStore((state) => state.userInfo)

    const gotoGroupDetailHome = (id: number) => {
        router.navigate(`/more-cpages/group/c-pages/group-detail?id=${id}`)
    }
    const JoinGroup = (codeInfo: string) => {
        JoinGroupByCodeApi(userInfo?.id as number, codeInfo)
            .then((res) => {
                if (res.code !== 1) {
                    ToastAndroid.show('加入小组失败', ToastAndroid.SHORT)
                    return
                }
                Alert.alert('加入小组成功')
                updateGroupList()
            })
            .catch((err) => {
                ToastAndroid.show('加入小组失败', ToastAndroid.SHORT)
            })
    }
    return (
        <>
            <TouchableOpacity
                style={[styles.container, stylesGroup.containerStyle]}
                key={groupItem.id}
                onPress={() => gotoGroupDetailHome(groupItem.id)}
            >
                <View
                    style={[
                        styles.groupInfoContainer,
                        stylesGroup.groupItemStyle,
                    ]}
                >
                    <Image
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 10,
                            marginRight: 15,
                            ...(stylesGroup.ImageStyles as ImageStyle),
                        }}
                        source={
                            groupItem.avatar
                                ? { uri: groupItem.avatar }
                                : require('@/assets/images/bg_login_header.png')
                        }
                    ></Image>

                    <View>
                        {groupItem.groupName && (
                            <AutoText
                                numberOfLines={1}
                                style={{
                                    marginBottom: 8,
                                }}
                                fontSize={4}
                            >
                                {groupItem.groupName}
                            </AutoText>
                        )}

                        {showRateOther && (
                            <>
                                <View style={styles.groupInfoRightContainer}>
                                    {groupItem.rate && (
                                        <AutoText
                                            fontSize={3.5}
                                            style={{
                                                marginRight: 10,
                                                backgroundColor:
                                                    theme.colors.secondary,
                                                paddingHorizontal: 2,
                                                borderRadius: 3,
                                            }}
                                        >
                                            打卡率{' '}
                                            {(groupItem.rate * 100)?.toFixed(1)}
                                            %
                                        </AutoText>
                                    )}
                                    {groupItem.curNum && (
                                        <AutoText
                                            fontSize={3.5}
                                            style={{
                                                backgroundColor:
                                                    theme.colors.secondary,
                                                paddingHorizontal: 2,
                                                borderRadius: 3,
                                            }}
                                        >
                                            成员数 {groupItem.curNum}
                                        </AutoText>
                                    )}
                                </View>
                                <AutoText
                                    fontSize={3.5}
                                    style={{
                                        marginTop: 5,
                                        color: '#cccccc',
                                    }}
                                >
                                    {groupItem.introduce}
                                </AutoText>
                            </>
                        )}
                    </View>
                </View>

                {showButton && (
                    <View style={{ height: 25, width: 60 }}>
                        <Button
                            onPress={() => {
                                groupItem.isInner
                                    ? gotoGroupDetailHome(groupItem.id)
                                    : JoinGroup(groupItem.codeInfo)
                            }}
                            title={groupItem.isInner ? '进入' : '加入'}
                            containerStyle={{
                                borderRadius: 20,
                                borderColor: theme.colors.deep01Primary,
                                borderWidth: 1,
                                height: 25,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            titleStyle={{
                                fontSize: 10,
                                color: theme.colors.deep01Primary,
                                height: 15,
                            }}
                            buttonStyle={{
                                backgroundColor: 'white',
                                borderColor: theme.colors.deep01Primary,
                            }}
                        ></Button>
                    </View>
                )}
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
    },
    groupInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupInfoRightContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
})

export default memo(GroupItem)
