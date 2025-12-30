import theme from '@/styles/theme/color'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Icon } from '@rneui/themed'
import moment from 'moment'
import type { FC, ReactNode } from 'react'
import React, { memo, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
interface IProps {
    children?: ReactNode
    birth: any
    setBirth: any
    height?: number
    fontSize?: number
}

const DatePicker: FC<IProps> = ({ birth, setBirth, height, fontSize }) => {
    const [date, setDate] = useState(() => new Date(1598051730000))
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [currentDate, setCurrentDate] = useState('')
    const onChange = (event: any, selectedDate: any) => {
        if (event.type === 'dismissed') {
            setShow(false)
        } else {
            setShow(false)
            setBirth(moment(selectedDate).format('YYYY-MM-DD'))
            setCurrentDate(moment(selectedDate).format('YYYY-MM-DD'))
        }
    }

    //刚开始的生日日期
    useEffect(() => {
        if (birth) {
            setCurrentDate(birth[0] + '-' + '0' + birth[1] + '-' + birth[2])
        } else {
            setBirth(moment(date).format('YYYY-MM-DD'))
        }
    }, [])
    useEffect(() => {
        setBirth(currentDate)
    }, [currentDate])
    return (
        <TouchableOpacity
            onPress={() => setShow(true)}
            style={[styles.container, { height: height ? height : 59 }]}
        >
            <Text
                style={{
                    fontSize: fontSize ? fontSize : 15,
                    fontWeight: '300',
                    flex: 1,
                }}
            >
                出生日期
            </Text>
            <View style={styles.content}>
                <Text
                    style={{
                        fontSize: fontSize ? fontSize : 15,
                        fontWeight: '300',
                    }}
                >
                    {currentDate
                        ? currentDate
                        : String(moment(date).format('YYYY-MM-DD'))}
                </Text>
                <Icon
                    type={'antdesign'}
                    name={'caret-down'}
                    size={10}
                    color={'#666666'}
                    style={{
                        marginLeft: 10,
                        marginRight: 15,
                    }}
                ></Icon>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    display="spinner"
                    value={date}
                    //@ts-ignore
                    mode={mode}
                    is24Hour={false}
                    onChange={onChange}
                    style={{
                        backgroundColor: theme.colors.deep01Primary,
                    }}
                />
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: '#F1F3F4',
        alignItems: 'center',
        flexDirection: 'row',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default memo(DatePicker)
