import type { ComponentRef } from 'react'
import { TextInput } from 'react-native'

type BaseInputRef = ComponentRef<typeof TextInput>
export type InputRef = BaseInputRef & {
    shake?: () => void
}
