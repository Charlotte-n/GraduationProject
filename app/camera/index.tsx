import { screenHeight } from '@/common/common'
import Container from '@/common/components/container'
import ImagePicker from '@/common/components/image-picker'
import theme from '@/styles/theme/color'
import { Button, Icon } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    Camera,
    type CameraDevice,
    useCameraDevice,
} from 'react-native-vision-camera'

import { useDietStore, useLoginRegisterStore } from '@/store'
import { getImage, getSearchImage } from '@/utils/uploadImg'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'

export default function CameraPage() {
    const cameraRef = useRef<Camera>(null)
    const device = useCameraDevice('back')
    const [selectedImage, setSelectedImage] = useState('')
    const [sizeImage, setSizeImage] = useState('')
    const router = useRouter()
    const loginStoreState = useLoginRegisterStore.getState()
    const dietStoreState = useDietStore.getState()
    const goBack = () => {
        router.back()
    }

    // 跳转
    const goToFoodList = () => {
        router.navigate('/recognize-food')
    }

    const upload = async () => {
        try {
            const compressedImage = await manipulateAsync(
                selectedImage,
                [{ resize: { width: 200 } }],
                { compress: 0.8, format: SaveFormat.JPEG },
            )
            setSizeImage(compressedImage.uri)
            goToFoodList()
        } catch (error) {
            console.error('Error compressing image', error)
            setSelectedImage(selectedImage)
        }
    }

    useEffect(() => {
        if (sizeImage) {
            getSearchImage(sizeImage, dietStoreState)
                .then((res) => {
                    console.log(res)
                })
                .catch((error) => {
                    ToastAndroid.show('识别失败', ToastAndroid.SHORT)
                    console.error('Error getting search image', error)
                })
            setSelectedImage('')
        }
        return () => {
            setSelectedImage('')
            setSizeImage('')
        }
    }, [sizeImage])

    const takePicture = async () => {
        try {
            const photo = await cameraRef.current?.takePhoto()
            const imageUri = photo?.path
                ? photo.path.startsWith('file://')
                    ? photo.path
                    : `file://${photo.path}`
                : ''
            setSelectedImage(imageUri)
        } catch (error) {
            console.log(error)
            ToastAndroid.show('拍照失败', ToastAndroid.SHORT)
        }
    }

    return (
        <Container>
            {selectedImage ? (
                <View>
                    <Image
                        source={{ uri: selectedImage }}
                        style={{
                            width: '100%',
                            height: 500,
                            marginBottom: 20,
                        }}
                    ></Image>
                    <View style={styles.buttonContainer}>
                        <Button
                            title={'取消'}
                            onPress={() => setSelectedImage('')}
                            buttonStyle={{
                                backgroundColor: theme.colors.deep01Primary,
                                width: 100,
                                borderRadius: 20,
                            }}
                            containerStyle={{
                                marginRight: 20,
                            }}
                        ></Button>
                        <Button
                            title={'确定'}
                            onPress={upload}
                            buttonStyle={{
                                backgroundColor: theme.colors.deep01Primary,
                                width: 100,
                                borderRadius: 20,
                            }}
                        ></Button>
                    </View>
                </View>
            ) : (
                <ScrollView>
                    <Camera
                        ref={cameraRef}
                        device={device as CameraDevice}
                        isActive={true}
                        photo={true}
                        style={styles.camera}
                    >
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={goBack}
                        >
                            <Icon name={'left'} type={'antdesign'} size={30} />
                        </TouchableOpacity>
                    </Camera>
                    <View style={styles.photoContainer}>
                        <Text style={styles.photoTitle}> 餐前拍一拍</Text>
                        <View style={styles.photoButton}>
                            <ImagePicker
                                type="camera"
                                getImage={(image) =>
                                    getImage(image, loginStoreState)
                                }
                            >
                                <Image
                                    style={{
                                        width: 40,
                                        height: 40,
                                    }}
                                    source={require('@/assets/images/picture.png')}
                                />
                            </ImagePicker>
                            <View style={styles.photoIcon}>
                                <TouchableOpacity onPress={takePicture}>
                                    <Image
                                        source={require('@/assets/images/takepicture.png')}
                                        style={{
                                            width: 60,
                                            height: 60,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        height: screenHeight / 1.5,
    },
    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
    },
    photoContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
        backgroundColor: 'white',
        height: screenHeight / 3.5,
    },
    photoTitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
    },
    photoButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    photoIcon: {
        flex: 1,
        marginLeft: 90,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
})
