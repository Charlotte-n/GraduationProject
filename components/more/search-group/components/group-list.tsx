import { GroupInfoType } from '@/apis/types'
import { memo } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import GroupItem from './group-item'

const GroupList = ({ groupList = [] }: { groupList: GroupInfoType[] }) => {
    return (
        <>
            <ScrollView style={styles.container}>
                {groupList.map((item) => (
                    <View style={{ marginBottom: 30 }}>
                        <GroupItem key={item.id} groupItem={item} />
                    </View>
                ))}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        height: 290,
    },
})

export default memo(GroupList)
