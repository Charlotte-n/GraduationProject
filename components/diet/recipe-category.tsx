import { FoodCategory } from '@/constants/diet'
import { memo } from 'react'
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

const Item = ({
    image,
    name,
    id,
}: {
    image: React.ReactNode
    name: string
    id: number
}) => {
    const handlePress = () => {
        console.log('handlePress')
        //TODO 跳转二级页面
    }
    return (
        <TouchableOpacity style={sytleItem.container} onPress={handlePress}>
            {image}
            <Text style={{ fontSize: 13 }}>{name}</Text>
        </TouchableOpacity>
    )
}

const sytleItem = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width / 5,
        flexDirection: 'column',
        justifyContent: 'center',
    },
})

const RecipeCategory = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={FoodCategory}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <Item image={item.icon} name={item.name} id={item.id} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
})

export default memo(RecipeCategory)
