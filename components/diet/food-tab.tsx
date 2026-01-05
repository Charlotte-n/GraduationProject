import AutoText from '@/common/components/AutoText'
import theme from '@/styles/theme/color'
import { SingleFoodItemType, SingleFoodListType } from '@/types/home'
import { onMomentumScrollEnd } from '@/utils/load-more'
import { Icon } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { memo, RefObject, useState } from 'react'
import {
    ActivityIndicator,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import RecordFood from './record-food'

interface FoodTabProps {
    refresh: boolean
    foodList: SingleFoodListType
    pageLoading: RefObject<boolean>
    pageLoadingFull: boolean
    index: number
    loadMore: () => void
    getFoodList: (index: number, type: string) => void
}

const FoodItem = ({ data }: { data: SingleFoodItemType }) => {
    const [isVisible, setIsVisible] = useState(false)
    const router = useRouter()

    const handlePress = () => {
        // TODO: 食物詳情頁
        router.navigate(
            `/diet-cpages/food-nutrition?id=${data.id}&type=category`,
        )
    }

    // show Record
    const handleShowRecord = (value: boolean) => {
        setIsVisible(value)
    }
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.foodItemContainerWrapper}>
                <View style={styles.foodItemContainer}>
                    {data?.image ? (
                        <Image
                            source={{ uri: data.image }}
                            style={{
                                width: 75,
                                height: 70,
                                borderRadius: 20,
                                marginRight: 10,
                            }}
                        />
                    ) : (
                        <ActivityIndicator
                            style={styles.activityIndicator}
                            size="large"
                            color={theme.colors.deep01Primary}
                        />
                    )}
                    <View>
                        <AutoText
                            numberOfLines={1}
                            style={{
                                width: 120,
                            }}
                        >
                            {data?.title}
                        </AutoText>
                        <Text style={{ fontSize: 12 }}>
                            {data?.calories}Kcal/l00g
                        </Text>
                    </View>
                </View>
                <View style={styles.addButtonContainer}>
                    <Text>100g</Text>
                    <TouchableOpacity onPress={() => handleShowRecord(true)}>
                        <Icon
                            type={'antdesign'}
                            name={'plus-circle'}
                            size={20}
                            color={theme.colors.deep01Primary}
                            style={{
                                marginLeft: 5,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                {isVisible && (
                    <RecordFood
                        isVisible={isVisible}
                        onClose={() => handleShowRecord(false)}
                        id={data.id as number}
                    />
                )}
            </View>
        </TouchableOpacity>
    )
}

const FoodTab = ({
    foodList,
    index,
    pageLoading,
    pageLoadingFull,
    loadMore,
    refresh,
    getFoodList,
}: FoodTabProps) => {
    const handleRefresh = () => {
        getFoodList(index, 'refresh')
    }
    return (
        <>
            <ScrollView
                style={styles.container}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        tintColor={theme.colors.deep01Primary}
                        colors={[theme.colors.deep01Primary]}
                        refreshing={refresh}
                        onRefresh={handleRefresh}
                    />
                }
                onScrollEndDrag={(event) => {
                    console.log('pageLoding', pageLoading)
                    onMomentumScrollEnd(
                        event,
                        {
                            pageLoading: pageLoading.current,
                            pageLoadingFull: pageLoadingFull,
                        },
                        loadMore,
                    )
                }}
            >
                {foodList.length > 0 ? (
                    foodList.map((item) => (
                        <FoodItem key={item.id} data={item} />
                    ))
                ) : (
                    <ActivityIndicator
                        style={styles.activityIndicator}
                        size="large"
                        color={theme.colors.deep01Primary}
                    />
                )}
                {foodList.length > 0 && (
                    <View
                        style={{
                            height: 50,
                            zIndex: 10,
                            paddingTop: 5,
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
                                <Text style={{ textAlign: 'center' }}>
                                    更多...
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        overflow: 'hidden',
        paddingHorizontal: 20,
    },
    activityIndicator: {
        height: 240,
        overflow: 'hidden',
    },
    foodItemContainerWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderStyle: 'solid',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        borderRadius: 10,
    },
    foodItemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default memo(FoodTab)
