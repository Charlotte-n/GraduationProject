import { getClassGroupApi, getThreeGroupApi } from '@/apis'
import { groupClassificationType, GroupInfoType } from '@/apis/types'
import Container from '@/common/components/container'
import CategoryGroup from '@/components/more/category-group'
import SearchGroup from '@/components/more/search-group'
import { useLoginRegisterStore } from '@/store'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, ToastAndroid, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Group() {
    const insets = useSafeAreaInsets()
    const [threeGroups, setThreeGroups] = useState<GroupInfoType[]>([])
    const [groupClassification, setGroupClassification] =
        useState<groupClassificationType>([])
    const userInfo = useLoginRegisterStore((state) => state.userInfo)

    const getThreeGroups = async () => {
        getThreeGroupApi(userInfo.id as number)
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('没有找到小组', ToastAndroid.SHORT)
                    return
                }
                setThreeGroups(res.data)
            })
            .catch((err) => {
                ToastAndroid.show('获取小组失败', ToastAndroid.SHORT)
            })
    }

    // 小组分类
    const getGroupClassification = () => {
        getClassGroupApi()
            .then((res) => {
                if (!res.data) {
                    ToastAndroid.show('获取小组分类失败', ToastAndroid.SHORT)
                    return
                }
                setGroupClassification(res.data)
            })
            .catch((err) => {
                ToastAndroid.show('获取小组分类失败', ToastAndroid.SHORT)
            })
    }

    useEffect(() => {
        getThreeGroups()
        getGroupClassification()
    }, [])
    return (
        <Container>
            <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                contentContainerStyle={{
                    backgroundColor: 'white',
                    paddingBottom: insets.bottom || 25,
                }}
            >
                {/* 推荐小组 */}
                <View style={styles.recommendGroupContainer}>
                    <SearchGroup groupList={threeGroups} />
                </View>

                {/* 分类小组 */}
                <View style={styles.classificationGroupContainer}>
                    <CategoryGroup groupClassification={groupClassification} />
                </View>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    recommendGroupContainer: {
        marginBottom: 10,
    },
    classificationGroupContainer: {
        marginBottom: 10,
    },
})
