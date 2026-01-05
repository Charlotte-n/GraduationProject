import { StyleSheet, View } from 'react-native'

export default function ComponentName() {
    return (
        <View style={styles.container}>
            <View>more</View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
