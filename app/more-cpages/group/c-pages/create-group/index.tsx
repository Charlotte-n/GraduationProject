import { createGroupApi } from '@/apis'
import { windowHeight } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import Container from '@/common/components/container'
import ImagePicker from '@/common/components/image-picker'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { Button, Card, Icon } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    TextInput,
    ToastAndroid,
    View,
    type KeyboardTypeOptions,
} from 'react-native'

export default function CreateGroupPage() {
    const title = useRef('')
    const member = useRef('')
    const label = useRef('')
    const description = useRef('')
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<string | null>(null)
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const router = useRouter()

    const handleChangeTextInput = (
        type: 'title' | 'member' | 'label' | 'description',
        text: string,
    ) => {
        switch (type) {
            case 'title':
                title.current = text
                break
            case 'member':
                member.current = text
                break
            case 'label':
                label.current = text
                break
            case 'description':
                description.current = text
                break
        }
    }

    const renderInputData = () => {
        return [
            {
                label: '小组名称',
                value: title.current,
                onChangeText: (text: string) =>
                    handleChangeTextInput('title', text),
                styles: styles.groupCardTitleInput,
            },
            {
                label: '成员数量',
                value: member.current,
                onChangeText: (text: string) =>
                    handleChangeTextInput('member', text),
                styles: styles.groupCardMemberInput,
                keyboardType: 'numeric',
            },
            {
                label: '小组类型',
                value: label.current,
                onChangeText: (text: string) =>
                    handleChangeTextInput('label', text),
                styles: styles.groupCardTypeInput,
            },
            {
                label: '小组介绍',
                value: description.current,
                onChangeText: (text: string) =>
                    handleChangeTextInput('description', text),
                styles: styles.groupCardDescriptionInput,
                multiline: true,
                numberOfLines: 5,
                textAlignVertical: 'top',
            },
        ]
    }

    const renderInput = (data: ReturnType<typeof renderInputData>) => {
        return data.map((item) => {
            return (
                <TextInput
                    defaultValue={item.value}
                    placeholder={item.label}
                    style={item.styles}
                    keyboardType={
                        (item?.keyboardType as KeyboardTypeOptions) || 'default'
                    }
                    multiline={item.multiline || false}
                    numberOfLines={
                        item.multiline ? item.numberOfLines : undefined
                    }
                    textAlignVertical={item.multiline ? 'top' : 'center'}
                    onChangeText={item.onChangeText}
                />
            )
        })
    }

    const getImage = (image: string) => {
        setImage(image)
    }

    const createGroup = async () => {
        if (
            !title.current ||
            !member.current ||
            !label.current ||
            !description.current ||
            !image
        ) {
            ToastAndroid.showWithGravity(
                '创建失败,必须都进行填写',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
            )
            return
        }

        //创建一个formdata
        const formData = new FormData()
        formData.append('groupSize', member.current)
        formData.append('groupName', title.current)
        formData.append('ownerId', userInfo.id as any)
        formData.append('category', label.current)
        formData.append('image', {
            uri: image,
            name: 'group.png',
            type: 'image/png',
        } as any)
        formData.append('introduce', description.current)

        try {
            setLoading(true)
            const res = await createGroupApi(formData)
            if (res.code !== 1) {
                ToastAndroid.showWithGravityAndOffset(
                    '创建失败,请重新创建',
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                    25,
                    50,
                )
                return
            }
            ToastAndroid.showWithGravityAndOffset(
                '创建成功',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                25,
                50,
            )
            router.back()
        } catch (e) {
            ToastAndroid.showWithGravityAndOffset(
                '创建失败,请重新创建',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                25,
                50,
            )
            console.log(e, '创建小组失败')
        } finally {
            setLoading(false)
        }
    }
    return (
        <Container>
            <Image
                style={styles.groupBackgroundImage}
                source={require('@/assets/images/group.jpeg')}
            />
            <Card containerStyle={styles.groupCardContainer}>
                <View style={styles.groupCardContent}>
                    {renderInput(renderInputData())}
                    <ActivityIndicator
                        color={theme.colors.deep01Primary}
                        animating={loading}
                        size={'large'}
                        style={{
                            position: 'absolute',
                            top: 100,
                            left: 150,
                        }}
                    />
                    {/* 显示图片 */}
                    <View style={styles.groupCardImageContainer}>
                        {image ? (
                            <Image
                                source={{ uri: image }}
                                style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 10,
                                }}
                            />
                        ) : (
                            <ImagePicker getImage={getImage} type="">
                                <View style={styles.groupCardImagePicker}>
                                    <Icon
                                        type="antdesign"
                                        size={20}
                                        name={'plus'}
                                    />
                                </View>
                            </ImagePicker>
                        )}
                    </View>
                    <Button
                        onPress={createGroup}
                        disabled={loading}
                        title="创建打卡小组"
                        containerStyle={{
                            borderRadius: 20,
                        }}
                        buttonStyle={{
                            backgroundColor: theme.colors.deep01Primary,
                        }}
                    />
                </View>
                {/* 小组规则 */}
                <View style={styles.groupRuleContainer}>
                    <AutoText
                        style={{
                            color: '#F3BF88',
                        }}
                    >
                        小组规则
                    </AutoText>
                    <AutoText
                        fontSize={4}
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        每个人最多只能创建两个小组。
                    </AutoText>
                    <AutoText
                        fontSize={4}
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        小组创建者一旦解散了小组，一周之内不能创建小组。
                    </AutoText>{' '}
                </View>
            </Card>
        </Container>
    )
}

const styles = StyleSheet.create({
    groupBackgroundImage: {
        width: 200,
        height: '100%',
    },
    groupCardContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 120,
        borderTopLeftRadius: 40,
        borderTopEndRadius: 40,
        paddingVertical: 0,
        marginHorizontal: 0,
        paddingHorizontal: 0,
        flex: 1,
        minHeight: windowHeight - 200,
        backgroundColor: '#FEF0E3',
    },
    groupCardContent: {
        paddingHorizontal: 20,
    },
    groupCardTitleInput: {
        borderWidth: 1,
        borderColor: 'white',
        marginVertical: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        height: 40,
        paddingHorizontal: 5,
    },
    groupCardMemberInput: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 20,
        height: 40,
        paddingHorizontal: 5,
        marginBottom: 20,
    },
    groupCardTypeInput: {
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        height: 40,
        paddingHorizontal: 5,
    },
    groupCardDescriptionInput: {
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    groupCardImageContainer: {
        marginVertical: 15,
    },
    groupCardImagePicker: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        borderStyle: 'dotted',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupRuleContainer: {
        paddingHorizontal: 20,
    },
})
