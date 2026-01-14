import { windowHeight } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import Container from '@/common/components/container'
import { useDietStore } from '@/store'
import theme from '@/styles/theme/color'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function RecognizeFood() {
    const recognizeFoodList = useDietStore((state) => state.recognizeFoodList)
    return (
        <Container>
            <View style={styles.container}>
                {recognizeFoodList &&
                    recognizeFoodList.length > 0 &&
                    (recognizeFoodList[0].name !== '非菜' ? (
                        <View style={styles.nonVegetableContainer}>
                            {recognizeFoodList.map((item, index) => (
                                <View
                                    style={styles.nonVegetableItem}
                                    key={index}
                                >
                                    <View style={styles.info}>
                                        <AutoText
                                            numberOfLines={1}
                                            style={{
                                                width: 120,
                                            }}
                                        >
                                            {item.name}
                                        </AutoText>
                                        <Text style={{ fontSize: 12 }}>
                                            {item.calorie}Kcal/100g
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Image
                                style={{
                                    width: 200,
                                    height: 200,
                                    marginBottom: 20,
                                }}
                                source={require('@/assets/images/search.png')}
                            />
                            <AutoText fontSize={6}>不能识别到该食物</AutoText>
                        </View>
                    ))}
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    nonVegetableContainer: {
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    nonVegetableItem: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderWidth: 1,
        borderColor: theme.colors.deep01Primary,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    vegetableContainer: {
        flex: 1,
        backgroundColor: 'blue',
    },
    info: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight - 200,
    },
})
