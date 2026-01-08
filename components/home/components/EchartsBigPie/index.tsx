import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'
import Svg from 'react-native-svg'

import { screenWidth } from '@/common/common'
import { useHomeStore } from '@/store'
import { StyleSheet, Text, View } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'

interface IProps {
    children?: ReactNode
}

const EchartsBigPie: FC<IProps> = () => {
    const dailyIntake = useHomeStore((state) => state.dailyIntake)
    const dailyIntaked = useHomeStore((state) => state.dailyIntaked)

    console.log(dailyIntake, dailyIntaked)
    const sampleData = [
        Math.floor(
            (dailyIntaked?.calories || 0) / (dailyIntake?.calories || 1),
        ) || 0,
    ]

    return (
        <View style={styles.container}>
            <Svg width={screenWidth} height={200}>
                {/*摄入总量*/}
                <View style={styles.containerInfo}>
                    {((
                        (dailyIntake?.calories || 0) -
                        (dailyIntaked?.calories || 0)
                    )?.toFixed(0) as unknown as number) >= 0 ? (
                        <View>
                            <Text
                                style={{
                                    fontSize: 12,
                                    textAlign: 'center',
                                }}
                            >
                                今日需要摄入
                            </Text>
                            <Text
                                style={{
                                    fontSize: 30,
                                    textAlign: 'center',
                                }}
                            >
                                {(
                                    (dailyIntake?.calories || 0) -
                                    (dailyIntaked?.calories || 0)
                                )?.toFixed(0)}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    textAlign: 'center',
                                }}
                            >
                                千卡
                            </Text>
                        </View>
                    ) : !(isNaN(
                          (dailyIntake?.calories || 0) -
                              (dailyIntaked?.calories || 0),
                      ) as unknown as number) ? (
                        <View>
                            <Text
                                style={{
                                    fontSize: 12,
                                    textAlign: 'center',
                                }}
                            >
                                摄入超过了
                            </Text>
                            <Text
                                style={{
                                    fontSize: 30,
                                    textAlign: 'center',
                                }}
                            >
                                {(
                                    (dailyIntake?.calories ||
                                        0 - (dailyIntaked?.calories || 0)) * -1
                                )?.toFixed(0)}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    textAlign: 'center',
                                }}
                            >
                                千卡
                            </Text>
                        </View>
                    ) : (
                        <View>
                            <Text
                                style={{
                                    fontSize: 12,
                                    textAlign: 'center',
                                }}
                            >
                                今日需要摄入
                            </Text>
                            <Text
                                style={{
                                    fontSize: 30,
                                    textAlign: 'center',
                                }}
                            >
                                {(dailyIntake?.calories || 0)?.toFixed(0)}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    textAlign: 'center',
                                }}
                            >
                                千卡
                            </Text>
                        </View>
                    )}
                </View>
                <ProgressChart
                    width={screenWidth}
                    height={200}
                    data={{
                        data: sampleData, // You need to replace 0.7 with your real progress value
                    }}
                    chartConfig={{
                        backgroundColor: 'white',
                        backgroundGradientFrom: 'white',
                        backgroundGradientTo: 'white',
                        color: (opacity = 1) =>
                            `rgba(255, 122, 129,${opacity})`,
                        strokeWidth: 2,
                        decimalPlaces: 2, // optional, defaults to 2dp
                    }}
                    hideLegend={true}
                    radius={62}
                />
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: screenWidth,
        height: 150,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerInfo: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: '-50%' }],
        left: 0,
        right: 0,
    },
})
export default memo(EchartsBigPie)
