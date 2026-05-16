import { ClockCalendarApi } from '@/apis'
import type { ClockCalendarParams } from '@/apis/types'
import AutoText from '@/common/components/AutoText'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { Button } from '@rneui/base'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { StyleSheet, ToastAndroid, View } from 'react-native'
import { Calendar } from 'react-native-calendars'

const getPrevDay = (date: string) => {
    return moment(date).subtract(1, 'days').format('YYYY-MM-DD')
}

const getNextDay = (date: string) => {
    return moment(date).add(1, 'days').format('YYYY-MM-DD')
}

export default function CalendarPage() {
    const { name, id } = useLocalSearchParams()
    const [date, setDate] = useState({})
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const router = useRouter()

    const clock = () => {
        router.navigate(`/more-cpages/group/c-pages/clock?id=${id}`)
    }

    const ClockCalendar = () => {
        const ClockCalendarBody: ClockCalendarParams = {
            userId: userInfo.id as number,
            groupId: Number(id),
        }

        ClockCalendarApi(ClockCalendarBody)
            .then((res) => {

                console.log(res.data)
                const dates = (res.data as unknown as string)
                    .split('|')
                    .filter((item) => item !== ' ' && item !== 'null')
                    .map((item) => item.trim())
                    .sort()  // 排序，确保顺序正确

                const markedDates: any = {}
                dates.forEach((date, index) => {
                    const isFirst = index === 0 || dates[index - 1] !== getPrevDay(date)
                    const isLast = index === dates.length - 1 || dates[index + 1] !== getNextDay(date)
                    console.log("isfirst", isFirst, isLast)

                    markedDates[date] = {
                        color: theme.colors.deep01Primary,
                        textColor: 'white',
                        startingDay: isFirst,  // 是否是连续段的开始
                        endingDay: isLast,     // 是否是连续段的结束
                    }
                })

                // 只调用一次 setDate
                setDate(markedDates)
            })
            .catch((err) => {
                ToastAndroid.show('获取打卡记录失败', ToastAndroid.SHORT)
                console.log(err)
            })
    }

    useEffect(() => {
        ClockCalendar()
    }, [])
    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                title: "打卡日历",
                headerShown: true,
                headerStyle: { backgroundColor: theme.colors.deep01Primary },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',

            }} />
            <View style={styles.titleContainer}>
                <AutoText
                    fontSize={6}
                    style={{
                        textAlign: 'center',
                    }}
                >
                    {name ? name : '日历'}
                </AutoText>
            </View>
            <Calendar
                style={styles.calendar}
                initialDate={moment(new Date()).format('YYYY-MM-DD')}
                theme={{
                    todayTextColor: theme.colors.deep01Primary,
                    arrowColor: theme.colors.deep01Primary,
                }}
                markingType={'period'}
                minDate={moment(new Date()).format('YYYY-MM-DD')}
                monthFormat={'yyyy-MM-dd'}
                firstDay={1}
                enableSwipeMonths={true}
                markedDates={date}
                onPressArrowLeft={(subtractMonth) => subtractMonth()}
                onPressArrowRight={(addMonth) => addMonth()}
            />
            <View style={styles.dotContainer}>
                <View style={styles.dot}></View>
                <AutoText>已经打卡</AutoText>
            </View>
            <Button buttonStyle={styles.button} containerStyle={styles.buttonContainer} title="打卡" onPress={clock} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingVertical: 10,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    calendar: {
        marginBottom: 20,
    },
    dotContainer: {
        marginLeft: 50,
        flexDirection: 'row',
        marginBottom: 20,
    },
    dot: {
        width: 20,
        height: 20,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: theme.colors.deep01Primary,
    },
    button: {
        width: '50%',
        margin: 'auto',
        backgroundColor: theme.colors.deep01Primary,
    },
    buttonContainer: {
        backgroundColor: theme.colors.deep01Primary,
        width: '50%',
        margin: 0,
        alignSelf: 'center',
        borderRadius: 20,
    },
})
