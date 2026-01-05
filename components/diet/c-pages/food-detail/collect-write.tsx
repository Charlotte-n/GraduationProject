import { addCollectApi, cancelCollectApi, JudgeCollectApi } from '@/apis'
import type { addCollectBody } from '@/apis/types'
import { useFoodStore, useLoginRegisterStore } from '@/store'
import { useLocalSearchParams } from 'expo-router'
import {
    forwardRef,
    memo,
    Ref,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react'
import { StyleSheet, ToastAndroid, View } from 'react-native'
import ChangeIcon from './change-icon'

interface CollectWriteProps {
    showCommentModal: () => void
}

const CollectWrite = (
    { showCommentModal }: CollectWriteProps,
    ref: Ref<{ setIsWrite: (value: boolean) => void }>,
) => {
    const { id } = useLocalSearchParams()
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const { setParentId } = useFoodStore.getState()
    const [isCollect, setIsCollect] = useState(false)
    const [isWrite, setIsWrite] = useState(false)

    const JudgeCollect = () => {
        const data: addCollectBody = {
            foodId: Number(id),
            userid: userInfo.id as number,
            type: 2,
        }
        JudgeCollectApi(data)
            .then((res) => {
                if (res) {
                    setIsCollect(!res.data)
                }
            })
            .catch((err) => {
                console.log(err)
                ToastAndroid.show('获取收藏状态失败', ToastAndroid.SHORT)
            })
    }

    const handleCollect = useCallback(async (type: 0 | 1) => {
        try {
            const data: addCollectBody = {
                foodId: Number(id),
                userid: userInfo.id as number,
                type: 2,
            }
            type === 0
                ? await addCollectApi(data)
                : await cancelCollectApi(data)
            JudgeCollect()
        } catch (error) {
            ToastAndroid.show('收藏失败', ToastAndroid.SHORT)
            console.log(error)
        }
    }, [])

    useEffect(() => {
        JudgeCollect()
    }, [])

    const handleWrite = useCallback(
        (type: 0 | 1) => {
            setIsWrite(!isWrite)
            type === 0 ? showCommentModal() : null
            setParentId(0)
        },
        [isWrite],
    )

    useImperativeHandle(ref, () => ({
        setIsWrite,
    }))
    return (
        <View style={styles.container}>
            <View style={{ marginRight: 20 }}>
                <ChangeIcon
                    likeData={{
                        isLike: isCollect,
                    }}
                    likeImages={{
                        like: '@/assets/icon/collect1.png',
                        unlike: '@/assets/icon/collect.png',
                    }}
                    ImageStyle={{ height: 25, width: 25 }}
                    handleLike={() => handleCollect(isCollect ? 0 : 1)}
                />
            </View>
            <ChangeIcon
                likeData={{
                    isLike: isWrite,
                }}
                likeImages={{
                    like: '@/assets/icon/write1.png',
                    unlike: '@/assets/icon/write.png',
                }}
                ImageStyle={{ height: 25, width: 25 }}
                handleLike={() => handleWrite(isWrite ? 0 : 1)}
            />
        </View>
    )
}

export default memo(
    forwardRef<{ setIsWrite: (value: boolean) => void }, CollectWriteProps>(
        CollectWrite,
    ),
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#F1F3F4',
    },
})
