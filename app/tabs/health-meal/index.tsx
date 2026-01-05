import { RecipeListApi } from '@/apis'
import { RecipeListBody, SingleDish } from '@/apis/types'
import FoodCard from '@/components/health-meal/food-card'
import theme from '@/styles/theme/color'
import { onMomentumScrollEnd } from '@/utils/load-more'
import { useEffect, useRef, useState } from 'react'
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

export default function HealthMeal() {
    const [refresh, setRefresh] = useState(false)
    const [MealList, setMealList] = useState<SingleDish[]>([] as SingleDish[])
    const pageLoading = useRef(false)
    const [pageLoadingFull, setPageLoadingFull] = useState(false)
    const pageNum = useRef(1)
    const num = useRef(10)
    const pageSize = 10

    // 加载更多食物
    const loadMore = () => {
        if (pageLoading.current || pageLoadingFull) return
        if (num.current >= 100) {
            setPageLoadingFull(true)
            return
        }
        //计算有多少个食物
        num.current += 10
        pageLoading.current = true
        pageNum.current += 1
        getRecipeList()
        pageLoading.current = false
    }

    // 获取食谱列表
    const getRecipeList = (type?: string) => {
        let data: RecipeListBody = {
            pageNum: pageNum.current,
            pageSize: pageSize,
        }

        setRefresh(true)
        RecipeListApi(data)
            .then((res) => {
                if (type) {
                    setMealList(res.data.dishes)
                    pageNum.current = 1
                    setPageLoadingFull(false)
                    num.current = 10
                    setRefresh(false)
                    return
                }

                if (MealList.length === 0) {
                    setMealList(res.data.dishes)
                } else {
                    setMealList([...new Set([...MealList, ...res.data.dishes])])
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setRefresh(false)
            })
    }

    useEffect(() => {
        getRecipeList()
    }, [])
    return (
        <ScrollView
            style={{
                backgroundColor: 'white',
            }}
            showsVerticalScrollIndicator={false}
            onScrollEndDrag={(event) => {
                onMomentumScrollEnd(
                    event,
                    {
                        pageLoading: pageLoading.current,
                        pageLoadingFull: pageLoadingFull,
                    },
                    loadMore,
                )
            }}
            refreshControl={
                <RefreshControl
                    tintColor={theme.colors.deep01Primary}
                    colors={[theme.colors.deep01Primary]}
                    refreshing={refresh}
                    onRefresh={() => getRecipeList('refreshs')}
                />
            }
        >
            <FoodCard mealList={MealList} />
            {/* 加载更多 */}
            {MealList.length > 0 && (
                <View
                    style={{
                        height: 40,
                        zIndex: 10,
                        paddingTop: 10,
                    }}
                >
                    {pageLoadingFull ? (
                        <Text
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            没有更多了
                        </Text>
                    ) : pageLoading.current ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <TouchableOpacity onPress={loadMore}>
                            <Text style={{ textAlign: 'center' }}>更多...</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </ScrollView>
    )
}
