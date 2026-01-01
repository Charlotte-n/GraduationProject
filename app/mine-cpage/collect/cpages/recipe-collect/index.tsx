import { getCollectContentApi } from '@/apis'
import { windowHeight } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { Card } from '@rneui/themed'
import { Image } from 'expo-image'
import { useLocalSearchParams, useRouter } from 'expo-router/build/hooks'
import { useEffect, useState } from 'react'
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

enum Type {
    FOOD = 0,
    RECIPE = 1,
}

interface Dish {
    id: number
    name: string
    image: string
    title: string
}

export default function RecipeCollect() {
    const [refresh, setRefresh] = useState(false)
    const { type } = useLocalSearchParams()
    const { userInfo } = useLoginRegisterStore.getState()
    const [dishes, setDishes] = useState<Dish[]>([] as Dish[])
    const router = useRouter()
    const insets = useSafeAreaInsets()
    const getRecipeCollectData = () => {
        setRefresh(true)
        getCollectContentApi(userInfo?.id as number)
            .then((res) => {
                if ((type as string) === Type.FOOD.toString()) {
                    setDishes(res.data.foods)
                } else {
                    setDishes(res.data.recipes)
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setRefresh(false)
            })
    }

    const gotoRecipeDetail = (id: number) => {
        // TODO
        // router.navigate('')
    }

    useEffect(() => {
        getRecipeCollectData()
    }, [])

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    tintColor={theme.colors.deep01Primary}
                    colors={[theme.colors.deep01Primary]} //ios
                    refreshing={refresh}
                    onRefresh={() => {
                        getRecipeCollectData()
                    }}
                />
            }
        >
            {dishes?.length > 0 ? (
                dishes.map((item) => (
                    <Card
                        key={item.id}
                        containerStyle={{
                            borderRadius: 15,
                            marginBottom: 10,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                gotoRecipeDetail(item.id)
                            }}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: '100%',
                                    height: 120,
                                    borderRadius: 15,
                                    marginBottom: 15,
                                }}
                            ></Image>
                            <AutoText>
                                {item.name?.trim() || item.title?.trim()}
                            </AutoText>
                        </TouchableOpacity>
                    </Card>
                ))
            ) : (
                <View
                    style={[
                        styles.emptyContainer,
                        { height: windowHeight - insets.top },
                    ]}
                >
                    <Text>暂无数据.快去收藏吧~</Text>
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
