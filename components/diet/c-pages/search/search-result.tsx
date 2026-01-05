import AutoText from '@/common/components/AutoText'
import RecordFood from '@/components/diet/record-food'
import theme from '@/styles/theme/color'
import { SingleFoodListType } from '@/types/home'
import { Icon } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { memo, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

const SearchResult = ({ foodData }: { foodData: SingleFoodListType }) => {
    const [showEdit, setShowEdit] = useState(false)
    const id = useRef(0)
    const router = useRouter()

    const gotoFoodDetail = (foodId: number) => {
        id.current = foodId
        setShowEdit(true)
    }

    const handleEdit = (id: number) => {
        router.navigate(`/diet-cpages/food-nutrition?id=${id}&type=search`)
    }
    return (
        <>
            <AutoText fontSize={5} style={{ marginBottom: 10 }}>
                食物
            </AutoText>
            {foodData.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => gotoFoodDetail(item.id as number)}
                    style={styles.foodItemContainer}
                >
                    <View>
                        <AutoText
                            fontSize={4.5}
                            numberOfLines={1}
                            style={{
                                width: 200,
                                marginBottom: 5,
                            }}
                        >
                            {item.title}
                        </AutoText>
                        <AutoText fontSize={4}>
                            {item.calories?.toFixed(2)}Kcal/100g
                        </AutoText>
                    </View>
                    <View style={styles.editContainer}>
                        <AutoText
                            fontSize={4}
                            style={{
                                paddingHorizontal: 10,
                            }}
                        >
                            100g
                        </AutoText>
                        <TouchableOpacity
                            onPress={() => handleEdit(item.id as number)}
                        >
                            <Icon
                                type={'antdesign'}
                                name={'plus-circle'}
                                size={18}
                                color={theme.colors.deep01Primary}
                            ></Icon>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            ))}

            {/*记录饮食*/}
            {showEdit ? (
                <RecordFood
                    isVisible={showEdit}
                    onClose={() => setShowEdit(false)}
                    id={id.current}
                />
            ) : null}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    foodItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderRadius: 10,
        borderBottomColor: theme.colors.primary,
    },
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default memo(SearchResult)
