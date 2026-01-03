import { Dimensions, Image } from 'react-native'

export const searchFoodCategory = [
    {
        name: '口水鸡',
    },
    {
        name: '酸辣鱼',
    },
    {
        name: '水煮肉片',
    },
    {
        name: '豆腐脑',
    },
    {
        name: '鸡胸肉',
    },
    {
        name: '沙丁鱼',
    },
    {
        name: '炸鸡',
    },
    {
        name: '蔬菜沙拉',
    },
    {
        name: '豆沙包',
    },
    {
        name: '糖豆包',
    },
    {
        name: '意大利面',
    },
]

export const FoodNutritionData = ['carbohydrate', 'cellulose', 'fat', 'protein']
export const FoodNutrition = {
    carbohydrate: '碳水化合物',
    fat: '脂肪',
    protein: '蛋白质',
    cellulose: '纤维素',
}
export const FoodCategory = [
    {
        id: 1,
        icon: (
            <Image
                source={require('@/assets/icon/zhushi.png')}
                style={{
                    width: Dimensions.get('screen').width / 5 - 40,
                    height: 30,
                }}
            />
        ),
        name: '主食',
    },
    {
        id: 2,
        icon: (
            <Image
                source={require('@/assets/icon/meat.png')}
                style={{
                    width: Dimensions.get('screen').width / 5 - 40,
                    height: 30,
                }}
            />
        ),
        name: '肉类',
    },
    {
        id: 3,
        icon: (
            <Image
                source={require('@/assets/icon/nai.png')}
                style={{
                    width: Dimensions.get('screen').width / 5 - 40,
                    height: 30,
                }}
            />
        ),
        name: '奶类',
    },
    {
        id: 4,
        icon: (
            <Image
                source={require('@/assets/icon/mihoutao.png')}
                style={{
                    width: Dimensions.get('screen').width / 5 - 40,
                    height: 30,
                }}
            />
        ),
        name: '水果',
    },
    {
        id: 5,
        icon: (
            <Image
                source={require('@/assets/icon/jianguo.png')}
                style={{
                    width: Dimensions.get('screen').width / 5 - 40,
                    height: 30,
                }}
            />
        ),
        name: '坚果',
    },
    {
        id: 6,
        icon: (
            <Image
                source={require('@/assets/icon/juice.png')}
                style={{
                    width: Dimensions.get('screen').width / 5 - 40,
                    height: 30,
                }}
            />
        ),
        name: '饮料',
    },
    {
        id: 7,
        icon: (
            <Image
                source={require('@/assets/icon/you.png')}
                style={{
                    width: Dimensions.get('screen').width / 5 - 40,
                    height: 30,
                }}
            />
        ),
        name: '油制品',
    },
    {
        id: 8,
        icon: (
            <Image
                source={require('@/assets/icon/tiaowei.png')}
                style={{
                    width: Dimensions.get('screen').width / 5 - 40,
                    height: 30,
                }}
            />
        ),
        name: '调味品',
    },
]

export const foodTime = ['早餐', '午餐', '晚餐']
