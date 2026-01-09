import { windowWidth } from '@/common/common'
import theme from '@/styles/theme/color'
import { Button } from '@rneui/themed'
import { useRouter } from 'expo-router'
import { memo } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

const Search = () => {
    const router = useRouter()

    const goToSearch = () => {
        router.navigate('/more-cpages/group/c-pages/search')
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goToSearch}>
                <TextInput style={styles.input} editable={false} />
            </TouchableOpacity>
            <Button
                title={'搜索'}
                onPress={goToSearch}
                titleStyle={{
                    fontSize: 15,
                    height: 20,
                    color: theme.colors.deep01Primary,
                }}
                containerStyle={{
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: theme.colors.deep01Primary,
                }}
                buttonStyle={{
                    width: 55,
                    height: 30,
                }}
                color={'white'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    input: {
        height: 32,
        width: windowWidth / 1.5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#cccccc',
        borderRadius: 5,
        marginRight: 10,
    },
})

export default memo(Search)
