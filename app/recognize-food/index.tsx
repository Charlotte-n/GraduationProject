import { RecognizeFood as RecognizeFoodType } from '@/apis/types'
import { windowHeight } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import { useDietStore } from '@/store'
import theme from '@/styles/theme/color'
import { Stack, useRouter } from 'expo-router'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function RecognizeFood() {
    const recognizeFoodList = useDietStore((state) => state.recognizeFoodList)
    const router = useRouter()

    const goFoodDetailPage = (item: RecognizeFoodType) => {
        router.navigate(`/diet-cpages/food-nutrition?id=${item.matchedFoodId}&fat=${item.fat}&carbohydrate=${item.carbohydrate}&cellulose=${item.cellulose}&calories=${item.calories}&protein=${item.protein}&title=${item.title}`)
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                title: "识别详情",
                headerShown: true,
                headerStyle: { backgroundColor: theme.colors.deep01Primary },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',

            }} />
            {(recognizeFoodList?.[0]?.title !== '非菜' ? (
                <ScrollView style={styles.nonVegetableContainer}>
                    {recognizeFoodList?.map((item, index) => (
                        <TouchableOpacity
                            style={styles.nonVegetableItem}
                            key={index}
                            onPress={() => {
                                goFoodDetailPage(item)
                            }}

                        >
                            <View style={styles.info}>
                                <AutoText
                                    numberOfLines={1}
                                    style={{
                                        width: 120,
                                        height: 120,
                                        marginBottom: 30,
                                    }}
                                >
                                    {item.title}
                                </AutoText>
                                <Text style={{ fontSize: 12 }}>
                                    {item.calories}Kcal/100g
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.emptyContainer}>
                    <Image
                        style={{
                            width: 200,
                            height: 200,
                            marginBottom: 20,
                        }}
                        source={require('@/assets/images/search.png')}
                    />
                    <AutoText fontSize={6}>不能识别到该食物</AutoText>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    nonVegetableContainer: {
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    nonVegetableItem: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderWidth: 1,
        borderColor: theme.colors.deep01Primary,
        borderRadius: 10,
        paddingHorizontal: 5,
        marginVertical: 10,
    },
    vegetableContainer: {
        flex: 1,
        backgroundColor: 'blue',
    },
    info: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight - 200,
    },
})
