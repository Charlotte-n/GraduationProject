import { windowWidth } from '@/common/common'
import { useGroupStore } from '@/store'
import theme from '@/styles/theme/color'
import { Image, StyleSheet, View } from 'react-native'
import GroupList from './components/group-list'
import Search from './components/search'

const SearchGroup = ({
    updateGroupList,
}: {
    updateGroupList: () => void
}) => {
    const threeGroups = useGroupStore((state) => state.threeGroups)

    return (
        <>
            <View>
                <Image
                    style={{
                        width: windowWidth,
                        height: 250,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                    }}
                    source={require('@/assets/images/group.jpeg')}
                />
            </View>
            {/* 推荐小组 */}
            <View style={styles.recommendGroupContentContainer}>
                <View style={styles.searchContainer}>
                    <Search />
                </View>
                <GroupList
                    groupList={threeGroups}
                    updateGroupList={updateGroupList}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    recommendGroupContentContainer: {
        marginTop: -100,
        marginHorizontal: 12,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        width: windowWidth - 24,
        borderWidth: 0.5,
        borderColor: theme.colors.deep01Primary,
    },
    searchContainer: {
        marginBottom: 10,
    },
})

export default SearchGroup
