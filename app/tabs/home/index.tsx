import { screenHeight, screenWidth, windowHeight } from '@/common/common'
import EchartsBigPie from '@/components/home/components/EchartsBigPie'
import EchartsSmallPie from '@/components/home/components/EchartsSmallPie'
import { useHome } from '@/hooks/useHome'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Drawer } from 'react-native-drawer-layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
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
    const insets = useSafeAreaInsets()
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
            <StatusBar style="auto" backgroundColor="white" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}
            >
                {/* 安全区 */}
                <View
                    style={{
                        height: insets.top,
                    }}
                />

                {/* echarts表 */}
                <EchartsBigPie />
                <EchartsSmallPie />
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
        height: screenHeight,
    },
    foodListContainer: {
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    hotRecommend: {
        paddingHorizontal: 10,
    },
})
