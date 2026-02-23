import {
    CommunicateContentData,
    CommunicateSingleContentData,
} from '@/apis/types'
import { memo } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import Empty from '../diet/c-pages/search/empty'
import CommentCard from './comment-card'

const CommunicateList = ({
    communicate,
}: {
    communicate: CommunicateContentData
}) => {
    const renderItem: ListRenderItem<CommunicateSingleContentData> = ({
        item,
        index,
    }) => (
        <View style={styles.communicateItem}>
            <CommentCard data={item} index={index} />
        </View>
    )

    const keyExtractor = (item: CommunicateSingleContentData) =>
        item.id.toString()

    return (
        <FlatList
            data={communicate ?? []}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            scrollEnabled={false}
            style={styles.list}
            contentContainerStyle={
                communicate?.length ? undefined : styles.emptyContainer
            }
            ListEmptyComponent={<Empty text="暂无人发布评论" />}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    communicateItem: {
        marginBottom: 15,
    },
    emptyContainer: {
        flexGrow: 1,
    },
})

export default memo(CommunicateList)