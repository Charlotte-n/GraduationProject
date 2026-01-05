import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Svg from 'react-native-svg'

import { screenWidth } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import { useHomeStore } from '@/store'
import { ProgressChart } from 'react-native-chart-kit'

interface IProps {
    children?: ReactNode
}

const EchartSmallPie: FC<IProps> = () => {
    const { dailyIntake, dailyIntaked } = useHomeStore()
    const sampleData = [
        [
            Math.floor(
                (dailyIntaked?.carbohydrate || 0) /
                    (dailyIntake?.carbohydrate || 1),
            ) || 0,
        ],
        [
            Math.floor(
                (dailyIntaked?.protein || 0) / (dailyIntake?.protein || 1),
            ) || 0,
        ],
        [Math.floor((dailyIntaked?.fat || 0) / (dailyIntake?.fat || 1)) || 0],
        [
            Math.floor(
                (dailyIntaked?.cellulose || 0) / (dailyIntake?.cellulose || 1),
            ) || 0,
        ],
    ]
    //以后这是一个动态的数据
    const data = [
        {
            key: '0',
            name: '碳水化合物',
        },
        {
            key: '1',
            name: '蛋白质',
        },
        {
            key: '2',
            name: '脂肪',
        },
        {
            key: '3',
            name: '纤维素',
        },
    ]
    const yuansu = ['carbohydrate', 'protein', 'fat', 'cellulose']

    console.log(sampleData)

    return (
        <View style={styles.container}>
            {data.map((item, index) => {
                return (
                    <View style={styles.containerItem} key={item.key}>
                        <Svg
                            width={screenWidth / 4 - 10}
                            height={90}
                            style={styles.containerItemSvg}
                        >
                            <View style={styles.containerItemSvgContent}>
                                <AutoText
                                    fontSize={4.5}
                                    style={{
                                        fontSize: 18,
                                        textAlign: 'center',
                                        left: 25,
                                        width: 30,
                                        top: -5,
                                    }}
                                >
                                    {(dailyIntaked as any)[
                                        yuansu[index]
                                    ]?.toFixed(0) || 0}
                                </AutoText>
                                <Text
                                    style={{
                                        fontSize: 9,
                                        textAlign: 'center',
                                        left: 25,
                                    }}
                                >
                                    千卡
                                </Text>
                            </View>

                            <ProgressChart
                                width={screenWidth / 4 - 10}
                                height={100}
                                radius={30}
                                data={sampleData[index]}
                                hideLegend={true}
                                chartConfig={{
                                    backgroundColor: 'white',
                                    backgroundGradientFrom: 'white',
                                    backgroundGradientTo: 'white',
                                    strokeWidth: 1,
                                    color: (opacity = 1) =>
                                        `rgba(255, 122, 129,${opacity})`,
                                }}
                            ></ProgressChart>
                        </Svg>
                        <View>
                            <AutoText
                                fontSize={4.5}
                                style={{
                                    fontSize: 12,
                                    textAlign: 'center',
                                }}
                            >
                                {item.name}
                            </AutoText>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    containerItem: {
        width: screenWidth / 4,
        position: 'relative',
        marginRight: 'auto',
    },
    containerItemSvg: {
        margin: 'auto',
    },
    containerItemSvgContent: {
        position: 'absolute',
        bottom: 30,
    },
})
export default memo(EchartSmallPie)
