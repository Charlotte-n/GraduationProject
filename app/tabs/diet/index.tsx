import { getRandomRecipeApi } from '@/apis'
import FoodCategoryByTime from '@/components/diet/food-category-by-time'
import LoadingScheme from '@/components/diet/loading-scheme'
import RecipeCategory from '@/components/diet/recipe-category'
import SearchFilter from '@/components/diet/search-filter'
import { SingleFoodListType } from '@/types/home'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

export default function Diet() {
    const [RecipeFood, setRecipeFood] = useState([] as SingleFoodListType[])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const getRecipeData = async () => {
        try {
            setLoading(true)
            const res = await getRandomRecipeApi()
            setRecipeFood(res.data as any)
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleSearchPress = () => {
        router.navigate('/diet-cpages/search')
    }
    return (
        <ScrollView
            style={styles.container}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
        >
            {/* 搜索 */}
            <View style={styles.searchContainer}>
                <SearchFilter
                    type="home"
                    isPress={true}
                    handlePress={handleSearchPress}
                />
            </View>
            {/* 食谱分类 */}
            <View style={styles.categoryContainer}>
                <RecipeCategory />
            </View>
            {/* 热门菜品 */}
            <View style={styles.loadingContainer}>
                <LoadingScheme
                    data={RecipeFood as SingleFoodListType}
                    isLoading={loading}
                />
            </View>
            {/* 时间菜谱 */}
            <View style={styles.foodCategoryContainer}>
                <FoodCategoryByTime getRecipeData={getRecipeData} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingTop: 20,
    },
    searchContainer: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    categoryContainer: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    loadingContainer: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    foodCategoryContainer: {
        minHeight: 400,
        width: '100%',
    },
})
