import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function LoginAndRegisterLayout() {
  return (
    <View style={styles.container}>
     <Stack screenOptions={{ headerShown: false }}>
       <Stack.Screen name="index" options={{ headerShown: false }} />
       <Stack.Screen name="login" options={{ headerShown: false }} />
       <Stack.Screen name="register"  options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});