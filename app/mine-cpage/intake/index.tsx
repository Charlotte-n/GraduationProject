import { screenHeight } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import IntakeDetail from '@/components/mine/cpages/intake-detail'
import IntakeTotal from '@/components/mine/cpages/intake-total'
import { useHome } from '@/hooks/useHome'
import { useHomeStore } from '@/store'
import { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

export default function Intake() {
    const {GetDailyIntakeList} = useHome()
    const {IntakeFoodList, total} = useHomeStore.getState()


    useEffect(() => {
        GetDailyIntakeList()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <View
                style={{
                    height: screenHeight,
                    justifyContent: 'flex-end',
                }}
            >
                <AutoText
                    fontSize={7}
                    style={{
                        marginBottom: 8,
                    }}
                >
                    今日摄入
                </AutoText>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, marginBottom: 10 }}
                >
                    <IntakeDetail
                        IntakeFoodList={IntakeFoodList}
                        GetDailyIntake={GetDailyIntakeList}
                        total={total}
                    />
                </ScrollView>
                {total.length > 0 && (
                    <View style={styles.totalContainer}>
                        <IntakeTotal data={total} />
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    totalContainer: {
        paddingTop: 10,
        justifyContent: 'flex-end',
    },
})
