import AutoText from '@/common/components/AutoText'
import theme from '@/styles/theme/color'
import { transformAdaption } from '@/utils/adaption'
import { Icon } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { memo, type ReactNode } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

interface FoodByTimeProps {
    image: ReactNode
    type?: number
    baseData: {
        name: string
        recommend: string
    }
}

const FoodByTime = ({ image, baseData, type }: FoodByTimeProps) => {
    const { name, recommend } = baseData
    const router = useRouter()

    const handleGoAddPage = () => {
        router.navigate(`/diet-cpages/food-category?type=${type || 0}`)
    }
    return (
        <View style={styles.container}>
            {/* 图片 */}
            {image}
            <View style={{ flex: 1 }}>
                <AutoText
                    fontSize={5}
                    style={{
                        marginBottom: 5,
                    }}
                >
                    {name}
                </AutoText>
                <AutoText
                    style={{
                        color: '#B6B5BB',
                    }}
                    fontSize={4.3}
                >
                    推荐{recommend || ''}千卡
                </AutoText>
            </View>
            <TouchableOpacity onPress={handleGoAddPage}>
                <Icon
                    type={'antdesign'}
                    name={'plus-circle'}
                    size={transformAdaption(28)}
                    color={theme.colors.deep01Primary}
                    style={{
                        marginLeft: 5,
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: theme.colors.secondary,
        marginTop: transformAdaption(5),
        paddingVertical: transformAdaption(15),
        paddingHorizontal: transformAdaption(5),
    },
})

export default memo(FoodByTime)
