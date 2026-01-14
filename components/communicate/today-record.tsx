import AutoText from '@/common/components/AutoText'
import { useRouter } from 'expo-router'
import { memo } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const dateMap = ['日', '一', '二', '三', '四', '五', '六']

const TodayRecord = () => {
    const router = useRouter()

    const gotoRecordToday = () => {
        router.navigate('/more-cpages/communicate/c-pages/record-today')
    }

    return (
        <>
            <View style={styles.todayRecordContainer}>
                <AutoText
                    style={{
                        fontFamily: 'RunXing',
                        fontWeight: 800,
                        flex: 1,
                    }}
                >
                    写下今天的记录:
                </AutoText>
                <AutoText
                    style={{
                        color: '#967133',
                        fontWeight: 800,
                    }}
                >
                    {new Date().getMonth() +
                        1 +
                        '月' +
                        new Date().getDate() +
                        '日 '}

                    {'星期' + dateMap[Number(new Date().getDay())]}
                </AutoText>
            </View>
            <TouchableOpacity onPress={gotoRecordToday}>
                <View style={styles.recordTodayContainer}>
                    <AutoText
                        fontSize={4.5}
                        style={{
                            color: '#CBD7CB',
                        }}
                    >
                        <Image
                            style={{
                                width: 10,
                                height: 10,
                                marginRight: 10,
                            }}
                            source={require('@/assets/icon/write.png')}
                        />
                        <Text
                            style={{
                                color: '#CBD7CB',
                                fontSize: 16,
                            }}
                        >
                            写下今天吃了什么与此刻的心情
                        </Text>
                    </AutoText>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    todayRecordContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    recordTodayContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#A2C098',
        paddingHorizontal: 10,
        paddingVertical: 10,
        minHeight: 80,
        backgroundColor: '#F2FCF1',
        borderRadius: 10,
    },
})

export default memo(TodayRecord)
