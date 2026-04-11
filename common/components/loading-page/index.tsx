import theme from '@/styles/theme/color';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import AutoText from '../AutoText';

interface LoadingPageProps {
    text?: string;
}

export default function LoadingPage({ text = '加载中...' }: PropsWithChildren<LoadingPageProps>) {
    return (
        <View style={styles.container}>
            <AutoText fontSize={5} style={{ color: theme.colors.deep01Primary }}>{text}</AutoText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});