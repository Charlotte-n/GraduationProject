import { getUserInfo, uploadAvatar } from '@/apis'
import { useDietStore, useLoginRegisterStore } from '@/store'
import { FlipType, manipulateAsync, SaveFormat } from 'expo-image-manipulator'
import { Alert, ToastAndroid } from 'react-native'
import { uploadCommunicateImagApi } from '../apis/communicate'
import { recognizeFood } from '../apis/diet'

export const getImage = async (
    value: string,
    storeState: ReturnType<typeof useLoginRegisterStore.getState>,
) => {
    try {
        const { userInfo, setUserInfo } = storeState
        const uploadImage = async () => {
            const formData: any = new FormData()
            formData.append('avatar', {
                uri: value,
                name: 'avatar.jpeg',
                type: 'image/jpeg',
            })
            //上传图片,更新个人信息
            await uploadAvatar(formData, userInfo.id as number)
            const res = await getUserInfo(userInfo.id as number)
            setUserInfo(res.data.user)
            ToastAndroid.show('更新成功', ToastAndroid.SHORT)
        }
        await uploadImage()
    } catch (error) {
        console.error('Upload error:', error)
    }
}
export const getSearchImage = async (
    value: string,
    storeState: ReturnType<typeof useDietStore.getState>,
) => {
    const { setRecognizeFoodList } = storeState
    console.log(value, 'value')
    const uploadImage = async () => {
        //进行一下压缩
        const manipResult = await manipulateAsync(
            value,
            [
                { rotate: 90 },
                { flip: FlipType.Vertical },
                { resize: { width: 1000 } },
            ],
            { compress: 1, format: SaveFormat.JPEG },
        )
        const formData: any = new FormData()
        formData.append('image', {
            uri: manipResult.uri,
            name: 'avatar.jpeg',
            type: 'image/jpeg',
        })
        //上传到
        const res = await recognizeFood(formData)
        //将食材信息放到仓库
        setRecognizeFoodList(res.data.result)
    }
    await uploadImage()
}

//多图片上传
export const uploadMultipleImages = async (
    selectedImages: string[],
    id: number,
) => {
    console.log(selectedImages)
    try {
        const formData: any = new FormData()
        const uploadImage = async () => {
            selectedImages.forEach((value) => {
                formData.append('images', {
                    uri: value,
                    name: 'image.jpeg',
                    type: 'image/jpeg',
                })
            })
        }
        //多图片上传
        await uploadImage()
        await uploadCommunicateImagApi(id as number, formData)
    } catch (error) {
        console.error('Upload error:', error)
        Alert.alert('Error', 'Failed to upload images')
    }
}
export default getImage
