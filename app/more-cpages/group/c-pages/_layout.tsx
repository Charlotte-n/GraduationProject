import { Stack } from 'expo-router'

export default function GroupCLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="search/index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="group-detail/index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="calendar/index"
                options={{ headerShown: false }}
            />
            <Stack.Screen name="clock/index" options={{ headerShown: false }} />
            <Stack.Screen
                name="create-group/index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="member-manage/index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="more-group/index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ranking/index"
                options={{ headerShown: false }}
            />
        </Stack>
    )
}
