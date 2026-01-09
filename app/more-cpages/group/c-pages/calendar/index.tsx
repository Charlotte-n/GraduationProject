import { ClockCalendarApi } from '@/apis'
import type { ClockCalendarParams } from '@/apis/types'
import AutoText from '@/common/components/AutoText'
import Container from '@/common/components/container'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { useLocalSearchParams } from 'expo-router'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { StyleSheet, ToastAndroid, View } from 'react-native'
import { Calendar } from 'react-native-calendars'

export default function CalendarPage() {
    const { name, id } = useLocalSearchParams()
    const [date, setDate] = useState({})
    const userInfo = useLoginRegisterStore((state) => state.userInfo)

    const ClockCalendar = () => {
        const ClockCalendarBody: ClockCalendarParams = {
            userId: userInfo.id as number,
            groupId: Number(id),
        }
        ClockCalendarApi(ClockCalendarBody)
            .then((res) => {
                console.log(res.data, res)
                if (res.code !== 1 || !res.data) {
                    ToastAndroid.show('获取打卡记录失败', ToastAndroid.SHORT)
                    return
                }
                res.data.datetime &&
                    res.data.datetime
                        .split('|')
                        .filter((item) => {
                            return item !== ' '
                        })
                        .map((value) => {
                            setDate((prevState) => {
                                ;(prevState as any)[value.trim()] = {
                                    selectedColor: theme.colors.deep01Primary,
                                    selected: true,
                                }
                                return prevState
                            })
                        })
            })
            .catch((err) => {
                ToastAndroid.show('获取打卡记录失败', ToastAndroid.SHORT)
                console.log(err)
            })
    }

    useEffect(() => {
        ClockCalendar()
    }, [date])
    return (
        <Container>
            <View style={styles.container}>
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
            </View>
        </Container>
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
    },
    dot: {
        width: 20,
        height: 20,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: theme.colors.deep01Primary,
    },
})
