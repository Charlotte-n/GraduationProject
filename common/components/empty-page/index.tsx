import { Image } from 'expo-image';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import AutoText from '../AutoText';

interface EmptyPageProps {
    image?: string;
    text?: string;
}
export default function EmptyPage({ image, text = '暂无数据', children }: PropsWithChildren<EmptyPageProps>) {
    return (
        <View style={styles.container}>
            {
                children ? <>{children}</>
                    : <><AutoText fontSize={5}>{text}</AutoText><Image source={image ? { uri: image } : require('@/assets/images/search.png')} style={styles.image} /></>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: 100,
        height: 100,
    },
});