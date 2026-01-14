import { getTopicApi, recordDietTextApi } from '@/apis'
import Container from '@/common/components/container'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { uploadMultipleImages } from '@/utils/uploadImg'
import { Button } from '@rneui/themed'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { memo, useEffect, useMemo, useState } from 'react'
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'

const dateMap = ['日', '一', '二', '三', '四', '五', '六']

const RecordToday = () => {
    const router = useRouter()
    const [titles, setTitles] = useState<
        { desc: string; id: number; stauts: number }[]
    >([])
    const [recordText, setRecordText] = useState<string>('')
    const [activeId, setActiveId] = useState<number>(1)
    const [selectedImages, setSelectedImages] = useState<string[]>([])
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const activeColor = useMemo(
        () => (id: number, type: string) => {
            if (activeId === id) {
                if (type === 'bg') {
                    return theme.colors.deep01Primary
                } else if (type === 'color') {
                    return 'white'
                }
            } else {
                if (type === 'bg') {
                    return 'white'
                } else if (type === 'color') {
                    return theme.colors.deep01Primary
                }
            }
        },
        [activeId],
    )

    const getTopic = () => {
        getTopicApi()
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('获取板块失败', ToastAndroid.SHORT)
                    return
                }
                setTitles(res.data)
            })
            .catch((err) => {
                ToastAndroid.show('获取板块失败', ToastAndroid.SHORT)
            })
    }

    //上传文字
    const UploadText = () => {
        const recordDietParam = {
            content: recordText,
            topicId: activeId,
            userid: userInfo.id as number,
        }
        return new Promise((resolve, reject) => {
            recordDietTextApi(recordDietParam)
                .then((res) => {
                    if (!res.data) {
                        ToastAndroid.show('上传文字失败', ToastAndroid.SHORT)
                        return
                    }
                    resolve(res.data)
                })
                .catch((err) => {
                    ToastAndroid.show('上传文字失败', ToastAndroid.SHORT)
                    reject(err)
                })
        })
    }

    const pickImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        if (!result.canceled) {
            setSelectedImages([
                ...selectedImages,
                ...result.assets.map((item) => item.uri),
            ])
        }
    }

    const uploadAll = () => {
        //限制条件
        if (selectedImages.length == 0 && recordText.trim() === '') {
            return Alert.alert('请填写记录')
        }
        UploadText()
            .then((id) => {
                selectedImages &&
                    selectedImages.length > 0 &&
                    uploadMultipleImages(selectedImages, id as number)
                        .then((res) => {
                            console.log(res, '上传图片')
                        })
                        .catch((err) => {
                            ToastAndroid.show(
                                '上传图片失败',
                                ToastAndroid.SHORT,
                            )
                            console.log(err, '上传图片失败')
                        })
            })
            .catch((err) => {
                ToastAndroid.show('上传文字失败', ToastAndroid.SHORT)
                console.log(err, '上传文字失败')
            })
        // 清除选中图片
        setSelectedImages([])
        //返回上一页面
        router.replace('/more-cpages/communicate')
    }

    useEffect(() => {
        getTopic()
    }, [])

    return (
        <Container>
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '800',
                            flex: 1,
                        }}
                    >
                        {new Date().getMonth() +
                            1 +
                            '月' +
                            new Date().getDate() +
                            '日 '}

                        {'星期' + dateMap[Number(new Date().getDay())]}
                    </Text>
                    <Button
                        title="发布"
                        containerStyle={{
                            borderRadius: 50,
                            width: 80,
                        }}
                        titleStyle={{
                            fontSize: 15,
                        }}
                        color={theme.colors.deep01Primary}
                        onPress={uploadAll}
                    />
                </View>
                <Text
                    style={{
                        fontSize: 14,
                        color: '#cccccc',
                    }}
                >
                    选择你要发布的板块：
                </Text>
                {/* 模块 */}
                <View style={styles.moduleContainer}>
                    {titles &&
                        titles.length > 0 &&
                        titles.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => setActiveId(item.id)}
                            >
                                <Text
                                    style={[
                                        styles.moduleItem,
                                        {
                                            backgroundColor: activeColor(
                                                item.id,
                                                'bg',
                                            ),
                                            color: activeColor(
                                                item.id,
                                                'color',
                                            ),
                                        },
                                    ]}
                                >
                                    {item.desc}
                                </Text>
                            </TouchableOpacity>
                        ))}
                </View>

                {/* 记录的版本 */}
                <View>
                    <TextInput
                        multiline={true}
                        numberOfLines={15}
                        textAlignVertical={'top'}
                        placeholder={'写下今天吃了什么与此刻的心情'}
                        placeholderTextColor={'#cccccc'}
                        style={styles.textInput}
                        value={recordText}
                        onChangeText={(value) => setRecordText(value)}
                    />
                    <Text
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        {recordText.length}/500
                    </Text>
                </View>
                {/* 图片的添加 */}
                <View>
                    <Text style={styles.addImageText}>
                        添加图片让记录更生动(最多只能上传6张图片)
                    </Text>
                    <View style={styles.addImageContent}>
                        {selectedImages && selectedImages.length > 0 && (
                            <View style={styles.addImageContainer}>
                                {selectedImages.map((item, index) => (
                                    <Image
                                        key={index}
                                        style={[
                                            styles.imageItem,
                                            {
                                                marginRight:
                                                    index % 3 === 0 ? 0 : 10,
                                            },
                                        ]}
                                        source={{ uri: item }}
                                    />
                                ))}
                            </View>
                        )}

                        <TouchableOpacity
                            style={styles.addImageButton}
                            onPress={pickImages}
                        >
                            {selectedImages.length >= 6 ? null : (
                                <Text
                                    style={{
                                        fontSize: 12,
                                        textAlign: 'center',
                                    }}
                                >
                                    添加图片
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    moduleContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    moduleItem: {
        borderRadius: 8,
        borderColor: theme.colors.deep01Primary,
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginRight: 5,
        fontSize: 12,
        marginTop: 5,
    },
    textInput: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#F2FCF1',
    },
    addImageText: {
        marginBottom: 10,
        fontSize: 12,
        color: '#cccccc',
    },
    addImageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    imageItem: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginBottom: 10,
    },
    addImageContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addImageButton: {
        justifyContent: 'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#ccccccc',
        borderRadius: 10,
        height: 60,
        width: 60,
    },
})

export default memo(RecordToday)
