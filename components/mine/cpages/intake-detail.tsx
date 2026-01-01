import AutoText from '@/common/components/AutoText'
import { useHomeStore } from '@/store'
import theme from '@/styles/theme/color'
import { Fragment, memo, useMemo } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import IntakeItem from './intake-item'

interface IntakeDetailProps {
    IntakeFoodList: IntakeFood
    GetDailyIntake: () => void
    total: number[]
}

interface IntakeItem {
    id: number
}

type IntakeFood = [IntakeItem[], IntakeItem[], IntakeItem[]]

const time = ['早餐', '午餐', '晚餐']

const IntakeDetail = ({
    IntakeFoodList,
    GetDailyIntake,
    total,
}: IntakeDetailProps) => {
    const dailyIntake = useHomeStore((state) => state.dailyIntake)

    const eatMore = useMemo(() => {
        const calories = dailyIntake?.calories || 0
        const totalCalories = total[4] || 0
        return Number((calories - totalCalories).toFixed(0))
    }, [dailyIntake?.calories, total])

    const goToCategory = () => {
        //TODO: 跳转至食物分类页面
    }

    return (
        <Fragment>
            {IntakeFoodList.length > 0 ? (
                IntakeFoodList.map((list, index) => {
                    if (!list || !Array.isArray(list)) return null
                    return (
                        <View key={index}>
                            <AutoText
                                style={{
                                    marginBottom: 10,
                                }}
                            >
                                {time[index]}
                            </AutoText>
                            {list.map((item, index) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={{
                                        marginBottom: 10,
                                    }}
                                    onPress={() => {
                                        console.log(item)
                                    }}
                                >
                                    <IntakeItem
                                        time={index}
                                        data={item}
                                        GetDailyIntake={GetDailyIntake}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )
                })
            ) : (
                <ActivityIndicator
                    style={{
                        backgroundColor: theme.colors.primary,
                    }}
                ></ActivityIndicator>
            )}

            <View style={styles.intakeMore}>
                {eatMore >= 0 ? (
                    <View style={styles.intakeRow}>
                        <AutoText style={styles.intakeText}>
                            今日还可摄入 {eatMore} 千卡
                        </AutoText>
                        <TouchableOpacity onPress={goToCategory}>
                            <AutoText style={styles.addButtonText}>
                                去添加&gt;
                            </AutoText>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <AutoText>
                        今日摄入已经超过 {Math.abs(eatMore)} 千卡
                    </AutoText>
                )}
            </View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    intakeMore: {
        alignItems: 'flex-end',
    },
    intakeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    intakeText: {
        marginRight: 10,
    },
    addButtonText: {
        color: theme.colors.deep01Primary,
    },
})

export default memo(IntakeDetail)
