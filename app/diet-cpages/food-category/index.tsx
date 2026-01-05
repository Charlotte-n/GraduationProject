import { FoodCategoryApi, FoodListByCategoryApi } from '@/apis'
import {
    FoodCategoryType,
    FoodListByCategoryType,
    SingleFoodListType,
} from '@/apis/types'
import { screenHeight } from '@/common/common'
import Container from '@/common/components/container'
import FoodContent from '@/components/diet/c-pages/food-category/food-content'
import Empty from '@/components/diet/c-pages/search/empty'
import SearchFilter from '@/components/diet/search-filter'
import { Skeleton } from '@rneui/themed'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'
import { LinearGradient } from 'react-native-svg'

export default function FoodCategory() {
    const [FoodCategory, setFoodCategory] = useState<FoodCategoryType>(
        [] as FoodCategoryType,
    )
    const { activeIndex: activeIndexParam } = useLocalSearchParams()
    const [empty, setEmpty] = useState(false)
    const [FoodList, setFoodList] = useState([] as SingleFoodListType[])
    const [activeIndex, setActiveIndex] = useState(() =>
        activeIndexParam ? Number(activeIndexParam) : 1,
    )

    // 获取食物分类列表
    const getFoodCategory = () => {
        FoodCategoryApi()
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show(
                        '获取食物分类列表失败',
                        ToastAndroid.SHORT,
                    )
                    return
                }
                setFoodCategory(res.data.slice(0, 8) as FoodCategoryType)
            })
            .catch((err) => {
                ToastAndroid.show('获取食物分类列表失败', ToastAndroid.SHORT)
                return
            })
    }

    const getFoodList = () => {
        FoodListByCategoryApi({ category_id: activeIndex })
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('获取食物列表失败', ToastAndroid.SHORT)
                    return
                }
                setFoodList((res.data as FoodListByCategoryType).foods)
            })
            .catch((err) => {
                ToastAndroid.show('获取食物列表失败', ToastAndroid.SHORT)
                return
            })
            .finally(() => {
                setEmpty(false)
            })
    }

    useEffect(() => {
        getFoodCategory()
    }, [])

    useEffect(() => {
        getFoodList()
    }, [activeIndex])
    return (
        <Container>
            <View style={styles.container}>
                {/* 左侧分类列表 */}
                <View style={styles.leftContainer}>
                    {FoodCategory.length !== 0
                        ? FoodCategory.map((item) => (
                              <TouchableOpacity
                                  key={item.id}
                                  style={
                                      item.id === activeIndex
                                          ? [
                                                styles.foodCategoryItem,
                                                styles.acitve,
                                            ]
                                          : styles.foodCategoryItem
                                  }
                                  onPress={() => setActiveIndex(item.id)}
                              >
                                  <Text>{item.title}</Text>
                              </TouchableOpacity>
                          ))
                        : new Array(8).fill(0).map((item, index) => (
                              <Skeleton
                                  key={index}
                                  LinearGradientComponent={LinearGradient}
                                  animation="wave"
                                  width={94}
                                  height={50}
                                  style={{
                                      marginBottom: 10,
                                  }}
                              ></Skeleton>
                          ))}
                </View>

                {/* 右侧食物列表 */}
                <View style={styles.rightContainer}>
                    <View style={styles.searchFilterContainer}>
                        <SearchFilter
                            type="category"
                            isPress={false}
                            category_id={activeIndex}
                            setEmpty={setEmpty}
                            setSearchFoodResult={setFoodList}
                        />
                    </View>
                    {empty ? (
                        <Empty text="没有找到相关食物" />
                    ) : (
                        <View style={styles.foodContentContainer}>
                            <FoodContent FoodList={FoodList} />
                        </View>
                    )}
                </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    leftContainer: {
        backgroundColor: 'white',
        height: screenHeight,
    },
    acitve: {
        backgroundColor: '#F2F2F2',
    },
    foodCategoryItem: {
        paddingHorizontal: 12,
        paddingVertical: 20,
    },
    rightContainer: {
        flex: 1,
        marginLeft: 10,
        marginTop: 5,
        marginRight: 15,
        width: 250,
    },
    searchFilterContainer: {
        marginBottom: 10,
    },
    foodContentContainer: {
        marginBottom: 160,
    },
})
