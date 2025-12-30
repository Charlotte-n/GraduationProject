import { screenWidth } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import { SingleFoodItemType } from '@/types/home'
import { Image, View } from 'react-native'

export default function HotRecommendItem({
    data,
}: {
    data: SingleFoodItemType
}) {
    return (
        <View>
            <Image
                source={{
                    uri: data.image,
                }}
                style={{
                    height: 60,
                    width: 88,
                    borderRadius: 10,
                }}
            ></Image>
            <AutoText
                numberOfLines={2}
                fontSize={4}
                style={{
                    fontSize: 11,
                    marginTop: 5,
                    width: screenWidth / 4,
                }}
            >
                {data.name?.trim()}
            </AutoText>
        </View>
    )
}
