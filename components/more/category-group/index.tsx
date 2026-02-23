import {
    groupClassificationType,
    groupSingleClassificationType,
} from '@/apis/types'
import AutoText from '@/common/components/AutoText'
import theme from '@/styles/theme/color'
import { Icon } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { memo, useEffect, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import GroupItem from '../search-group/components/group-item'

const CategoryGroup = ({
    groupClassification,
}: {
    groupClassification: groupClassificationType
}) => {
    const [isShowMore, setIsShowMore] = useState(false)
    const [groupCategory, setGroupCategory] = useState<
        groupSingleClassificationType[][]
    >([])
    const router = useRouter()

    const handleGoMore = (category: string) => {
        router.navigate(
            `/more-cpages/group/c-pages/more-group?category=${category}`,
        )
    }

    const setGroup = () => {
        // Record<string, groupSingleClassificationType[]> 表示：
        // 一个对象，键是字符串（分类名称），值是 groupSingleClassificationType[] 数组
        const result = {} as Record<string, groupSingleClassificationType[]>
        groupClassification.forEach((item) => {
            const { category } = item
            if (!result[category]) {
                result[category] = []
            }
            result[category].push(item)
        })
        setGroupCategory(Object.values(result))
    }

    useEffect(() => {
        setGroup()
    }, [groupClassification])

    return (
        <View style={styles.container}>
            {/* 背景图 */}
            <View style={styles.backgroundImage}>
                <Image
                    style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                    }}
                    source={require('@/assets/icon/classify.png')}
                />
                <AutoText fontSize={5.5}>分类小组</AutoText>
            </View>
            {/* 分类小组 */}
            <View style={styles.categoryGroupContainer}>
                {groupCategory.length > 0 &&
                    groupCategory
                        .slice(0, isShowMore ? groupCategory.length : 3)
                        ?.map((item: any, index) => (
                            <View key={index} style={styles.categoryGroupItem}>
                                {/* 头部 */}
                                <View style={styles.categoryGroupItemHeader}>
                                    <AutoText
                                        style={{
                                            flex: 1,
                                        }}
                                    >
                                        {item?.[0]?.category}
                                    </AutoText>
                                    <TouchableOpacity
                                        onPress={() =>
                                            handleGoMore(item[0]?.category)
                                        }
                                    >
                                        <AutoText fontSize={4.3}>
                                            更多 &gt;
                                        </AutoText>
                                    </TouchableOpacity>
                                </View>
                                {/* 小组 */}
                                <View
                                    style={[
                                        styles.categoryGroupItemContent,
                                        {
                                            justifyContent:
                                                item.length >= 3
                                                    ? 'space-between'
                                                    : undefined,
                                            borderBottomWidth:
                                                index ===
                                                    groupCategory.length - 1
                                                    ? 0
                                                    : 1,
                                        },
                                    ]}
                                >
                                    {item.length > 0 &&
                                        item
                                            ?.slice(
                                                0,
                                                item.length >= 3
                                                    ? 3
                                                    : item.length,
                                            )
                                            ?.map(
                                                (item: any, index: number) => {
                                                    return (
                                                        <View
                                                            style={{
                                                                width: '33%',
                                                            }}
                                                        >
                                                            <GroupItem
                                                                key={index}
                                                                groupItem={item}
                                                                showButton={
                                                                    false
                                                                }
                                                                showRateOther={
                                                                    false
                                                                }
                                                                stylesGroup={{
                                                                    groupItemStyle:
                                                                    {
                                                                        flexDirection:
                                                                            'column',
                                                                        justifyContent:
                                                                            'center',
                                                                        alignItems:
                                                                            'center',
                                                                    },
                                                                    ImageStyles:
                                                                    {
                                                                        marginRight: 0,
                                                                    },
                                                                    containerStyle:
                                                                    {
                                                                        justifyContent:
                                                                            'center',
                                                                    },
                                                                }}
                                                            />
                                                        </View>
                                                    )
                                                },
                                            )}
                                </View>
                            </View>
                        ))}
            </View>
            {/* 更多分类 */}
            {groupCategory.length > 3 && (
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => setIsShowMore(!isShowMore)}
                >
                    <AutoText
                        style={{
                            marginRight: 10,
                        }}
                    >
                        {isShowMore ? '收起' : '更多分类'}
                    </AutoText>
                    <Icon
                        name={isShowMore ? 'up' : 'down'}
                        type={'antdesign'}
                        size={20}
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: theme.colors.deep01Primary,
    },
    backgroundImage: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderColor: '#cccccc',
    },
    categoryGroupContainer: {
        paddingBottom: 15,
    },
    categoryGroupItem: {
        marginTop: 15,
    },
    categoryGroupItemHeader: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    categoryGroupItemContent: {
        flexDirection: 'row',
        // paddingBottom: 15,
        alignItems: 'center',
        // paddingHorizontal: 30,
        borderBottomWidth: 0.5,
        borderColor: '#cccccc',
    },
})

export default memo(CategoryGroup)
