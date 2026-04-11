import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Container({ children }: { children: React.ReactNode }) {
    const { top, bottom } = useSafeAreaInsets()
    return <View style={{ paddingTop: top + 10, paddingBottom: bottom + 10, flex: 1 }}>{children}</View>
}
