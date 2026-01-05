import { SingleDish } from '@/apis/types'
import { memo } from 'react'
import FoodCardItem from './food-card-item'

const FoodCard = ({
    mealList = [] as SingleDish[],
}: {
    mealList: SingleDish[]
}) => {
    return (
        <>
            {mealList.map((item) => {
                return <FoodCardItem key={item.id} data={item} />
            })}
        </>
    )
}

export default memo(FoodCard)
