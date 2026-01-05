import { SingleDish } from '@/apis/types'
import { Card } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { memo } from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'

const FoodCardItem = ({ data }: { data: SingleDish }) => {
    const router = useRouter()

    const handleGoDetail = () => {
        router.navigate(`/diet-cpages/food-detail?id=${data.id}`)
    }
    return (
        <TouchableOpacity onPress={handleGoDetail}>
            <Card
                containerStyle={{
                    borderRadius: 10,
                }}
            >
                {data.image && (
                    <Image
                        source={{ uri: data.image as string }}
                        style={{
                            width: '100%',
                            height: 150,
                            marginBottom: 10,
                        }}
                        resizeMode="stretch"
                        borderRadius={10}
                    />
                )}
                <Text style={{ fontSize: 16, fontWeight: '800' }}>
                    {data.name.trim()}
                </Text>
            </Card>
        </TouchableOpacity>
    )
}

export default memo(FoodCardItem)
