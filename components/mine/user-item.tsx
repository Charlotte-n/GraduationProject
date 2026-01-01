import { Icon, Text } from '@rneui/themed'
import { RelativePathString, useRouter } from 'expo-router'
import { memo } from 'react'
import { TouchableOpacity } from 'react-native'

interface UserItemProps {
    title: string
    path: string
}

const UserItem = (props: UserItemProps) => {
    const { title, path } = props
    const router = useRouter()

    const goTo = () => {
        router.navigate(path as RelativePathString)
    }
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#F1F3F4',
            }}
            onPress={goTo}
        >
            <Text style={{ fontSize: 15, fontWeight: '300', flex: 1 }}>
                {title}
            </Text>
            <Icon
                name={'right'}
                type={'antdesign'}
                size={14}
                color={'#888888'}
            ></Icon>
        </TouchableOpacity>
    )
}

export default memo(UserItem)
