import { transformAdaption } from '@/utils/adaption'
import type { PropsWithChildren, ReactNode } from 'react'
import React, { memo } from 'react'
import { PixelRatio, Text } from 'react-native'

interface IProps {
    children?: ReactNode
    style?: any
    fontSize?: number
    numberOfLines?: number
}

const AutoText = ({
    children,
    style,
    fontSize,
    ...props
}: PropsWithChildren<IProps>) => {
    const size = PixelRatio.get() * transformAdaption(fontSize ? fontSize : 5)
    return (
        <Text style={[style, { fontSize: size}]} {...props}>
            {children}
        </Text>
    )
}

export default memo(AutoText)
