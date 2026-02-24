import theme from '@/styles/theme/color'
import { Icon } from '@rneui/themed'
import { File, Paths } from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { memo, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import ViewShot from 'react-native-view-shot'

interface MyShareProps {
    IconComponent?: React.ReactNode
}

const MyShare = ({ children, IconComponent }: PropsWithChildren<MyShareProps>) => {
    const viewShotRef = useRef<ViewShot | null>(null)
    const [url, setUrl] = useState<string>('')

    const createFile = (url: string) => {
        const file = new File(Paths.cache, `food_${Date.now()}.png`);
        file.create();
        file.write(url, {
            encoding: 'base64',
        });
        console.log('file uri', file.uri)
        return file.uri
    }

    const capturePic = async () => {
        viewShotRef.current?.capture?.().then((uri: string) => {
            const fileUri = createFile(uri)
            setUrl(fileUri)
        }).catch((error: Error) => {
            console.log(error)
        })
    }

    const sharePic = async () => {
        const isAvailable = await Sharing.isAvailableAsync();
        if (!isAvailable) {
            alert('当前设备不支持分享');
            return;
        }
        if (!url) {
            await capturePic()
        }
        try {
            await Sharing.shareAsync(url, {
                dialogTitle: '分享这张图片',
                mimeType: 'image/jpeg',      // Android 指定类型
                UTI: 'public.jpeg'           // iOS 指定类型
            });
        } catch (error) {
            console.error('分享失败:', error);
        }
    }

    useEffect(() => {
        capturePic()
    }, [])


    return (
        <ViewShot ref={viewShotRef} options={{
            fileName: 'food_' + new Date().getTime(),
            format: 'png',
            quality: 0.1,
            result: 'base64',
        }}>
            <TouchableOpacity style={styles.shareContainer} onPress={sharePic}>
                {IconComponent ?? (
                    <Icon
                        name="share-alt"
                        type="antdesign"
                        color={theme.colors.deep01Primary}
                        size={30}
                    />
                )}
            </TouchableOpacity>
            {children}
        </ViewShot>
    )
}

const styles = StyleSheet.create({
    shareContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
})
export default memo(MyShare)