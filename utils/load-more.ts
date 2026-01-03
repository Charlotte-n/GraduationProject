export const onMomentumScrollEnd = (
    event: any,
    { pageLoadingFull, pageLoading }: any,
    fn: any,
) => {
    const offSetY = event.nativeEvent.contentOffset.y // 获取滑动的距离
    const contentSizeHeight = event.nativeEvent.contentSize.height // scrollView  contentSize 高度
    const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height // scrollView高度
    console.log(offSetY + oriageScrollHeight >= contentSizeHeight - 40)
    if (offSetY + oriageScrollHeight >= contentSizeHeight - 40) {
        console.log('load more', pageLoadingFull, pageLoading)
        if (!pageLoading && !pageLoadingFull) {
            fn()
        }
    }
}
