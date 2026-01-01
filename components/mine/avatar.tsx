import MyImagePicker from '@/common/components/image-picker'
import { useLoginRegisterStore } from '@/store'
import { Icon } from '@rneui/themed'
import { Fragment, memo } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'

function Avatar() {
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const getImage = (image: string) => {
        console.log(image)
    }

    return (
        <Fragment>
            {/*  头像 */}
            <MyImagePicker type="avatar" getImage={getImage}>
                <Image
                    source={
                        userInfo.avatar
                            ? { uri: userInfo.avatar }
                            : require('@/assets/images/bg_login_header.png')
                    }
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />
            </MyImagePicker>
            <TouchableOpacity style={styles.usernameContainer}>
                <Text
                    style={{
                        fontSize: 20,
                        marginRight: 50,
                        fontWeight: '300',
                        width: 100,
                    }}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                >
                    {userInfo.username}
                </Text>

                <Icon
                    name={'right'}
                    type={'antdesign'}
                    size={20}
                    color={'#888888'}
                />
            </TouchableOpacity>
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
