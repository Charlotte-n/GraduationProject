import { FoodListByCategoryApi } from '@/apis'
import { useDietStore } from '@/store/diet'
import theme from '@/styles/theme/color'
import { FoodListByCategoryType, SingleFoodListType } from '@/types/home'
import { Tab, TabView } from '@rneui/themed'
import { memo, useEffect, useRef, useState } from 'react'
import { StyleProp, StyleSheet, ToastAndroid, ViewStyle } from 'react-native'
import FoodTab from './food-tab'

const indicatorStyle = {
    backgroundColor: theme.colors.deep01Primary,
    width: 20,
    height: 5,
    borderRadius: 20,
    marginHorizontal: 32,
}
const tabTitlesStyle = {
    fontSize: 14,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
}

const tabItemContainerStyle = {
    paddingHorizontal: 8,
}

const activeIds = [
    {
        key: '0',
        id: 1,
    },
    {
        key: '1',
        id: 2,
    },
    {
        key: '2',
        id: 4,
    },
    {
        key: '3',
        id: 5,
    },
    {
        key: '4',
        id: 10,
    },
]

const FoodCategoryByTime = ({
    getRecipeData,
}: {
    getRecipeData: () => Promise<void>
}) => {
    const [currentTab, setCurrentTab] = useState(0)
    const [activeId, setActiveId] = useState(1)
    const [refresh, setRefresh] = useState(false)
    const pageLoading = useRef(false)
    const [pageLoadingFull, setPageLoadingFull] = useState(false)
    const pageNum = useRef(1)
    const num = useRef(0)
    const [FoodNum, setFoodNum] = useState(0)
    const pageSize = 10

    const breakfastList = useDietStore((state) => state.breakfastList)
    const lunchList = useDietStore((state) => state.lunchList)
    const dinnerList = useDietStore((state) => state.dinnerList)
    const fruitList = useDietStore((state) => state.fruitList)
    const otherList = useDietStore((state) => state.otherList)
    const FoodList = useRef<SingleFoodListType>([])

    const dispatchFirst = (foods: SingleFoodListType) => {
        useDietStore.getState().setFoodList(foods, activeId)
        FoodList.current = foods
    }

    const dispatchSecond = (foods: SingleFoodListType) => {
        const existingIds = new Set(FoodList.current.map((food) => food.id))
        const newFoods = foods.filter((food) => !existingIds.has(food.id))
        const mergedFoods = [...FoodList.current, ...newFoods]
        useDietStore.getState().setFoodList(mergedFoods, activeId)
        console.log('mergedFoods', activeId)
        FoodList.current = mergedFoods
    }

    const getCurrentFoodList = (categoryId: number): SingleFoodListType => {
        switch (categoryId) {
            case 1:
                return breakfastList
            case 2:
                return lunchList
            case 4:
                return dinnerList
            case 5:
                return fruitList
            case 10:
                return otherList
            default:
                return []
        }
    }

    const getFoodList = () => {
        const param = {
            pageNum: pageNum.current,
            pageSize,
            category_id: activeId,
        }
        console.log('param', param)

        FoodListByCategoryApi(param)
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('获取食物列表失败', ToastAndroid.SHORT)
                    return
                }
                const { num, foods } = res.data as FoodListByCategoryType
                setFoodNum(num)
                const currentFoodList = getCurrentFoodList(activeId)
                console.log('currentFoodList', currentFoodList, foods)
                if (currentFoodList.length > 0) {
                    dispatchSecond(foods)
                } else {
                    dispatchFirst(foods)
                }
            })
            .catch((err) => {
                ToastAndroid.show('获取食物列表失败', ToastAndroid.SHORT)
                console.log(err)
            })
    }

    const loadMore = async () => {
        console.log('loadMore', num.current, FoodNum)
        if (num.current >= FoodNum) {
            setPageLoadingFull(true)
            return
        }
        num.current += pageSize
        pageLoading.current = true
        pageNum.current++
        await getFoodList()
        pageLoading.current = false
    }

    useEffect(() => {
        getRecipeData().catch((err) => {
            console.log(err)
            ToastAndroid.show('获取食物失败', ToastAndroid.SHORT)
        })
    }, [])

    useEffect(() => {
        pageNum.current = 1
        num.current = 10
        FoodList.current = []
        getFoodList()
        setPageLoadingFull(false)
    }, [activeId])

    // handle tab change
    const handleTabChange = (event: any) => {
        setCurrentTab(event)
        setActiveId(activeIds[event].id)
    }

    const tabItems = [
        {
            title: '早餐',
            key: 'breakfast',
            style: {
                width: '100%',
            },
            content: (
                <FoodTab
                    foodList={breakfastList}
                    pageLoading={pageLoading}
                    pageLoadingFull={pageLoadingFull}
                    refresh={refresh}
                    index={1}
                    loadMore={loadMore}
                    getFoodList={getFoodList}
                />
            ),
        },
        {
            title: '午餐',
            key: 'lunch',
            style: {
                width: '100%',
                margin: 'auto',
            },
            content: (
                <FoodTab
                    foodList={lunchList}
                    pageLoading={pageLoading}
                    pageLoadingFull={pageLoadingFull}
                    refresh={refresh}
                    index={2}
                    loadMore={loadMore}
                    getFoodList={getFoodList}
                />
            ),
        },
        {
            title: '晚餐',
            key: 'dinner',
            style: {
                width: '100%',
                margin: 'auto',
            },
            content: (
                <FoodTab
                    foodList={dinnerList}
                    pageLoading={pageLoading}
                    pageLoadingFull={pageLoadingFull}
                    refresh={refresh}
                    index={4}
                    loadMore={loadMore}
                    getFoodList={getFoodList}
                />
            ),
        },
        {
            title: '蔬菜',
            key: 'vegetable',
            style: {
                width: '100%',
                margin: 'auto',
            },
            content: (
                <FoodTab
                    foodList={fruitList}
                    pageLoading={pageLoading}
                    pageLoadingFull={pageLoadingFull}
                    refresh={refresh}
                    index={5}
                    loadMore={loadMore}
                    getFoodList={getFoodList}
                />
            ),
        },
        {
            title: '其他',
            key: 'other',
            style: {
                width: '100%',
                margin: 'auto',
            },
            content: (
                <FoodTab
                    foodList={otherList}
                    pageLoading={pageLoading}
                    pageLoadingFull={pageLoadingFull}
                    refresh={refresh}
                    index={10}
                    loadMore={loadMore}
                    getFoodList={getFoodList}
                />
            ),
        },
    ]

    return (
        <>
            <Tab
                value={currentTab}
                indicatorStyle={indicatorStyle}
                containerStyle={{
                    padding: 0,
                }}
                scrollable={true}
                titleStyle={tabTitlesStyle}
                onChange={handleTabChange}
            >
                {tabItems.map((item) => (
                    <Tab.Item key={item.key} title={item.title} />
                ))}
            </Tab>
            <TabView
                animationType={'spring'}
                value={currentTab}
                containerStyle={{
                    marginTop: 10,
                }}
                tabItemContainerStyle={tabItemContainerStyle}
                onChange={handleTabChange}
            >
                {tabItems.map((item) => (
                    <TabView.Item
                        key={item.key}
                        style={item.style as StyleProp<ViewStyle>}
                    >
                        {item.content}
                    </TabView.Item>
                ))}
            </TabView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    breakfastContainer: {
        height: 300,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default memo(FoodCategoryByTime)
