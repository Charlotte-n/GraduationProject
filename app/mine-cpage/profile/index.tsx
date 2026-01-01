import { getUserInfo, updateUserName } from '@/apis'
import { screenHeight } from '@/common/common'
import MyBottomSheet from '@/common/components/my-bottom-sheet'
import Avatar from '@/components/mine/avatar'
import ProfileList from '@/components/mine/cpages/profile-list'
import { useLoginRegisterStore } from '@/store'
import { useEffect, useRef, useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    TextInput,
    ToastAndroid,
    View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Profile() {
    const [Id, setId] = useState('')
    const insets = useSafeAreaInsets()
    const [isVisible, setIsVisible] = useState(false)
    const userInfo = useLoginRegisterStore((state) => state.userInfo)

    const username = useRef('')

    const handleVisible = (value: boolean) => {
        setIsVisible(value)
    }

    const feedBack = (id: string) => {
        //拿着这个值来进行请求数据来反映数据
        const updateUsername = () => {
            updateUserName({
                username: username.current,
                id: userInfo.id as number,
            })
                .then(async (res) => {
                    if (res.code === 1) {
                        try {
                            const res = await getUserInfo(userInfo.id as number)
                            if (res.code === 1 || res.data) {
                                //重新获取用户信息
                                useLoginRegisterStore
                                    .getState()
                                    ?.setUserInfo?.(res.data.user)
                                ToastAndroid.show(
                                    '修改成功',
                                    ToastAndroid.SHORT,
                                )
                                // 关闭弹窗
                                return
                            }
                            ToastAndroid.show('修改失败', ToastAndroid.SHORT)
                        } catch (e) {
                            ToastAndroid.show(
                                '获取用户信息失败',
                                ToastAndroid.SHORT,
                            )
                            console.log(e)
                        }
                    }
                    ToastAndroid.show('修改失败', ToastAndroid.SHORT)
                })
                .catch((error: any) => {
                    console.log('出错了', error)
                    ToastAndroid.show('修改失败', ToastAndroid.SHORT)
                })
                .finally(() => {
                    bottomSheetRef.current?.handleVisible?.(false)
                })
        }

        switch (id) {
            case '0':
                return (
                    <MyBottomSheet
                        isVisible={isVisible}
                        title={'修改用户名'}
                        isShowDriver={true}
                        isShowBottomButton={true}
                        handleConfirm={() => {
                            // 更新用户名
                            updateUsername()
                        }}
                        handleVisible={handleVisible}
                    >
                        <TextInput
                            placeholder="请输入用户名"
                            defaultValue={userInfo?.username || ''}
                            style={{
                                borderWidth: 1,
                                borderColor: '#BFBFBF',
                            }}
                            onChangeText={(text) => {
                                username.current = text
                            }}
                        ></TextInput>
                    </MyBottomSheet>
                )
        }
    }

    useEffect(() => {
        getUserInfo(userInfo.id as number)
            .then((res) => {
                if (res.code === 1 || res.data) {
                    useLoginRegisterStore
                        .getState()
                        ?.setUserInfo?.(res.data.user)
                }
            })
            .catch((error: any) => {
                ToastAndroid.show('获取用户信息失败', ToastAndroid.SHORT)
                console.log('出错了', error)
            })
    }, [])

    return (
        <ScrollView style={styles.container}>
            <View style={{ height: insets.top }}></View>
            <View style={styles.avatarContainer}>
                {/*  头像 */}
                <Avatar />
            </View>
            {/* 具体内容 */}
            <ProfileList getId={setId} set={() => handleVisible(true)} />
            {Id && feedBack(Id)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: screenHeight,
        paddingHorizontal: 40,
        paddingTop: 4,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        borderColor: '#F1F3F4',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        justifyContent: 'space-between',
    },
    avatarText: {
        fontSize: 15,
        fontWeight: '300',
        flex: 1,
    },
})
