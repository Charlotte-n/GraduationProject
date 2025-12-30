import { FoodListType } from '@/types/home'
import { memo } from 'react'
import FoodByTime from '../FoodByTime'

interface FoodListProps {
    foodList: FoodListType
}

const FoodList = memo(({ foodList }: FoodListProps) => {
    return foodList.map((item, index) => (
        <FoodByTime
            key={item.id}
            image={item.icon}
            type={index}
            baseData={item}
        />
    ))
})

export default FoodList
