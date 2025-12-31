import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { memo, PropsWithChildren, useEffect, useRef } from 'react'
import { Alert, Linking, ToastAndroid, TouchableOpacity } from 'react-native'
import { useCameraPermission } from 'react-native-vision-camera'

interface MyImagePickerProps {
    type: string
    getImage: (image: string) => void
}

const MyImagePicker = ({
    children,
    type,
    getImage,
}: PropsWithChildren<MyImagePickerProps>) => {
    // TODO: 摄像头权限
    const { hasPermission, requestPermission } = useCameraPermission()
    const router = useRouter()
    const result = useRef<ImagePicker.ImagePickerResult | null>(null)
    const image = useRef<string | null>(null)

    // TODO:权限
    const checkPermission = async () => {
        try {
            if (!hasPermission) {
                await requestPermission()
            }
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
                return false
            }
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const showAlert = (handleRight: () => void) => {
        Alert.alert('请求失败', '此功能需要使用摄像头和访问图片,否则不能实现', [
            {
                text: '取消',
                style: 'cancel',
            },
            {
                text: '跳转',
                onPress: handleRight,
            },
        ])
    }

    useEffect(() => {
        // TODO: 权限
        checkPermission().then((res) => {
            if (!res) {
                showAlert(() => {
                    Linking.openSettings()
                })
                router.back()
            }
        })
    }, [])

    const pickImage = async () => {
        try {
            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            })
            result.current = res
            if (result.current.canceled) return
            image.current = result.current?.assets?.[0]?.uri
            getImage(image.current)

            if (type === 'camera') {
                // 跳转到识别食物页面
            }
        } catch (error) {
            ToastAndroid.show('图片获取失败', ToastAndroid.SHORT)
            console.error(error)
        }
    }

    return <TouchableOpacity onPress={pickImage}>{children}</TouchableOpacity>
}

export default memo(MyImagePicker)
