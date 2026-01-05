import AutoText from '@/common/components/AutoText'
import { memo } from 'react'
import { Image, StyleSheet, View } from 'react-native'

const Empty = ({ text }: { text: string }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/search.png')}
                style={styles.imageStyle}
            />
            <AutoText
                style={{
                    fontSize: 16,
                }}
            >
                {text}
            </AutoText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: 100,
        height: 100,
    },
})

export default memo(Empty)
