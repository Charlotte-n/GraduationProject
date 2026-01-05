import AutoText from '@/common/components/AutoText'
import theme from '@/styles/theme/color'
import { SingleFoodListType } from '@/types/home'
import { Skeleton } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { memo } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'react-native-svg'

const FoodItem = ({
    hot,
    title,
    id,
}: {
    hot: number
    title: string
    id: number
}) => {
    return (
        <View style={styles.foodItemContainer}>
            <AutoText
                style={{
                    flex: 1,
                }}
                numberOfLines={1}
                fontSize={4.5}
            >
                {title}
            </AutoText>
            <AutoText
                fontSize={4.5}
                style={{
                    marginTop: 10,
                }}
            >
                {hot}kcal/100g
            </AutoText>
        </View>
    )
}

const FoodContent = ({ FoodList = [] }: { FoodList: SingleFoodListType }) => {
    const router = useRouter()

    const gotoFoodDetail = (id: number) => {
        router.navigate(`/diet-cpages/food-nutrition?id=${id}&type=category`)
    }

    return (
        <View style={styles.container}>
            <ScrollView scroll-y showsVerticalScrollIndicator={false}>
                {FoodList.length > 0
                    ? FoodList.map((item) => (
                          <TouchableOpacity
                              key={item.id}
                              onPress={() => gotoFoodDetail(item.id as number)}
                          >
                              <FoodItem
                                  title={item.title as string}
                                  hot={item.calories as number}
                                  id={item.id as number}
                              />
                          </TouchableOpacity>
                      ))
                    : new Array(6).fill(0).map((item, index) => (
                          <Skeleton
                              key={index}
                              LinearGradientComponent={LinearGradient}
                              animation="wave"
                              style={{
                                  flex: 1,
                              }}
                              height={150}
                          ></Skeleton>
                      ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
    foodItemContainer: {
        paddingHorizontal: 20,
        paddingVertical: 25,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.secondary,
    },
})

export default memo(FoodContent)
