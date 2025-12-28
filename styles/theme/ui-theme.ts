import theme from './color'

export const MainTheme = {
    colors: {
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        deep01Primary: theme.colors.deep01Primary,
    },
    mode: 'light' as const,
    components: {
        Button: {
            raised: true,
            color: theme.colors.primary,
        },
    },
}
