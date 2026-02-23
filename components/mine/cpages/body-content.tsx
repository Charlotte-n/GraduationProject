import { getIntakeDailyApi, getUserInfo, updateUserProfile as updateUserProfileApi, updateUserProfileParamType } from '@/apis'
import { GetDailyIntakeData, User } from '@/apis/types'
import DatePicker from '@/components/home/components/ProfileDialog/component/date-picker'
import HabitPicker from '@/components/home/components/ProfileDialog/component/habit-picker'
import HealthTarget from '@/components/home/components/ProfileDialog/component/health-target'
import HighPicker from '@/components/home/components/ProfileDialog/component/high-picker'
import SexPicker from '@/components/home/components/ProfileDialog/component/sex-picker'
import { useHomeStore, useLoginRegisterStore } from '@/store'

import {
    forwardRef,
    Fragment,
    memo,
    PropsWithChildren,
    useImperativeHandle,
    useState
} from 'react'
import { ToastAndroid } from 'react-native'

const BodyContent = forwardRef<{ updateUserProfile: () => Promise<void | React.JSX.Element> }, PropsWithChildren>(
    (_, ref) => {
        const userInfo = useLoginRegisterStore((state) => state.userInfo)
        const { height, weight, birth, sex } = userInfo
        const [Sex, setSex] = useState(() => userInfo?.sex ?? (0 as number))
        const [Birth, setBirth] = useState('')
        const [Height, setHeight] = useState(() => userInfo?.height ?? '165')
        const [Weight, setWeight] = useState(
            () => userInfo?.weight ?? ('60' as string),
        )
        const [Habit, setHabit] = useState(
            () => userInfo?.exercise ?? (0 as number),
        )
        const [target, setTarget] = useState(
            () => userInfo?.target ?? (0 as number),
        )

        // 更新
        const updateUserProfile = async () => {
            try {
                const params: GetDailyIntakeData | updateUserProfileParamType = {
                    sex: Number(Sex),
                    birth: Birth,
                    height: String(Height),
                    weight: String(Weight),
                    userid: userInfo?.id,
                    exercise: Number(Habit),
                    target: Number(target),
                    gym: 0,
                    id: userInfo?.id as number
                }
                const res = await getIntakeDailyApi(params as GetDailyIntakeData)
                if (res.code !== 1) {
                    return ToastAndroid.show(
                        '更新个人信息失败',
                        ToastAndroid.SHORT,
                    )
                }
                const infoUpdate = await updateUserProfileApi(params as updateUserProfileParamType)
                if (infoUpdate.code !== 1) {
                    return ToastAndroid.show(
                        '更新个人信息失败',
                        ToastAndroid.SHORT,
                    )
                }
                const info = await getUserInfo(userInfo?.id as number)
                if (info.code !== 1) {
                    return ToastAndroid.show(
                        '获取个人信息失败',
                        ToastAndroid.SHORT,
                    )
                }
                console.log(info.data, info, 'info.data---------ymj')
                useHomeStore.getState().setDailyIntake(res.data)
                useLoginRegisterStore.getState().setUserInfo(info.data.user as User)
                ToastAndroid.show('更新个人信息成功', ToastAndroid.SHORT)
            } catch (error) { }

        }

        useImperativeHandle(ref, () => ({
            updateUserProfile,
        }))

        return (
            <Fragment>
                <SexPicker sex={sex ?? (0 as number)} setSex={setSex} />
                <DatePicker birth={birth} setBirth={setBirth} />
                <HighPicker
                    title={'身高'}
                    modelTitle={'修改身高'}
                    inputContent={'填写身高,例如160'}
                    content={height ?? '165'}
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
    }
)

export default memo(BodyContent)
