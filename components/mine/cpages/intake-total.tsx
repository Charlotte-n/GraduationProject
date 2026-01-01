import theme from '@/styles/theme/color'
import { Icon } from '@rneui/themed'
import { Fragment, memo, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface IntakeTotalProps {
    data: number[]
}

const IntakeTotal = ({ data }: IntakeTotalProps) => {
    const [isVisible, setIsVisible] = useState(false)
    return (
        <Fragment>
            <View style={styles.totalContainer}>
                <Text>合计:</Text>
                <Text style={styles.totalText}>
                    {data[4]?.toFixed(2) || 0}kcal
                </Text>
            </View>
            <TouchableOpacity
                style={styles.visibleButton}
                onPress={() => setIsVisible(!isVisible)}
            >
                <Text style={{ fontWeight: '800' }}>查看营养分析</Text>
                <Icon
                    type={'antdesign'}
                    name={isVisible ? 'down' : 'up'}
                    size={15}
                />
            </TouchableOpacity>
            {isVisible && (
                <View>
                    <Text>蛋白质: {data[0]?.toFixed(2) || 0}kcal</Text>
                    <Text>碳水化合物: {data[1]?.toFixed(2) || 0}kcal</Text>
                    <Text>脂肪: {data[2]?.toFixed(2) || 0}kcal</Text>
                    <Text>纤维素:{data[3]?.toFixed(2) || 0}kcal</Text>
                </View>
            )}
        </Fragment>
    )
}

const styles = StyleSheet.create({
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalText: {
        fontSize: 18,
        color: theme.colors.deep01Primary,
        marginLeft: 10,
    },
    visibleButton: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default memo(IntakeTotal)
