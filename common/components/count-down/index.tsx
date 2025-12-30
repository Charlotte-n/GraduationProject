import { windowWidth } from '@/common/common'
import theme from '@/styles/theme/color'
import { PropsWithChildren, useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'

interface Props {
    defaultTime: number
    getTime: (time: number) => void
}

export default function CountDown({
    defaultTime = 120,
    getTime,
}: PropsWithChildren<Props>) {
    const [time, setTime] = useState(defaultTime)

    useEffect(() => {
        const inter = setInterval(() => {
            if (time <= 0) {
                getTime(time)
                inter && clearInterval(inter)
            }
            setTime(time - 1)
        }, 1000)
        return () => clearInterval(inter)
    }, [])

    return <Text style={styles.TimeText}>{time}s</Text>
}

const styles = StyleSheet.create({
    TimeText: {
        borderRadius: 30,
        paddingVertical: 11,
        width: windowWidth / 3,
        fontSize: 15,
        borderStyle: 'solid',
        backgroundColor: theme.colors.deep01Primary,
        color: 'white',
        textAlign: 'center',
        alignContent: 'flex-end',
    },
})
