import AutoText from '@/common/components/AutoText'
import theme from '@/styles/theme/color'
import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

enum TYPE {
    FOOD = 0,
    RECIPE = 1,
}

// 配置数据
const COLLECT_ITEMS = [
    { id: 'food', label: '食物收藏', type: TYPE.FOOD },
    { id: 'recipe', label: '食谱收藏', type: TYPE.RECIPE },
] as const

export default function Collect() {
    const router = useRouter()

    const handlePress = (type: typeof TYPE.FOOD | typeof TYPE.RECIPE) => {
        router.navigate(
            `/mine-cpage/collect/cpages/recipe-collect?type=${type}`,
        )
    }

    return (
        <View style={[styles.container]}>
            {COLLECT_ITEMS.map((item, index) => (
                <TouchableOpacity
                    key={item.id}
                    style={[
                        styles.button,
                        index !== COLLECT_ITEMS.length - 1 &&
                            styles.buttonMargin,
                    ]}
                    onPress={() => handlePress(item.type)}
                >
                    <AutoText>{item.label}</AutoText>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    button: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: theme.colors.deep01Primary,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonMargin: {
        marginBottom: 20,
    },
})
