import { Dimensions, PixelRatio } from 'react-native'

const UiWidth: number = 375

//得到px转换后的在各个手机上的适配
export const transformAdaption = (element: number) => {
    const scale = Dimensions.get('window').width / UiWidth
    return scale * element
}

//边框和线条
export const myBorderWidth = (width = 1) => {
    return width / PixelRatio.get()
}
