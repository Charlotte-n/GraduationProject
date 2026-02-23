import { FoodListByCategoryApi } from '@/apis'
import { CommonResponseType, FoodListByCategoryType } from '@/apis/types'
import { SingleFoodListType } from '@/apis/types/food'
import { screenWidth } from '@/common/common'
import theme from '@/styles/theme/color'
import { Icon } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
    StyleSheet,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'

interface SearchFilterProps {
    type: 'home' | 'category' | 'search'
    isPress: boolean
    category_id?: number
    handlePress?: () => void
    setRecommendShowFood?: (isShow: boolean) => void
    setSearchFoodResult?: (food: any) => void
    setEmpty?: (isEmpty: boolean) => void
    setLoading?: (isLoading: boolean) => void
}

const SearchFilter = ({
    type,
    isPress = false,
    handlePress,
    setRecommendShowFood,
    setSearchFoodResult,
    setEmpty,
    category_id,
    setLoading,
}: SearchFilterProps) => {
    const [search, setSearch] = useState('')
    const router = useRouter()
    const commonInputProps = {
        style: { width: (screenWidth - 40) / 1.4 },
        value: search,
        onChangeText: (text: string) => {
            setSearch(text)
            if (text.length === 0) {
                setRecommendShowFood?.(true)
            }
        },
        placeholder: '搜索相关菜品食物的热量',
        placeholderTextColor: '#999',
    }

    const clearAll = () => {
        setSearch('')
        setRecommendShowFood?.(true)
    }

    const gotoCamera = () => {
        router.navigate('/camera')
    }

    const handleResponse = (
        res: CommonResponseType<SingleFoodListType | FoodListByCategoryType>,
        showRecommendShowFood: boolean = false,
    ) => {
        showRecommendShowFood && setRecommendShowFood?.(false)
        if ((res.data as FoodListByCategoryType).foods.length === 0)
            setEmpty?.(true)
        else setEmpty?.(false)

        setSearchFoodResult?.((res.data as FoodListByCategoryType).foods)

    }

    const searchFood = () => {
        setLoading?.(true)
        FoodListByCategoryApi({ title: search })
            .then(
                (
                    res: CommonResponseType<
                        SingleFoodListType | FoodListByCategoryType
                    >,
                ) => {
                    handleResponse(res, true)
                },
            )
            .catch((err) => {
                ToastAndroid.show('搜索失败', ToastAndroid.SHORT)
                console.log(err)
            }).finally(() => {
                setLoading?.(false)
            })
    }

    // 种类 + 文字搜索食物
    const searchFoodByCategoryTitle = () => {
        setLoading?.(true)
        FoodListByCategoryApi({ title: search, category_id })
            .then((res) => {
                handleResponse(res)
            })
            .catch((err) => {
                ToastAndroid.show('搜索失败', ToastAndroid.SHORT)
                console.log(err)
            }).finally(() => {
                setLoading?.(false)
            })
    }

    const searchFoodByCategory = () => {
        setLoading?.(true)
        FoodListByCategoryApi({ category_id })
            .then((res) => {
                handleResponse(res)
            })
            .catch((err) => {
                ToastAndroid.show('搜索失败', ToastAndroid.SHORT)
                console.log(err)
            })
            .finally(() => {
                setLoading?.(false)
            })
    }

    // 搜索
    const handleSearch = () => {
        switch (type) {
            case 'search':
                search && searchFood()
                break
            case 'category':
                search ? searchFoodByCategoryTitle() : searchFoodByCategory()
                break
            default:
                break
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleSearch}>
                <Icon
                    name={'search'}
                    type={'fontAwesome'}
                    color={theme.colors.deep01Primary}
                    style={{
                        marginRight: 10,
                    }}
                ></Icon>
            </TouchableOpacity>
            {/* 搜索输入框 */}
            {isPress ? (
                <TouchableOpacity onPress={handlePress}>
                    <TextInput {...commonInputProps} editable={false} />
                </TouchableOpacity>
            ) : (
                <TextInput {...commonInputProps} />
            )}

            {search && (
                <TouchableOpacity onPress={clearAll}>
                    <Icon
                        name={'close'}
                        type={'fontAwesome'}
                        size={20}
                        color={theme.colors.deep01Primary}
                    ></Icon>
                </TouchableOpacity>
            )}

            {type === 'search' && search === '' && (
                <TouchableOpacity onPress={gotoCamera}>
                    <Icon
                        name={'camera'}
                        type={'entypo'}
                        color={theme.colors.deep01Primary}
                        size={20}
                    ></Icon>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderColor: '#E1E1E1',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 13,
        paddingVertical: 10,
    },
})

export default SearchFilter
