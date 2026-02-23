import {
    addCaloriesApi,
    FoodListByCategoryApi
} from '@/apis'
import { CaloriesBodyData, FoodListByCategoryType } from '@/apis/types'
import { screenWidth } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import { FoodNutrition, FoodNutritionData, foodTime } from '@/constants/diet'
import { useHome } from '@/hooks/useHome'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { SingleFoodItemType } from '@/types/home'
import { BottomSheet, Button, Card, Dialog, Icon } from '@rneui/themed'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'
import WheelPicker from 'react-native-wheely'

interface RecordFoodProps {
    isVisible: boolean
    onClose: () => void
    id: number
    time?: number
    showDelete?: boolean
}

const RecordFood = ({ isVisible, onClose, id, time, showDelete = false }: RecordFoodProps) => {
    const [visible, setVisible] = useState(false)
    const [foodDetail, setfoodDetail] = useState<SingleFoodItemType>(
        {} as SingleFoodItemType,
    )
    const g = useRef(100)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const { id: userId } = useLoginRegisterStore((state) => state.userInfo)
    const { GetDailyIntakeList } = useHome()

    const cardContainerStyle = {
        width: screenWidth,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        margin: 0,
    }

    const handleChangeQuantity = (text: string) => {
        g.current = Number(text)
    }

    const handleVisible = (value: boolean) => {
        setVisible(value)
    }

    const handleFoodNamePress = () => {
        onClose()
        //TODO 食物营养
    }

    const handleSave = () => {
        changeFoodOperator(1)
    }

    const danwei = (value: string | number) => {
        return Number(((Number(value) / 100) * g.current).toFixed(2))
    }

    // 获取食物详情
    const getfoodDetail = () => {
        FoodListByCategoryApi({ id })
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('获取食物详情失败', ToastAndroid.SHORT)
                    return
                }
                setfoodDetail((res.data as FoodListByCategoryType).foods[0])
            })
            .catch((err) => {
                ToastAndroid.show('获取食物详情失败', ToastAndroid.SHORT)
                console.log(err)
            })
    }


    const changeFood: CaloriesBodyData = useMemo(() => {
        return {
            fat: danwei(foodDetail.fat as number), //脂肪
            calories: danwei(foodDetail.calories as number), //热量
            carbohydrate: danwei(foodDetail.carbohydrate as number), //碳水化合物
            cellulose: danwei(foodDetail.cellulose as number), //纤维素
            type: time || selectedIndex, //时间
            protein: danwei(foodDetail.protein as number), //蛋白质
            id: userId as number, //用户id
            foodId: foodDetail.id as number, //食物id
            operator: 1,
            g: g.current || 0, //克数
        }
    }, [foodDetail, time, selectedIndex, userId, g.current])


    const changeFoodOperator = (operator: 0 | 1) => {
        changeFood.operator = operator
        addCaloriesApi(changeFood)
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show(operator === 1 ? '添加失败' : '删除失败', ToastAndroid.SHORT)
                    return
                }
                ToastAndroid.show(operator === 1 ? '添加成功' : '删除成功', ToastAndroid.SHORT)
                GetDailyIntakeList()
                onClose()
                g.current = 100
            })
            .catch((err) => {
                ToastAndroid.show(operator === 1 ? '添加失败' : '删除失败', ToastAndroid.SHORT)
                console.log(err)
            })
    }

    useEffect(() => {
        getfoodDetail()
        return () => onClose()
    }, [isVisible])

    return (
        <BottomSheet isVisible={isVisible}>
            <Card containerStyle={cardContainerStyle}>
                {/* delete and close and icon */}
                <View style={styles.topContainer}>
                    {
                        showDelete && (
                            <TouchableOpacity style={styles.deleteContainer} onPress={() => changeFoodOperator(0)}>
                                <AutoText fontSize={4.5} style={{ color: theme.colors.deep01Primary }}>删除此记录</AutoText>
                            </TouchableOpacity>
                        )
                    }
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => {
                            handleVisible(true)
                        }}
                    >
                        <Text style={styles.iconText}>
                            {foodTime[time || selectedIndex]}
                        </Text>
                        <Icon type={'antdesign'} name={'down'} size={15} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose}>
                        <Icon type={'antdesign'} name={'close'} size={20} />
                    </TouchableOpacity>
                </View>
                {/* 食物 */}
                <View style={styles.foodContainer}>
                    {foodDetail?.image && (
                        <Image
                            source={{ uri: foodDetail.image }}
                            style={styles.foodImage}
                        />
                    )}
                    <TouchableOpacity
                        style={styles.foodNameContainer}
                        onPress={handleFoodNamePress}
                    >
                        <AutoText
                            fontSize={4.5}
                            style={{
                                flex: 1,
                                textAlign: 'center',
                            }}
                            numberOfLines={1}
                        >
                            {foodDetail?.title}
                        </AutoText>
                        <Icon type={'antdesign'} name={'right'} size={13} />
                    </TouchableOpacity>
                </View>
                {/* 营养成分 */}
                <View style={styles.nutritionContainer}>
                    {FoodNutritionData.map((item, index) => {
                        return (
                            <View
                                key={item}
                                style={styles.nutritionItemContainer}
                            >
                                <AutoText
                                    fontSize={4.5}
                                    style={{
                                        textAlign: 'center',
                                    }}
                                >
                                    {(FoodNutrition as any)[item]}
                                </AutoText>
                                <AutoText
                                    fontSize={4.5}
                                    style={{
                                        textAlign: 'center',
                                    }}
                                >
                                    {(foodDetail as any)[item]
                                        ? (foodDetail as any)[item]?.toFixed(2)
                                        : 0}
                                </AutoText>
                            </View>
                        )
                    })}
                </View>
                {/* 数量 */}
                <View style={styles.quantityContainer}>
                    <TextInput
                        placeholder="请输入数量"
                        style={styles.quantityInput}
                        defaultValue={g.current.toString()}
                        onChangeText={handleChangeQuantity}
                    />
                    <Text style={styles.quantityUnit}>克</Text>
                </View>
                {/* 计算器组件 */}
                <View style={styles.calculatorContainer}>
                    <Button
                        title="保存"
                        containerStyle={{
                            width: screenWidth / 4,
                            borderRadius: 20,
                        }}
                        buttonStyle={{
                            backgroundColor: theme.colors.deep01Primary,
                            paddingVertical: 5,
                        }}
                        onPress={handleSave}
                    ></Button>
                </View>
            </Card>
            <Dialog isVisible={visible}>
                <TouchableOpacity
                    onPress={() => handleVisible(false)}
                    style={{
                        alignItems: 'flex-end',
                    }}
                >
                    <Icon type={'antdesign'} name={'close'} />
                </TouchableOpacity>
                {/* 选择器 */}
                <WheelPicker
                    selectedIndex={selectedIndex}
                    options={foodTime}
                    onChange={(index) => {
                        setSelectedIndex(index)
                    }}
                />
                <Dialog.Actions>
                    <Dialog.Button
                        title="确定"
                        titleStyle={{
                            color: theme.colors.deep01Primary,
                        }}
                        onPress={() => handleVisible(false)}
                    />
                    <Dialog.Button
                        title="取消"
                        titleStyle={{
                            color: theme.colors.deep01Primary,
                        }}
                        onPress={() => handleVisible(false)}
                    />
                </Dialog.Actions>
            </Dialog>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    deleteContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
    },
    topContainer: {
        flexDirection: 'row',
        margin: 'auto',
        marginBottom: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 20,
    },
    iconText: {
        textAlign: 'center',
        marginRight: 10,
    },
    foodContainer: {
        margin: 'auto',
        alignItems: 'center',
    },
    foodImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginBottom: 20,
    },
    foodNameContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 3,
        paddingRight: 3,
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        width: 100,
    },
    nutritionContainer: {
        flexDirection: 'row',
    },
    nutritionItemContainer: {
        width: screenWidth / 4.4,
        justifyContent: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f4f4f4',
        paddingVertical: 10,
        marginBottom: 20,
    },
    quantityContainer: {
        margin: 'auto',
        marginBottom: 20,
    },
    quantityInput: {
        fontSize: 22,
        color: theme.colors.deep01Primary,
        borderColor: theme.colors.deep01Primary,
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingBottom: 2,
        marginBottom: 5,
    },
    quantityUnit: {
        fontSize: 12,
        color: theme.colors.deep01Primary,
        textAlign: 'center',
    },
    calculatorContainer: {
        margin: 'auto',
        // marginBottom: 20,
    },
})

export default memo(RecordFood)
