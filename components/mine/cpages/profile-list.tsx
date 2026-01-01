import { useLoginRegisterStore } from '@/store'
import { Icon } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { Fragment, useState } from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

interface ProfileListProps {
    getId: (id: string) => void
    set: () => void
}

const Item = ({
    left,
    right,
    id,
    handlePress,
}: {
    left: string
    right: React.ReactNode | string
    id: string
    handlePress?: () => void
}) => {
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={itemStyles.container}>
                <Text style={{ fontSize: 15, fontWeight: '300', flex: 1 }}>
                    {left}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: '300' }}>{right}</Text>
                {!(id === '3') && (
                    <Icon
                        name={'right'}
                        type={'antdesign'}
                        size={14}
                        color={'#888888'}
                        style={{
                            marginLeft: 10,
                        }}
                    ></Icon>
                )}
            </View>
        </TouchableOpacity>
    )
}

const itemStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 25,
        borderColor: '#F1F3F4',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
})
export default function ProfileList({ getId, set }: ProfileListProps) {
    const username = useLoginRegisterStore((state) => state.userInfo.username)
    const [Id, setId] = useState('')
    const router = useRouter()

    const profileData = [
        {
            id: '0',
            left: '用户名',
            right: username,
            handlePress: () => {
                setId('0')
                getId('0')
                set()
            },
        },
        //TODO:有时间就去弄
        // {
        //     id: '1',
        //     left: '绑定手机',
        //     right: '13383024736',
        // },
        {
            id: '2',
            left: '绑定邮箱',
            right: '已绑定',
        },
        {
            id: '3',
            left: '用户协议',
            right: (
                <Icon
                    name={'right'}
                    type={'antdesign'}
                    size={14}
                    color={'#888888'}
                ></Icon>
            ),
            handlePress: () => {
                // 跳转到用户协议
                router.navigate('/mine-cpage/profile/c-pages/user-agree')
            },
        },
    ]

    return (
        <Fragment>
            <FlatList
                data={profileData}
                scrollEnabled={false}
                renderItem={({ item }) => <Item {...item} />}
            />
        </Fragment>
    )
}
