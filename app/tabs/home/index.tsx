import { screenHeight, screenWidth, windowHeight } from '@/common/common'
import { useHome } from '@/hooks/useHome'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Drawer } from 'react-native-drawer-layout'
import DrawerContent from '../../../components/home/components/DrawerContent'
import FoodList from '../../../components/home/components/FoodList'
import HotRecommend from '../../../components/home/components/HotRecommend'
import ProfileDialog from '../../../components/home/components/ProfileDialog'

export default function Home() {
    const {
        open,
        RecipeFood,
        dialogVisible,
        foodList,
        handleDrawerToggle,
        cancel,
    } = useHome()

    return (
        <Drawer
            open={open}
            onOpen={() => handleDrawerToggle(true)}
            onClose={() => handleDrawerToggle(false)}
            renderDrawerContent={() => <DrawerContent />}
            layout={{
                width: screenWidth / 1.5,
                height: windowHeight,
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}
            >
                {/* echarts表 */}
                {/* 早餐、午餐、晚餐 */}
                {foodList.length > 0 && (
                    <View style={styles.foodListContainer}>
                        <FoodList foodList={foodList} />
                    </View>
                )}
                {/* 热门推荐 */}
                {RecipeFood.length > 0 && (
                    <View style={styles.hotRecommend}>
                        <HotRecommend title="热门推荐" data={RecipeFood} />
                    </View>
                )}

                {/*    初次登录的用户弹窗*/}
                <ProfileDialog dialogVisible={dialogVisible} cancel={cancel} />
            </ScrollView>
        </Drawer>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        height: screenHeight,
    },
    foodListContainer: {
        marginBottom: 10,
    },
    hotRecommend: {},
})
