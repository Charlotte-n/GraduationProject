import { FoodListType } from '@/types/home'
import { memo } from 'react'
import FoodByTime from '../FoodByTime'

interface FoodListProps {
    foodList: FoodListType
}

const FoodList = memo(({ foodList }: FoodListProps) => {
    console.log('foodList',foodList)
    return foodList.map((item, index) => (
        <FoodByTime
            key={item.id}
            image={item.icon}
            type={index}
            baseData={item}
            intakeFoodList={item.intakeFoodList}
        />
    ))
})

export default FoodList
