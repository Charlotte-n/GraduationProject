import AutoText from '@/common/components/AutoText'
import theme from '@/styles/theme/color'
import { IntakeItem } from '@/types/home'
import { transformAdaption } from '@/utils/adaption'
import { Icon, Image } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { memo, type ReactNode } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'


interface FoodByTimeProps {
    image: ReactNode
    type?: number
    baseData: {
        name: string
        recommend: string
    }
    intakeFoodList: IntakeItem[]
}

const FoodByTime = ({ image, baseData, type, intakeFoodList = [] }: FoodByTimeProps) => {
    const { name, recommend } = baseData
    const router = useRouter()

    const handleGoAddPage = () => {
        router.navigate(`/diet-cpages/food-category?type=${type || 0}`)
    }
    return (
            <View style={styles.container}>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', marginBottom: intakeFoodList && intakeFoodList.length > 0 ? transformAdaption(20) : 0 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {image}
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <AutoText>{name}</AutoText>
                        <AutoText>{recommend}千卡</AutoText>
                    </View>
                </View>
                <TouchableOpacity onPress={handleGoAddPage}>
                    <Icon
                        type={'antdesign'}
                        name={'plus-circle'}
                        size={transformAdaption(28)}
                        color={theme.colors.deep01Primary}
                        style={{
                            marginLeft: 5,
                        }}
                    />
              </TouchableOpacity>
              </View>
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                {intakeFoodList && intakeFoodList.length > 0 && intakeFoodList.map((item, index) => (
                    <View key={item.id}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',marginBottom: index !== intakeFoodList.length - 1 ? transformAdaption(20) : 0 }}>
                            <Image source={{ uri: item.image }} style={{ width: transformAdaption(50), height: transformAdaption(50) }} />
                            <AutoText numberOfLines={1} style={{ maxWidth: '60%', marginLeft: transformAdaption(10) }}>{item.title}</AutoText>
                            <AutoText>{item.g}g</AutoText>
                        </View>
                       {index !== intakeFoodList.length - 1 && <View style={{ width: '100%', height: transformAdaption(2), backgroundColor: theme.colors.secondary }}></View>}
                    </View>
                ))}
              </View>
            </View>

           
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        borderColor: theme.colors.secondary,
        marginTop: transformAdaption(5),
        paddingVertical: transformAdaption(15),
        paddingHorizontal: transformAdaption(5),
    },
})

export default memo(FoodByTime)
