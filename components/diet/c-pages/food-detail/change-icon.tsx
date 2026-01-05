import AutoText from '@/common/components/AutoText'
import { memo } from 'react'
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    TouchableOpacity,
    View,
    type ImageStyle,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface LikeData {
    isLike: boolean
    likeNum?: number
    id?: number
}

const LikeDislike = ({
    likeData,
    likeImages,
    ImageStyle,
    handleLike,
    isShowNum,
}: {
    likeData: LikeData
    likeImages: {
        like: string
        unlike: string
    }
    ImageStyle: ImageStyle
    isShowNum: boolean
    handleLike: () => void
}) => {
    const { bottom } = useSafeAreaInsets()
    return (
        <TouchableOpacity onPress={handleLike}>
            <View style={[styles.container, { marginBottom: bottom }]}>
                <Image
                    style={{
                        width: 20,
                        height: 20,
                        ...ImageStyle,
                    }}
                    source={
                        likeData.isLike
                            ? (likeImages.like as ImageSourcePropType)
                            : (likeImages.unlike as ImageSourcePropType)
                    }
                />
                {isShowNum && (
                    <AutoText fontSize={3.5}>{likeData.likeNum ?? 0}</AutoText>
                )}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default memo(LikeDislike)
