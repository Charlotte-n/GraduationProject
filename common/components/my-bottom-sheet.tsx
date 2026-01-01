import theme from '@/styles/theme/color'
import { BottomSheet, Button, Card, Icon } from '@rneui/themed'
import { Fragment, memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface MyBottomSheetProps {
    title: string
    isShowDriver?: boolean
    isShowBottomButton?: boolean
    handleConfirm?: () => void
    children: React.ReactNode
    isVisible: boolean
    handleVisible: (value: boolean) => void
}
const MyBottomSheet = memo<MyBottomSheetProps>(
    ({
        title,
        isShowDriver = true,
        isShowBottomButton = true,
        handleConfirm,
        children,
        isVisible,
        handleVisible,
    }) => {
        return (
            <Fragment>
                <BottomSheet isVisible={isVisible}>
                    <Card
                        containerStyle={{
                            marginHorizontal: 0,
                        }}
                    >
                        <View style={styles.titleContainer}>
                            <Text>{title}</Text>
                            <Icon
                                name={'close'}
                                type={'antdesign'}
                                size={20}
                                onPress={() => handleVisible(false)}
                            />
                        </View>
                        {isShowDriver && <Card.Divider />}
                        {/* content */}
                        {children}
                    </Card>
                    {isShowBottomButton && (
                        <Button
                            onPress={handleConfirm}
                            title={'确定'}
                            color={theme.colors.deep01Primary}
                        />
                    )}
                </BottomSheet>
            </Fragment>
        )
    },
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
})

export default MyBottomSheet
