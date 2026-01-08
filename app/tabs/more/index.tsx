import { screenWidth } from '@/common/common'
import AutoText from '@/common/components/AutoText'
import theme from '@/styles/theme/color'
import { BottomSheet, Card, Icon } from '@rneui/themed'
import { RelativePathString, useRouter } from 'expo-router'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

const getMoreFunctionList = () => {
    const router = useRouter()

    const goto = (path: RelativePathString) => {
        router.navigate(path)
    }

    //写功能
    const moreFunction = [
        {
            key: 0,
            title: 'AI小助手',
            Image: (
                <Image
                    style={{
                        width: 25,
                        height: 25,
                        marginBottom: 5,
                    }}
                    source={require('@/assets/images/robot.png')}
                ></Image>
            ),
            toPage: () => goto('/more-cpages/ai' as RelativePathString),
        },
        {
            key: 1,
            title: '饭圈广场',
            Image: (
                <Image
                    style={{
                        width: 25,
                        height: 25,
                        marginBottom: 5,
                    }}
                    source={require('@/assets/icon/yinshiquan.png')}
                ></Image>
            ),
            toPage: () =>
                goto('/more-cpages/communicate' as RelativePathString),
        },
        {
            key: 2,
            title: '组队监督',
            Image: (
                <Image
                    style={{
                        width: 25,
                        height: 25,
                        marginBottom: 5,
                    }}
                    source={require('@/assets/icon/yinshiquan.png')}
                ></Image>
            ),
            toPage: () => goto('/more-cpages/group' as RelativePathString),
        },
    ]
    return moreFunction
}

export default function More({
    onClose,
}: {
    isVisible: boolean
    onClose: () => void
}) {
    const moreFunctionList = getMoreFunctionList()

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <BottomSheet isVisible={true}>
                <Card containerStyle={styles.cardCotainer}>
                    {/* 标题 */}
                    <View style={styles.titleContainer}>
                        <AutoText
                            fontSize={5.2}
                            style={{
                                flex: 1,
                            }}
                        >
                            更多功能
                        </AutoText>
                        <TouchableOpacity onPress={onClose}>
                            <Icon type="antdesign" name="close" />
                        </TouchableOpacity>
                    </View>
                    {/* 内容 */}
                    {moreFunctionList.map((item) => (
                        <View
                            key={item.key}
                            style={styles.contentItemContainer}
                        >
                            <AutoText
                                fontSize={5}
                                style={{
                                    marginBottom: 5,
                                }}
                            >
                                {item.title}
                            </AutoText>
                            <TouchableOpacity
                                onPress={item.toPage}
                                style={styles.contentItemButton}
                            >
                                {item.Image}
                                <AutoText fontSize={4}> {item.title}</AutoText>
                            </TouchableOpacity>
                        </View>
                    ))}
                </Card>
            </BottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardCotainer: {
        width: screenWidth,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        margin: 0,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    contentItemContainer: {
        borderBottomWidth: 1,
        borderColor: theme.colors.secondary,
    },
    contentItemButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.deep01Primary,
        width: 80,
        height: 80,
    },
})
