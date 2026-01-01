import { addCaloriesApi, FoodListByCategoryApi } from '@/apis'
import type {
    CaloriesBodyData,
    FoodListByCategoryType,
    SingleFoodListType,
} from '@/apis/types'
import AutoText from '@/common/components/AutoText'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { Icon } from '@rneui/themed'
import { useEffect, useState } from 'react'
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'

interface IntakeItemProps {
    time: number
    data: SingleFoodListType
    GetDailyIntake: () => void
}

const IntakeItem = ({ time, data, GetDailyIntake }: IntakeItemProps) => {
    const [foodDetail, setFoodDetail] = useState<SingleFoodListType>(
        [] as SingleFoodListType,
    )
    const { userInfo } = useLoginRegisterStore.getState()

    const getFoodDetail = () => {
        FoodListByCategoryApi({ id: data.id })
            .then((res) => {
                if (res.code === 1 || res.data) {
                    setFoodDetail((res.data as FoodListByCategoryType).foods[0])
                }
            })
            .catch((err) => {
                ToastAndroid.show('获取食物详情失败', ToastAndroid.SHORT)
                console.log(err)
            })
    }

    useEffect(() => {
        getFoodDetail()
    }, [])

    const changeFood: CaloriesBodyData = {
        calories: foodDetail?.calories || (0 as number),
        foodId: foodDetail?.id as number,
        id: userInfo.id as number,
        cellulose: foodDetail?.cellulose || (0 as number),
        protein: foodDetail?.protein || (0 as number),
        fat: foodDetail?.fat || (0 as number),
        carbohydrate: foodDetail?.carbohydrate || (0 as number),
        operator: 0,
        type: time,
        g: 100,
    }

    const handleOperateFood = async (operation: 0 | 1) => {
        try {
            changeFood.operator = operation
            await addCaloriesApi(changeFood)
            await GetDailyIntake()
        } catch (err) {
            ToastAndroid.show('操作失败', ToastAndroid.SHORT)
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <AutoText
                    numberOfLines={1}
                    fontSize={4.3}
                    style={{
                        width: 100,
                    }}
                >
                    {foodDetail?.title || ''}
                </AutoText>
                <AutoText
                    numberOfLines={1}
                    fontSize={4.3}
                    style={{
                        marginTop: 5,
                        width: 100,
                    }}
                >
                    {foodDetail?.calories || 0}Kcal/100g
                </AutoText>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity onPress={() => handleOperateFood(0)}>
                    <Icon
                        type={'antdesign'}
                        name={'minus-circle'}
                        size={20}
                        color={theme.colors.deep01Primary}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOperateFood(1)}>
                    <Icon
                        type={'antdesign'}
                        name={'plus-circle'}
                        size={20}
                        color={theme.colors.deep01Primary}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderStyle: 'solid',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
})

export default IntakeItem
