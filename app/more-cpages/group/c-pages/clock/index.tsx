import { ClockApi, ClockCalendarApi, ClockContentApi } from '@/apis'
import { ClockCalendarParams, clockParam } from '@/apis/types'
import { windowHeight, windowWidth } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import Container from '@/common/components/container'
import ImagePicker from '@/common/components/image-picker'
import Avatar from '@/components/mine/avatar'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { Button, Card, Icon } from '@rneui/themed'
import { useLocalSearchParams } from 'expo-router'
import moment from 'moment'
import { useState } from 'react'
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    ToastAndroid,
    View,
} from 'react-native'

export default function ClockPage() {
    const [loading, setLoading] = useState(false)
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const { id } = useLocalSearchParams()
    const [clockParam, setClockParam] = useState<clockParam>({
        content: '',
        userId: userInfo.id as number,
        groupId: Number(id),
    })
    const [images, setImages] = useState<string[]>([])

    const getImage = (image: string) => {
        setImages((prevState) => [...prevState, image])
    }

    // 打卡上传
    const clock = async () => {
        try {
            const formData = new FormData()
            images.forEach((value) => {
                formData.append('images', {
                    uri: value,
                    name: 'image.jpeg',
                    type: 'image/jpeg',
                } as any)
            })

            let res: any
            //文字或者图片上传
            if (images.length) {
                setLoading(true)
                res = await ClockApi(clockParam, formData)
            } else {
                res = await ClockContentApi(clockParam)
            }

            if (res.code !== 1) {
                ToastAndroid.show('上传失败', ToastAndroid.SHORT)
                return
            }

            //打卡日历

            const data: ClockCalendarParams = {
                groupId: Number(id),
                userId: userInfo.id as number,
                newDateTime: moment(new Date()).format('YYYY-MM-DD'),
            }

            // TODO： 跳到详情页面

            await ClockCalendarApi(data)

            ToastAndroid.showWithGravity(
                '创建成功',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
            )
        } catch (error) {
            ToastAndroid.showWithGravity(
                '创建失败',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
            )
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={styles.container}>
                    <Card containerStyle={styles.cardContainer}>
                        <Avatar showIcon={false} avatarStyle={styles.avatar} />
                        {/* 上传内容 */}
                        <View style={styles.uploadContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'请输入打卡内容'}
                                textAlignVertical="top"
                                multiline={true}
                                numberOfLines={5}
                                editable={!loading}
                                onChangeText={(value: string) =>
                                    setClockParam((prevState) => {
                                        prevState.content = value
                                        return prevState
                                    })
                                }
                            ></TextInput>
                            {/* loading */}
                            {loading && (
                                <ActivityIndicator
                                    animating={loading}
                                    size={50}
                                    color={theme.colors.deep01Primary}
                                />
                            )}
                            {/* 图片列表 */}
                            <View style={styles.imageListContainer}>
                                {images.length > 0 &&
                                    images.map((item, index) => {
                                        return (
                                            <Image
                                                key={index}
                                                source={{ uri: item }}
                                                style={{
                                                    height: 50,
                                                    width: 50,
                                                    borderRadius: 10,
                                                    marginRight: 10,
                                                    marginBottom: 19,
                                                }}
                                            />
                                        )
                                    })}

                                {images.length <= 6 && (
                                    <ImagePicker getImage={getImage} type="">
                                        <View
                                            style={styles.imagePickerContainer}
                                        >
                                            <Icon
                                                type={'antdesign'}
                                                name={'plus'}
                                                size={15}
                                            />
                                        </View>
                                    </ImagePicker>
                                )}
                            </View>
                        </View>
                        {/* 打卡 */}
                        <View style={styles.clockButtonContainer}>
                            <Button
                                title={'今日打卡'}
                                containerStyle={{
                                    borderRadius: 20,
                                    width: windowWidth / 2,
                                }}
                                color={theme.colors.deep01Primary}
                                disabled={loading}
                                onPress={clock}
                            />
                        </View>
                        {/* 规则 */}
                        <View style={styles.ruleContainer}>
                            <AutoText>打卡规则</AutoText>
                            <AutoText
                                fontSize={4.5}
                                style={{
                                    marginTop: 10,
                                    color: '#FEBD47',
                                }}
                            >
                                1. 当天没有打卡的时候,不可以补卡。
                            </AutoText>
                            <AutoText
                                fontSize={4.5}
                                style={{
                                    color: '#FEBD47',
                                }}
                            >
                                2. 不能超过5天不打卡。
                            </AutoText>
                        </View>
                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#FBEEE6',
    },
    cardContainer: {
        width: windowWidth,
        height: windowHeight,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        marginHorizontal: 0,
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 100,
        position: 'absolute',
        left: windowWidth / 2.8,
        top: -30,
        zIndex: 1000,
        marginBottom: 50,
    },
    uploadContainer: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 5,
        marginBottom: 20,
    },
    textInput: {
        borderRadius: 20,
        backgroundColor: theme.colors.secondary,
        minHeight: 150,
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    imageListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imagePickerContainer: {
        height: 50,
        width: 50,
        borderRadius: 15,
        borderWidth: 1,
        borderStyle: 'dotted',
        justifyContent: 'center',
        alignItems: 'center',
    },
    clockButtonContainer: {
        margin: 'auto',
        marginBottom: 20,
    },
    ruleContainer: {},
})
