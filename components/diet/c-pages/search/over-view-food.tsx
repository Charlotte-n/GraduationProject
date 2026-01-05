import { RandomFoodDataType } from '@/apis/types'
import { windowWidth } from '@/common/common'
import theme from '@/styles/theme/color'
import { useRouter } from 'expo-router'
import { memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const OverViewFood = ({ data }: { data: RandomFoodDataType[] }) => {
    const router = useRouter()

    const handlePress = (id: number) => {
        router.navigate(`/diet-cpages/food-nutrition?id=${id}&type=search`)
    }
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text
                    style={{
                        marginRight: 2,
                        width: 2,
                        height: 10,
                        borderWidth: 2,
                        borderColor: theme.colors.deep01Primary,
                        borderRadius: 20,
                    }}
                />
                <Text
                    style={{
                        fontSize: 15,
                    }}
                >
                    食物
                </Text>
            </View>
            <View style={styles.foodContainer}>
                {data.length > 0 &&
                    data.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => handlePress(item.id)}
                        >
                            <Text
                                numberOfLines={1}
                                style={[
                                    styles.foodTitle,

                                    {
                                        ...(index === data.length - 1 && {
                                            marginRight: 0,
                                        }),
                                        borderRadius: 32,
                                        maxWidth: 200,
                                    },
                                ]}
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    foodContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        width: windowWidth - 40,
    },
    foodTitle: {
        marginRight: 10,
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 5,
        backgroundColor: '#E1E1E1',
    },
})

export default memo(OverViewFood)
