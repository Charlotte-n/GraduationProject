import theme from '@/styles/theme/color'
import { Icon } from '@rneui/themed'
import { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'

interface SeePasswordProps {
    getIsSee: (value: boolean) => void
}

export default function SeePassword({ getIsSee }: SeePasswordProps) {
    const [isSeePassword, setIsSeePassword] = useState(false)

    const togglePasswordVisibility = useCallback(() => {
        setIsSeePassword((prev) => !prev)
    }, [])

    useEffect(() => {
        getIsSee(isSeePassword)
    }, [isSeePassword, getIsSee])

    return (
        <TouchableOpacity
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
        >
            <Icon
                name={isSeePassword ? 'eye' : 'eye-off'}
                type="feather"
                color={theme.colors.deep01Primary}
                size={20}
            />
        </TouchableOpacity>
    )
}
