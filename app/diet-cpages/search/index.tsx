import { getRandomRecipeApi, randomFood } from '@/apis'
import { CommonResponseType, RandomFoodDataType } from '@/apis/types'
import Container from '@/common/components/container'
import Empty from '@/components/diet/c-pages/search/empty'
import OverViewFood from '@/components/diet/c-pages/search/over-view-food'
import SearchResult from '@/components/diet/c-pages/search/search-result'
import SearchFilter from '@/components/diet/search-filter'
import HotRecommend from '@/components/home/components/HotRecommend'
import { SingleFoodListType } from '@/types/home'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, ToastAndroid, View } from 'react-native'

export default function Search() {
    const [showRecommendFood, setShowRecommendFood] = useState(true)
    const [empty, setEmpty] = useState(false)
    const [searchFoodResult, setSearchFoodResult] = useState(
        [] as SingleFoodListType,
    )
    //获取随机食物
    const [randomFoodData, setRandomFoodData] = useState(
        [] as RandomFoodDataType[],
    )

    //获取热门菜谱食物
    const [RecipeFood, setRecipeFood] = useState([] as SingleFoodListType)

    const handleResponse = (
        res: CommonResponseType<any>,
        setData: (data: any) => void,
    ) => {
        if (!res.data) {
            ToastAndroid.show('暂无数据', ToastAndroid.SHORT)
            return
        }
        setData(res.data)
    }

    const getRecipeData = () => {
        getRandomRecipeApi()
            .then((res) => {
                handleResponse(res, setRecipeFood)
            })
            .catch((err) => {
                ToastAndroid.show('获取热门菜谱失败', ToastAndroid.SHORT)
            })
    }

    const getRandomFood = () => {
        randomFood()
            .then((res) => {
                handleResponse(res, setRandomFoodData)
            })
            .catch((err) => {
                ToastAndroid.show('获取随机食物失败', ToastAndroid.SHORT)
            })
    }

    useEffect(() => {
        getRecipeData()
        getRandomFood()
    }, [])

    return (
        <Container>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.searchFilterContainer}>
                    <SearchFilter
                        type="search"
                        isPress={false}
                        setEmpty={setEmpty}
                        setSearchFoodResult={setSearchFoodResult}
                        setRecommendShowFood={setShowRecommendFood}
                    />
                </View>
                {showRecommendFood ? (
                    <View style={styles.overViewFoodContainer}>
                        <OverViewFood data={randomFoodData} />
                    </View>
                ) : empty ? (
                    <Empty text="暂无搜索到任何食物" />
                ) : (
                    <View style={styles.searchResultContainer}>
                        <SearchResult foodData={searchFoodResult} />
                    </View>
                )}

                <View style={styles.bottomContainer}>
                    <HotRecommend title={'热门菜品'} data={RecipeFood} />
                </View>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    searchFilterContainer: {
        marginBottom: 10,
    },
    overViewFoodContainer: {
        minHeight: 300,
        marginBottom: 10,
    },
    searchResultContainer: {
        flex: 1,
        minHeight: 300,
        marginBottom: 10,
    },
    bottomContainer: {
        flex: 2,
    },
})
