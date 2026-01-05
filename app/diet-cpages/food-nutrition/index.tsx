import {
    addCollectApi,
    cancelCollectApi,
    FoodListByCategoryApi,
    JudgeCollectApi,
} from '@/apis'
import { FoodListByCategoryType } from '@/apis/types'
import { screenHeight, screenWidth, windowHeight } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import Container from '@/common/components/container'
import Empty from '@/components/diet/c-pages/search/empty'
import RecordFood from '@/components/diet/record-food'
import { FoodNutrition, FoodNutritionData } from '@/constants/diet'
import { useDietStore, useLoginRegisterStore } from '@/store/index'
import theme from '@/styles/theme/color'
import { SingleFoodItemType } from '@/types/home'
import { Button } from '@rneui/themed'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'
// import ViewShot from 'react-native-view-shot'

export default function FoodNutritionComponent() {
    const ViewShotRef = useRef<any>(null)
    const { id, type } = useLocalSearchParams<{ id: string; type: string }>()
    const [FoodDetail, setFoodDetail] = useState<SingleFoodItemType>(
        {} as SingleFoodItemType,
    )
    const [isCollect, setIsCollect] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [url, setUrl] = useState('')
    const { setUrl: setDietUrl } = useDietStore.getState()
    const userInfo = useLoginRegisterStore((state) => state.userInfo)

    // 捕获照片
    const capturePic = () => {
        ViewShotRef.current
            ?.capture?.()
            .then((url: string) => {
                setUrl(url)
            })
            .catch((error: Error) => {
                console.log(error)
            })
    }

    const getFoodDetail = (id: number) => {
        FoodListByCategoryApi({ id })
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('获取食物详情失败', ToastAndroid.SHORT)
                    return
                }
                setFoodDetail((res.data as FoodListByCategoryType).foods[0])
            })
            .catch((error: Error) => {
                ToastAndroid.show('获取食物详情失败', ToastAndroid.SHORT)
                console.log(error)
            })
    }

    useEffect(() => {
        id ? getFoodDetail(Number(id)) : setFoodDetail({} as SingleFoodItemType)
    }, [id])

    useEffect(() => {
        capturePic()
        setDietUrl(url)
    }, [url])

    const JudgeCollect = async () => {
        try {
            const res = await JudgeCollectApi({
                userid: userInfo.id as number,
                foodId: Number(id),
                type: 1,
            })
            setIsCollect(!res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // 收藏
    const handleCollect = async (type: 0 | 1) => {
        try {
            const params = {
                userid: userInfo.id as number,
                foodId: Number(id),
                type: 1,
            }
            type === 0
                ? await cancelCollectApi(params)
                : await addCollectApi(params)
            await JudgeCollect()
        } catch (error) {
            ToastAndroid.show('收藏失败', ToastAndroid.SHORT)
            console.log(error)
        }
    }

    useEffect(() => {
        JudgeCollect()
    }, [])

    return (
        <Container>
            <ScrollView style={styles.container}>
                {/* <ViewShot
                    ref={ViewShotRef}
                    options={{
                        fileName: 'food',
                        format: 'png',
                        quality: 0.1,
                        result: 'base64',
                    }}
                > */}
                <View>
                    {Number(id) !== 0 ? (
                        <>
                            <View style={styles.foodDetailContainer}>
                                <View style={styles.foodDetailHeaderContainer}>
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                zIndex: 20,
                                            }}
                                            numberOfLines={1}
                                        >
                                            {FoodDetail.title ?? ''}
                                        </Text>
                                        <Text
                                            style={{
                                                width: 54,
                                                height: 10,
                                                backgroundColor:
                                                    theme.colors.deep01Primary,
                                                borderRadius: 20,
                                                position: 'absolute',
                                                top: 15,
                                                left: 0,
                                            }}
                                        />
                                    </View>
                                    <AutoText
                                        style={{
                                            marginTop: 10,
                                            fontSize: 13,
                                        }}
                                    >
                                        {FoodDetail.calories?.toFixed(2) ??
                                            '0.00'}
                                        Kcal/100g
                                    </AutoText>
                                </View>
                                <View style={styles.foodDetailContentContainer}>
                                    <View
                                        style={
                                            styles.foodDetailContentHeaderContainer
                                        }
                                    >
                                        <View
                                            style={{
                                                width: 5,
                                                height: 5,
                                                borderRadius: 100,
                                                marginRight: 5,
                                                backgroundColor:
                                                    theme.colors.deep01Primary,
                                            }}
                                        ></View>
                                        <AutoText fontSize={5}>
                                            热量解析
                                        </AutoText>
                                    </View>
                                    <View style={styles.foodNutritionContainer}>
                                        {FoodNutritionData &&
                                            FoodNutritionData.length > 0 &&
                                            FoodNutritionData.map((item) => (
                                                <View
                                                    key={item}
                                                    style={
                                                        styles.foodNutritionItemContainer
                                                    }
                                                >
                                                    <Text
                                                        style={{
                                                            flex: 1,
                                                        }}
                                                    >
                                                        {FoodNutrition[
                                                            item as keyof typeof FoodNutrition
                                                        ] ?? '0.00'}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            color: '#888',
                                                        }}
                                                    >
                                                        {FoodDetail[
                                                            item as keyof SingleFoodItemType
                                                        ]
                                                            ? (
                                                                  FoodDetail[
                                                                      item as keyof SingleFoodItemType
                                                                  ] as number
                                                              )?.toFixed(2)
                                                            : '0.00'}{' '}
                                                        kcal
                                                    </Text>
                                                </View>
                                            ))}
                                    </View>
                                </View>
                            </View>
                            <View style={styles.foodCollectContainer}>
                                <TouchableOpacity
                                    style={{
                                        marginLeft: 20,
                                    }}
                                    onPress={() =>
                                        handleCollect(isCollect ? 0 : 1)
                                    }
                                >
                                    <Image
                                        source={
                                            isCollect
                                                ? require('@/assets/icon/collect1.png')
                                                : require('@/assets/icon/collect.png')
                                        }
                                        style={{
                                            height: 25,
                                            width: 25,
                                        }}
                                    />
                                </TouchableOpacity>
                                <View style={styles.foodCollectButtonContainer}>
                                    <Button
                                        title="记录饮食"
                                        buttonStyle={{
                                            backgroundColor:
                                                theme.colors.deep01Primary,
                                            borderRadius: 20,
                                            width: screenWidth / 2,
                                        }}
                                        titleStyle={{
                                            textAlign: 'center',
                                        }}
                                        onPress={() => setIsVisible(true)}
                                    />
                                </View>
                            </View>
                            {isVisible && (
                                <RecordFood
                                    isVisible={isVisible}
                                    id={Number(id)}
                                    onClose={() => setIsVisible(false)}
                                />
                            )}
                        </>
                    ) : (
                        <View style={styles.foodEmptyContainer}>
                            <Empty text="不能识别到该食物" />
                        </View>
                    )}
                    {/* </ViewShot> */}
                </View>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        height: '100%',
    },
    foodDetailContainer: {
        paddingHorizontal: 30,
    },
    foodDetailHeaderContainer: {
        justifyContent: 'center',
        height: screenHeight / 2.5,
    },
    foodDetailContentContainer: {
        height: screenHeight / 2.5,
    },
    foodDetailContentHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    foodNutritionContainer: {
        paddingLeft: 10,
    },
    foodNutritionItemContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: theme.colors.secondary,
    },
    foodCollectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    foodCollectButtonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    foodEmptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: windowHeight - 200,
    },
})
