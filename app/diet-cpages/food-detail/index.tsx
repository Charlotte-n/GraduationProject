import { RecipeListApi } from '@/apis'
import { SingleDish } from '@/apis/types'
import { screenWidth } from '@/common/common'
import Container from '@/common/components/container'
import CollectWrite from '@/components/diet/c-pages/food-detail/collect-write'
import Comment from '@/components/diet/c-pages/food-detail/comment'
import CommentModal from '@/components/diet/c-pages/food-detail/comment-modal'
import theme from '@/styles/theme/color'
import { Card } from '@rneui/themed'
import { useLocalSearchParams } from 'expo-router'
import { ComponentRef, useCallback, useEffect, useRef, useState } from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
} from 'react-native'

const cardContainerStyle = {
    marginTop: 120,
    borderTopLeftRadius: 40,
    borderTopEndRadius: 40,
    width: screenWidth,
    paddingVertical: 0,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    flex: 1,
    minHeight: 600,
}

export default function FoodDetail() {
    const ViewShotRef = useRef<any>(null)
    const [RecipeDetail, setRecipeDetail] = useState<SingleDish>(
        {} as SingleDish,
    )
    const { id: foodId } = useLocalSearchParams()
    const [isVisible, setIsVisible] = useState(false)
    const collectWriteRef = useRef<ComponentRef<typeof CollectWrite>>(null)
    const commentRef = useRef<ComponentRef<typeof Comment>>(null)

    const handleCloseCommentModal = useCallback(() => {
        setIsVisible(false)
        collectWriteRef.current?.setIsWrite(false)
    }, [])

    const showCommentModal = useCallback(() => {
        setIsVisible(true)
    }, [])

    const getComment = useCallback(() => {
        commentRef.current?.getComment()
    }, [])

    // 获取食谱数据
    const getRecipeDetail = () => {
        RecipeListApi({ id: Number(foodId) })
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('获取食谱数据失败', ToastAndroid.SHORT)
                    return
                }
                //数据的处理
                let materials = (res.data.dishes[0].materials as string)
                    .trim()
                    .split('\\n')
                materials.pop()
                let stepImage = (res.data.dishes[0].stepImg as string)
                    .trim()
                    .split('\\n')
                stepImage.pop()
                let result: SingleDish = res.data.dishes.map((item) => {
                    return {
                        id: item.id,
                        materials: materials,
                        amount: (item.amount as string)?.trim().split('\\n'),
                        stepImg: stepImage,
                        image: item.image,
                        key: item.key,
                        name: item.name?.trim(),
                        score: item.score,
                        step: (item.step as string)?.trim().split('\\n'),
                    }
                })[0]
                setRecipeDetail(result)
            })
            .catch((err) => {
                ToastAndroid.show('获取食谱数据失败', ToastAndroid.SHORT)
                console.log(err)
            })
    }

    useEffect(() => {
        getRecipeDetail()
    }, [])

    return (
        <Container>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <Card containerStyle={cardContainerStyle}>
                    {/* <ViewShot
                        ref={ViewShotRef}
                        options={{
                            fileName: 'food-detail-health',
                            format: 'png',
                            quality: 0.4,
                            result: 'base64',
                        }}
                    > */}
                    <View>
                        <View style={styles.recipeHeaderContainer}>
                            <View style={styles.recipeHeaderTitleContainer}>
                                {RecipeDetail.image && (
                                    <Image
                                        source={{
                                            uri: RecipeDetail.image as string,
                                        }}
                                        style={{
                                            width: 180,
                                            height: 180,
                                            borderRadius: 100,
                                            marginBottom: 10,
                                        }}
                                    />
                                )}
                                {RecipeDetail.name && (
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            minHeight: 100,
                                        }}
                                    >
                                        {RecipeDetail.name?.trim()}
                                    </Text>
                                )}
                            </View>
                        </View>
                        {/* 食谱材料 */}
                        <View style={styles.recipeMaterialContainer}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: '#C0AE7D',
                                }}
                            >
                                材料
                            </Text>

                            <View style={styles.recipeMaterialListContainer}>
                                {RecipeDetail.materials &&
                                    (RecipeDetail.materials as string[]).map(
                                        (item, index) => {
                                            return (
                                                <View
                                                    key={index}
                                                    style={
                                                        styles.recipeMaterialItemContainer
                                                    }
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            flex: 1,
                                                        }}
                                                    >
                                                        {item?.trim()}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                        }}
                                                    >
                                                        {RecipeDetail.amount[
                                                            index
                                                        ]?.trim()}
                                                    </Text>
                                                </View>
                                            )
                                        },
                                    )}
                            </View>
                        </View>
                    </View>
                    {/* </ViewShot> */}
                    {/* 具体做法 */}
                    <View style={styles.recipeStepsContainer}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: '#C0AE7D',
                                marginBottom: 15,
                            }}
                        >
                            {RecipeDetail.name}
                        </Text>
                        {/* 步骤 */}
                        {RecipeDetail.stepImg &&
                            RecipeDetail.stepImg.length > 0 &&
                            (RecipeDetail.stepImg as string[]).map(
                                (item, index) => {
                                    return (
                                        <View key={item}>
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                    marginBottom: 15,
                                                    color: '#C0AE7D',
                                                }}
                                            >
                                                步骤{index + 1}
                                            </Text>
                                            <Image
                                                source={{
                                                    uri: item?.trim(),
                                                }}
                                                style={{
                                                    width: '100%',
                                                    height: 200,
                                                    borderRadius: 20,
                                                    marginBottom: 10,
                                                }}
                                                resizeMode={'cover'}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    marginBottom: 10,
                                                }}
                                            >
                                                {RecipeDetail.step[
                                                    index
                                                ]?.trim()}
                                            </Text>
                                        </View>
                                    )
                                },
                            )}
                    </View>
                    {/* 评论区域 */}
                    <View style={styles.commentContainer}>

                        <Comment
                            ref={commentRef}
                            foodId={Number(foodId)}
                            showCommentModal={showCommentModal}
                        />
                    </View>
                </Card>
            </ScrollView>
            {/* 底部固定的内容:收藏 + 评论 */}
            <View style={styles.bottomContainer}>
                <CollectWrite
                    ref={collectWriteRef}
                    showCommentModal={showCommentModal}
                />
            </View>
            {/* 评论弹窗 */}
            <CommentModal
                isVisible={isVisible}
                onClose={handleCloseCommentModal}
                foodId={Number(foodId)}
                getComment={getComment}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary,
    },
    recipeHeaderContainer: {
        paddingHorizontal: 10,
        minHeight: 150,
    },
    recipeHeaderTitleContainer: {
        position: 'absolute',
        top: -100,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    recipeMaterialContainer: {
        marginHorizontal: 15,
    },
    recipeMaterialListContainer: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    recipeMaterialItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#F1F3F4',
        marginBottom: 20,
    },
    recipeStepsContainer: {
        marginHorizontal: 15,
    },
    commentContainer: {
        marginBottom: 100,
        paddingHorizontal: 15,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
    },
})
