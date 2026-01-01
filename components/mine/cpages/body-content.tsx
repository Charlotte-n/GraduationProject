import { getIntakeDailyApi, getUserInfo } from '@/apis'
import { GetDailyIntakeData, User } from '@/apis/types'
import DatePicker from '@/components/home/components/ProfileDialog/component/date-picker'
import HabitPicker from '@/components/home/components/ProfileDialog/component/habit-picker'
import HealthTarget from '@/components/home/components/ProfileDialog/component/health-target'
import HighPicker from '@/components/home/components/ProfileDialog/component/high-picker'
import SexPicker from '@/components/home/components/ProfileDialog/component/sex-picker'
import { useLoginRegisterStore } from '@/store'

import {
    forwardRef,
    Fragment,
    memo,
    PropsWithChildren,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react'
import { ToastAndroid } from 'react-native'

const BodyContent = forwardRef<{ updateUserProfile: () => void }>(
    (
        _: PropsWithChildren,
        ref: React.Ref<{ updateUserProfile: () => void }>,
    ) => {
        const userInfo = useLoginRegisterStore((state) => state.userInfo)
        const { height, weight, birth, sex } = userInfo
        const [Sex, setSex] = useState(() => userInfo.sex ?? (0 as number))
        const [Birth, setBirth] = useState('')
        const [Height, setHeight] = useState(() => userInfo.height ?? '')
        const [Weight, setWeight] = useState(
            () => userInfo.weight ?? ('' as string),
        )
        const [Habit, setHabit] = useState(
            () => userInfo.exercise ?? (0 as number),
        )
        const [target, setTarget] = useState(
            () => userInfo.target ?? (0 as number),
        )

        // 更新
        const updateUserProfile = async () => {
            try {
                const params: GetDailyIntakeData = {
                    sex: String(Sex),
                    birth: Birth,
                    height: String(Height),
                    weight: String(Weight),
                    userid: userInfo.id,
                    exercise: Number(Habit),
                    target: String(target),
                    gym: 0,
                }
                const res = await getIntakeDailyApi(params)
                console.log('更新用户信息', res, params)
                if (res.code !== 1) {
                    return ToastAndroid.show(
                        '更新个人信息失败',
                        ToastAndroid.SHORT,
                    )
                }
                ToastAndroid.show('更新个人信息成功', ToastAndroid.SHORT)
                const info = await getUserInfo(userInfo?.id)
                if (info.code !== 1) {
                    return ToastAndroid.show(
                        '获取个人信息失败',
                        ToastAndroid.SHORT,
                    )
                }
                useLoginRegisterStore
                    .getState()
                    .setUserInfo?.(info.data.user as User)
            } catch (error) {
                ToastAndroid.show('更新个人信息失败', ToastAndroid.SHORT)
            }
        }

        useImperativeHandle(ref, () => ({
            updateUserProfile,
        }))

        useEffect(() => {
            getUserInfo(userInfo?.id).then((res) => {
                useLoginRegisterStore
                    .getState()
                    .setUserInfo?.(res.data.user as User)
            })
        }, [])

        return (
            <Fragment>
                <SexPicker sex={sex ?? (0 as number)} setSex={setSex} />
                <DatePicker birth={birth} setBirth={setBirth} />
                <HighPicker
                    title={'身高'}
                    modelTitle={'修改身高'}
                    inputContent={'填写身高,例如160'}
                    content={height ?? ''}
                    setValue={setHeight}
                />
                <HighPicker
                    title={'体重'}
                    modelTitle={'修改体重'}
                    inputContent={'填写体重,例如60'}
                    content={weight ?? ''}
                    setValue={setWeight}
                />
                <HabitPicker habit={Habit as number} setHabit={setHabit} />
                <HealthTarget
                    target={target as number}
                    setTarget={setTarget}
                    height={60}
                    fontSize={14}
                />
            </Fragment>
        )
    },
)

export default memo(BodyContent)
