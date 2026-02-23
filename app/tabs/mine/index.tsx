import { getUserInfo } from '@/apis'
import Avatar from '@/components/mine/avatar'
import UserItem from '@/components/mine/user-item'
import { DATA } from '@/constants/body'
import { useLoginRegisterStore } from '@/store'
import { Icon } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function MineScreen() {
    const router = useRouter()
    const { reset, userInfo, setUserInfo } = useLoginRegisterStore.getState()
    const insets = useSafeAreaInsets()
    const checkout = () => {
        Alert.alert('', '确定要退出登录吗', [
            {
                text: '取消',
                onPress: () => '',
                style: 'cancel',
            },
            {
                text: '确定',
                onPress: () => {
                    //清空数据栈跳转到登录页面
                    router.dismissTo('/login-register')
                    reset()
                },
            },
        ])
    }

    useEffect(() => {
        //获取用户的信息
        getUserInfo(userInfo.id!).then((res) => {
            setUserInfo(res.data.user)
        })
    }, [])
    return (
        <View style={styles.container}>
            <View style={{ height: insets.top }}></View>
            <View style={styles.avatarContainer}>
                <Avatar />
            </View>
            {/* list */}
            <View>
                <FlatList
                    scrollEnabled={false}
                    data={DATA}
                    renderItem={({ item }) => (
                        <UserItem title={item?.title} path={item?.path} />
                    )}
                    keyExtractor={(item) => item?.id}
                />
                <TouchableOpacity
                    onPress={() => checkout()}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: '#F1F3F4',
                    }}
                >
                    <Text style={{ fontSize: 15, fontWeight: '300', flex: 1 }}>
                        退出登录
                    </Text>
                    <Icon
                        name={'right'}
                        type={'antdesign'}
                        size={14}
                        color={'#888888'}
                    ></Icon>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 40,
        paddingTop: 20,
        flex: 1,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
})
