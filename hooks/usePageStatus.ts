import { useRef, useState } from "react"

export enum PageState {
    loading = 'loading',
    empty = 'empty',
    error = 'error',
    success = 'success',
}
type PageStateType = 'loading' | 'empty' | 'error' | 'success'
export const usePageStatus = () => {
    const [pageState, setPageState] = useState<PageStateType>(PageState.loading)
    const pageStateRef = useRef<PageStateType>(PageState.loading)


    return { pageState, setPageState, pageStateRef }
}