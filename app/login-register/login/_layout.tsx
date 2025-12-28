import { StyleSheet, View } from 'react-native';
import Login from './index';

export default function LoginLayout() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});