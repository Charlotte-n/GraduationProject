import { getDailyIntakeApi } from '@/apis'
import { screenHeight } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import IntakeDetail from '@/components/mine/cpages/intake-detail'
import IntakeItem from '@/components/mine/cpages/intake-item'
import IntakeTotal from '@/components/mine/cpages/intake-total'
import { useHomeStore, useLoginRegisterStore } from '@/store'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, ToastAndroid, View } from 'react-native'

interface IntakeItem {
    id: number
}

type IntakeFood = [IntakeItem[], IntakeItem[], IntakeItem[]]

export default function Intake() {
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const setDailyIntake = useHomeStore((state) => state.setDailyIntake)
    const [IntakeFoodList, setIntakeFoodList] = useState<IntakeFood>([
        [],
        [],
        [],
    ] as IntakeFood)
    const [total, setTotal] = useState<number[]>([] as number[])

    const GetDailyIntake = () => {
        getDailyIntakeApi(userInfo?.id as number)
            .then((res) => {
                const result = [
                    res.data.breakfast,
                    res.data.lunch,
                    res.data.dinner,
                ]

                //获取热量
                const dailyIntaked = {
                    fat: res.data.calories[2],
                    calories: res.data.calories[4],
                    carbohydrate: res.data.calories[1],
                    protein: res.data.calories[0],
                    cellulose: res.data.calories[3],
                }

                setDailyIntake(dailyIntaked)
                setIntakeFoodList(result as IntakeFood)
                setTotal(res.data.calories)
            })
            .catch((err) => {
                ToastAndroid.show('获取今日摄入失败', ToastAndroid.SHORT)
                console.log(err)
            })
    }

    useEffect(() => {
        GetDailyIntake()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <View
                style={{
                    height: screenHeight,
                    justifyContent: 'flex-end',
                }}
            >
                <AutoText
                    fontSize={7}
                    style={{
                        marginBottom: 8,
                    }}
                >
                    今日摄入
                </AutoText>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, marginBottom: 10 }}
                >
                    <IntakeDetail
                        IntakeFoodList={IntakeFoodList}
                        GetDailyIntake={GetDailyIntake}
                        total={total}
                    />
                </ScrollView>
                {total.length > 0 && (
                    <View style={styles.totalContainer}>
                        <IntakeTotal data={total} />
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    totalContainer: {
        paddingTop: 10,
        justifyContent: 'flex-end',
    },
})
