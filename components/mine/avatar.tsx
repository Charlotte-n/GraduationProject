import MyImagePicker from '@/common/components/image-picker'
import { useLoginRegisterStore } from '@/store'
import getImage from '@/utils/uploadImg'
import { Icon } from '@rneui/themed'
import { Fragment, memo } from 'react'
import type { ImageStyle, TextStyle } from 'react-native'
import {
    Image,
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'

function Avatar({
    showIcon = true,
    avatarUrl,
    avatarStyle,
    textStyle,
    name,
    showName = true,
}: {
    showIcon?: boolean
    avatarUrl?: string
    avatarStyle?: StyleProp<ImageStyle>
    textStyle?: StyleProp<TextStyle>
    name?: string
    showName?: boolean
}) {
    const loginStoreState = useLoginRegisterStore.getState()
    const { userInfo } = loginStoreState
    return (
        <Fragment>
            {/*  头像 */}
            <MyImagePicker
                type="avatar"
                getImage={(image) => getImage(image, loginStoreState)}
            >
                <Image
                    source={
                        avatarUrl || userInfo.avatar
                            ? { uri: avatarUrl || userInfo.avatar }
                            : require('@/assets/images/bg_login_header.png')
                    }
                    style={[
                        { width: 100, height: 100, borderRadius: 50 },
                        avatarStyle,
                    ]}
                />
            </MyImagePicker>
            {showName && (
                <TouchableOpacity style={styles.usernameContainer}>
                    <Text
                        style={[
                            {
                                fontSize: 20,
                                marginRight: 50,
                                fontWeight: '300',
                                width: 100,
                            },
                            textStyle,
                        ]}
                        ellipsizeMode={'tail'}
                        numberOfLines={1}
                    >
                        {name || userInfo.username}
                    </Text>

                    {showIcon && (
                        <Icon
                            name={'right'}
                            type={'antdesign'}
                            size={20}
                            color={'#888888'}
                        />
                    )}
                </TouchableOpacity>
            )}
        </Fragment>
    )
}

export default memo(Avatar)

const styles = StyleSheet.create({
    usernameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
