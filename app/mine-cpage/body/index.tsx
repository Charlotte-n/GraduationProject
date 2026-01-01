import { screenHeight } from '@/common/common'
import BodyContent from '@/components/mine/cpages/body-content'
import theme from '@/styles/theme/color'
import { Button } from '@rneui/themed'
import { useRef } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

export default function Body() {
    const updateUserProfile = () => {
        // 更新用户信息
        ref.current?.updateUserProfile()
    }
    const ref = useRef<{ updateUserProfile: () => void }>(null)
    return (
        <ScrollView style={styles.container}>
            <BodyContent ref={ref} />
            <Button
                title="确认提交"
                color={theme.colors.deep01Primary}
                containerStyle={{
                    borderRadius: 32,
                    marginTop: 40,
                }}
                onPress={updateUserProfile}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 30,
        height: screenHeight,
    },
})
