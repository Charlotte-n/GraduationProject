import { windowWidth } from '@/common/common'
import theme from '@/styles/theme/color'
import { SingleFoodListType } from '@/types/home'
import { Icon } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HotRecommendItem from './hotRecommendItem'

interface HotRecommendProps {
    title: string
    data: SingleFoodListType
}

const hotRecommend = ({ title, data }: HotRecommendProps) => {
    const router = useRouter()
    const handlePress = () => {}
    const handleMorePress = () => {}

    return (
        <View>
            {title && (
                <View style={styles.container}>
                    <Text
                        style={{
                            marginRight: 2,
                            width: 2,
                            height: 10,
                            borderWidth: 2,
                            borderColor: theme.colors.deep01Primary,
                            borderRadius: 20,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 15,
                        }}
                    >
                        {title}
                    </Text>
                </View>
            )}

            {data.length > 0 && (
                <View style={styles.foodListContainer}>
                    {data.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={{
                                width: (windowWidth - 30) / 3,
                            }}
                            onPress={handlePress}
                        >
                            <HotRecommendItem data={item} />
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <TouchableOpacity
                style={styles.moreButton}
                onPress={handleMorePress}
            >
                <Text
                    style={{
                        fontSize: 14,
                    }}
                >
                    更多
                </Text>
                <Icon type="antdesign" name="right" size={14} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    foodListContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    moreButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
})

export default memo(hotRecommend)
