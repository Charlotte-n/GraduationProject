import { windowWidth } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import { forwardRef, memo, useImperativeHandle, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import TodayRecord from './today-record'

const recordText = ['记录了', '饮食记录', '吃多了']

interface Props {
    recordNumber: number[]
}

const CommunicateHeader = forwardRef(
    ({ recordNumber = [0, 0, 0] }: Props, ref) => {
        const [headerHeight, setHeaderHeight] = useState(0)

        const hanleOnLayout = (e: LayoutChangeEvent) => {
            setHeaderHeight(e.nativeEvent.layout.height)
        }

        useImperativeHandle(ref, () => ({
            getHeaderHeight: () => headerHeight,
        }))

        return (
            <View onLayout={hanleOnLayout}>
                {/* title */}
                <View style={styles.titleContainer}>
                    <AutoText
                        fontSize={7}
                        style={{
                            fontWeight: 800,
                            textAlign: 'center',
                            marginTop: 10,
                        }}
                    >
                        饮食圈
                    </AutoText>
                    <AutoText
                        style={{
                            color: '#937747',
                            textAlign: 'center',
                            marginTop: 10,
                        }}
                    >
                        和大家一起监督与交流饮食生活吧~
                    </AutoText>
                </View>
                {/* 统计记录 */}
                <View style={styles.statisticsContainer}>
                    <View style={styles.statisticsItem}>
                        <AutoText>我在本月圈内统计</AutoText>
                    </View>
                    {/* 记录的内容 */}
                    <View style={styles.statisticsContent}>
                        {(recordNumber ?? []).map((number, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.statisticsContentItem,
                                    { borderRightWidth: index === 2 ? 0 : 1 },
                                ]}
                            >
                                <AutoText
                                    style={{
                                        color: '#908E9D',
                                        marginBottom: 5,
                                    }}
                                >
                                    {recordText[index]}
                                </AutoText>
                                <AutoText
                                    style={{
                                        color: '#908E9D',
                                    }}
                                >
                                    {number}条
                                </AutoText>
                            </View>
                        ))}
                    </View>
                </View>
                {/* 今天的记录 */}
                <View style={styles.todayRecordContainer}>
                    <TodayRecord />
                </View>
            </View>
        )
    },
)

const styles = StyleSheet.create({
    titleContainer: {
        marginBottom: 20,
    },
    statisticsContainer: {
        borderWidth: 1,
        borderColor: '#CCC6B5',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#F9F6ED',
        marginBottom: 20,
    },
    statisticsItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#CCC6B5',
        paddingBottom: 10,
        marginBottom: 10,
    },
    statisticsContent: {
        flexDirection: 'row',
    },
    statisticsContentItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (windowWidth - 50) / 3,
        borderRightColor: '#CCC6B5',
    },
    todayRecordContainer: {
        marginBottom: 10,
    },
})

export default memo(CommunicateHeader)
