import { CommunicateSingleContentData } from '@/apis/types'
import { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import Empty from '../diet/c-pages/search/empty'
import CommentCard from './comment-card'

interface Props {
    data: CommunicateSingleContentData[]
}

const CommunicateList = ({ data }: Props) => {
    return (
        <>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <View key={index} style={styles.communicateItem}>
                        <CommentCard data={item} index={index} />
                    </View>
                ))
            ) : (
                <Empty text="暂无人发布评论" />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    communicateItem: {
        marginBottom: 15,
    },
})

export default memo(CommunicateList)
