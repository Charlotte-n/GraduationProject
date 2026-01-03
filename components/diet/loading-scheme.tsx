import { windowWidth } from '@/common/common'
import theme from '@/styles/theme/color'
import { SingleFoodListType } from '@/types/home'
import { Icon, Skeleton } from '@rneui/themed'
import { Fragment, memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HotRecommendItem from '../home/components/HotRecommend/hotRecommendItem'

const LoadingScheme = ({
    data,
    isLoading,
}: {
    data: SingleFoodListType
    isLoading: boolean
}) => {
    const handlePress = (id: number) => {
        // TODO: 跳转到菜品详情页面
        // console.log(id)
    }

    const handleMorePress = () => {
        // TODO: 跳转到更多页面
        // console.log('更多')
    }
    return (
        <Fragment>
            <View style={styles.header}>
                <Text style={styles.headerIcon} />
                <Text style={styles.headerTitle}>{'热门菜品'}</Text>
            </View>
            {/* 菜品列表 */}
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    {[1, 2, 3].map((item) => (
                        <Skeleton
                            key={item}
                            animation="wave"
                            width={89}
                            height={70}
                        />
                    ))}
                </View>
            ) : (
                data.length > 0 && (
                    <View style={styles.listContainer}>
                        {data.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.listItem}
                                onPress={() => handlePress(item.id!)}
                            >
                                <HotRecommendItem data={item} />
                            </TouchableOpacity>
                        ))}
                    </View>
                )
            )}
            {/* 更多 */}
            <TouchableOpacity
                style={styles.moreContainer}
                onPress={handleMorePress}
            >
                <Text style={styles.moreText}>更多</Text>
                <Icon type={'antdesign'} name={'right'} size={14} />
            </TouchableOpacity>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerIcon: {
        marginRight: 2,
        width: 2,
        height: 10,
        borderWidth: 2,
        borderColor: theme.colors.deep01Primary,
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 15,
    },
    listContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    listItem: {
        width: (windowWidth - 30) / 3,
    },
    moreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    moreText: {
        fontSize: 14,
    },
    loadingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
})

export default memo(LoadingScheme)
