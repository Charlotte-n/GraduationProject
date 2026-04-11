import { getClassGroupApi, getThreeGroupApi } from '@/apis'
import { groupClassificationType } from '@/apis/types'
import Container from '@/common/components/container'
import CategoryGroup from '@/components/more/category-group'
import SearchGroup from '@/components/more/search-group'
import { useGroupStore, useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { Icon } from '@rneui/base'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Group() {
    const insets = useSafeAreaInsets()
    const opearateGroupNumber = useGroupStore((state) => state.opearateGroupNumber)
    const setThreeGroups = useGroupStore((state) => state.setThreeGroups)
    const [groupClassification, setGroupClassification] =
        useState<groupClassificationType>([])
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const router = useRouter()

    const gotoCreateGroup = () => {
        router.navigate('/more-cpages/group/c-pages/create-group')
    }

    const getThreeGroups = async () => {
        getThreeGroupApi(userInfo?.id as number)
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

    useEffect(() => {
        if (opearateGroupNumber > 0) {
            getThreeGroups()
            useGroupStore.getState().setOperateGroupNumber(0)
        }
    }, [opearateGroupNumber])
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
                {/* 创建小组 */}
                <TouchableOpacity style={styles.createGroupContainer} onPress={gotoCreateGroup}>
                    <Icon name="plus-circle" type="antdesign" size={25} color={theme.colors.deep01Primary} />
                </TouchableOpacity>
                {/* 推荐小组 */}
                <View style={styles.recommendGroupContainer}>
                    <SearchGroup updateGroupList={getThreeGroups} />
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
    createGroupContainer: {
        position: 'absolute',
        right: 5,
        top: 10,
        width: 50,
        height: 50,
        zIndex: 10,
    },
    recommendGroupContainer: {
        marginBottom: 10,
    },
    classificationGroupContainer: {
        marginBottom: 10,
    },
})
