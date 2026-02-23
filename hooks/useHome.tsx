import { DailyIntakeApi, getDailyIntakeApi, getRandomRecipeApi } from '@/apis'
import { useHomeStore, useLoginRegisterStore } from '@/store'
import { IntakeItem, SingleFoodListType } from '@/types/home'
import { transformAdaption } from '@/utils/adaption'
import { Image } from '@rneui/themed'
import { useEffect, useMemo, useState } from 'react'
import { ToastAndroid } from 'react-native'



type IntakeFoodType = [IntakeItem[], IntakeItem[], IntakeItem[]]
export const useHome = () => {
    const [open, setOpen] = useState(false)
    const [RecipeFood, setRecipeFood] = useState<SingleFoodListType>([])
    const [dialogVisible, setDialogVisible] = useState(false)
    const dailyIntake = useHomeStore((state) => state.dailyIntake)
    const IntakeFoodList = useHomeStore((state) => state.IntakeFoodList)
    const { userInfo } = useLoginRegisterStore.getState()
    

    const GetDailyIntakeList = () => {
        getDailyIntakeApi(userInfo?.id as number)
            .then((res) => {
                const result = [
                    res.data.breakfast,
                    res.data.lunch,
                    res.data.dinner,
                ]

                const dailyIntaked = {
                    fat: res.data.calories[2],
                    calories: res.data.calories[4],
                    carbohydrate: res.data.calories[1],
                    protein: res.data.calories[0],
                    cellulose: res.data.calories[3],
                }


                useHomeStore.getState().setDailyIntake(dailyIntaked)
                useHomeStore.getState().setIntakeFoodList(result as IntakeFoodType)
                useHomeStore.getState().setTotal(res.data.calories as number[])
            })
            .catch((err) => {
                ToastAndroid.show('获取今日摄入失败', ToastAndroid.SHORT)
                console.log(err)
            })
    }



    //静态资源
    const foodList = useMemo(()=>{
        return  [
            {
                id: '0',
                icon: (
                    <Image
                        source={require('@/assets/icon/breakfast.png')}
                        style={{
                            width: transformAdaption(30),
                            height: transformAdaption(30),
                            marginRight: transformAdaption(10),
                        }}
                    ></Image>
                ),
                name: '早餐',
                recommend: (((dailyIntake?.calories || 0) * 2) / 5).toFixed(0),
                intakeFoodList: IntakeFoodList[0],
            },
            {
                id: '1',
                icon: (
                    <Image
                        source={require('@/assets/icon/lunch.png')}
                        style={{
                            width: transformAdaption(30),
                            height: transformAdaption(30),
                            marginRight: transformAdaption(10),
                        }}
                    ></Image>
                ),
                name: '午餐',
                recommend: (((dailyIntake?.calories || 0) * 2) / 5).toFixed(0),
                intakeFoodList: IntakeFoodList[1],
            },
            {
                id: '2',
                icon: (
                    <Image
                        source={require('@/assets/icon/fruit.png')}
                        style={{
                            width: transformAdaption(30),
                            height: transformAdaption(30),
                            marginRight: transformAdaption(10),
                        }}
                    ></Image>
                ),
                name: '晚餐',
                recommend: ((dailyIntake?.calories || 0) / 5).toFixed(0),
                intakeFoodList: IntakeFoodList[2],
            },
        ]
    },[IntakeFoodList,dailyIntake])

    const toggleDialog = async () => {
        const { height, weight, exercise = 0, target = 0 } = userInfo

        if (height && weight && exercise >= 0 && target >= 0) {
            //获取用户的每日摄入量，放入仓库存储
            try {
                const res = await DailyIntakeApi(userInfo.id as number)
                if (res.code === 1) {
                    useHomeStore.getState().setDailyIntake(res.data)
                    return setDialogVisible(false)
                } else {
                    ToastAndroid.show(
                        res?.msg || '获取每日摄入量失败',
                        ToastAndroid.SHORT,
                    )
                }
            } catch (error) {
                console.log(error)
                ToastAndroid.show('获取每日摄入量失败', ToastAndroid.SHORT)
            }
        }
        setDialogVisible(true)
    }

    //获取摄入列表
    const GetDailyIntake = () => {
        getDailyIntakeApi(userInfo.id as number)
            .then((res) => {
                if (res.code === 1) {
                    const dailyIntaked = {
                        fat: res.data.calories[2],
                        calories: res.data.calories[4],
                        carbohydrate: res.data.calories[1],
                        protein: res.data.calories[0],
                        cellulose: res.data.calories[3],
                    }
                    useHomeStore.getState().setDailyIntaked(dailyIntaked)
                } else {
                    ToastAndroid.show(
                        res?.msg || '获取摄入列表失败',
                        ToastAndroid.SHORT,
                    )
                }
            })
            .catch((error) => {
                console.log(error)
                ToastAndroid.show('获取摄入列表失败', ToastAndroid.SHORT)
            })
    }

    const getRecipeData = () => {
        getRandomRecipeApi()
            .then((res) => {
                if (res.code === 1) {
                    setRecipeFood(res.data)
                } else {
                    ToastAndroid.show(
                        res?.msg || '获取随机菜谱失败',
                        ToastAndroid.SHORT,
                    )
                }
            })
            .catch((error) => {
                console.log(error)
                ToastAndroid.show('获取随机菜谱失败', ToastAndroid.SHORT)
            })
    }

    const cancel = () => {
        setDialogVisible(false)
    }

    const handleDrawerToggle = (value: boolean) => {
        setOpen(value)
    }

    useEffect(() => {
        toggleDialog()
        getRecipeData()
        GetDailyIntakeList()
    }, [])

    useEffect(() => {
        GetDailyIntake()
    }, [dailyIntake])

    return {
        open,
        setOpen,
        RecipeFood,
        setRecipeFood,
        dialogVisible,
        setDialogVisible,
        foodList,
        dailyIntake,
        cancel,
        handleDrawerToggle,
        GetDailyIntakeList,
    }
}
