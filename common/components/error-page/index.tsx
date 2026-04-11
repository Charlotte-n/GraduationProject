import theme from '@/styles/theme/color';
import { Button } from '@rneui/themed';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

interface ErrorPageProps {
    retry?: () => void;
}

export default function ErrorPage({ children, retry = () => { console.log('重新加载') } }: PropsWithChildren<ErrorPageProps>) {
    return (
        <View style={styles.container}>
            {children ? <>{children}</> : <Button title="重新加载" buttonStyle={styles.button} onPress={retry} color={theme.colors.deep01Primary} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    button: {
        height: 40,
        borderRadius: 15,
        backgroundColor: theme.colors.deep01Primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});