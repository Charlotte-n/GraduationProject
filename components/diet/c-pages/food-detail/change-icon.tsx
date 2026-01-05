import AutoText from '@/common/components/AutoText'
import { memo } from 'react'
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    type ImageStyle,
} from 'react-native'

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
}: {
    likeData: LikeData
    likeImages: {
        like: string
        unlike: string
    }
    ImageStyle: ImageStyle
    handleLike: () => void
}) => {
    return (
        <TouchableOpacity onPress={handleLike}>
            <View style={styles.container}>
                <Image
                    style={{
                        width: 20,
                        height: 20,
                        ...ImageStyle,
                    }}
                    source={{
                        uri: likeData.isLike
                            ? likeImages.like
                            : likeImages.unlike,
                    }}
                />
                <AutoText fontSize={3.5}>{likeData.likeNum ?? 0}</AutoText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default memo(LikeDislike)
