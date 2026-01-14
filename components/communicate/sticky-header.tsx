import AutoText from '@/common/components/AutoText'
import theme from '@/styles/theme/color'
import { memo, useState } from 'react'
import {
    Animated,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'

interface Props {
    stickyHeaderY: number
    stickyScrollY: Animated.Value
    titles: { id: string; title: string; desc: string }[]
    getId: (id: number) => void
}

const Item = ({
    item,
    getId,
    activeIndex,
    setActiveIndex,
}: {
    item: { id: string; title: string; desc: string }
    getId: (id: number) => void
    activeIndex: number
    setActiveIndex: (index: number) => void
}) => {
    return (
        <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => {
                setActiveIndex(Number(item.id))
                getId(Number(item.id))
            }}
        >
            <AutoText
                style={[
                    {
                        paddingBottom: 2,
                    },
                    activeIndex === Number(item.id) ? styles.active : null,
                ]}
            >
                {item.desc}
            </AutoText>
            <View
                style={
                    activeIndex === Number(item.id) ? styles.indirector : null
                }
            ></View>
        </TouchableOpacity>
    )
}

const StickyHeader = ({
    stickyHeaderY = -1,
    stickyScrollY = new Animated.Value(0),
    titles,
    getId,
}: Props) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [stickyLayoutY, setStickyLayoutY] = useState(0)

    // 函数可以提出去
    const _onLayout = (event: any) => {
        setStickyLayoutY(event.nativeEvent.layout.y)
    }

    const y = stickyHeaderY != -1 ? stickyHeaderY : stickyLayoutY
    const translateY = stickyScrollY.interpolate({
        inputRange: [-1, 0, y, y + 1],
        outputRange: [0, 0, 0, 1],
    })

    return (
        <Animated.View
            onLayout={_onLayout}
            style={[
                styles.container,
                {
                    transform: [{ translateY }],
                },
            ]}
        >
            <FlatList
                data={titles}
                renderItem={({ item }) => (
                    <Item
                        item={item}
                        getId={getId}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    />
                )}
                scrollEnabled={false}
                invertStickyHeaders={true}
                keyExtractor={(item) => String(item.id)}
                horizontal={true}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        zIndex: 1000,
        backgroundColor: 'white',
    },
    active: {
        color: theme.colors.deep01Primary,
    },
    indirector: {
        borderRadius: 10,
        width: 20,
        height: 5,
        backgroundColor: theme.colors.deep01Primary,
    },
})

export default memo(StickyHeader)
