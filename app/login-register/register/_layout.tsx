import { StyleSheet, View } from 'react-native';
import Register from './index';

export default function RegisterLayout() {
  return (
    <View style={styles.container}>
      <Register />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});