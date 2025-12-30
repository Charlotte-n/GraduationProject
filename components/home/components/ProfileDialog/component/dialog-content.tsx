import type { FC } from 'react'
import React, { memo, useState } from 'react'
import { Alert, ToastAndroid, View } from 'react-native'
import DatePicker from './date-picker'
import HabitPicker from './habit-picker'
import HighPicker from './high-picker'
import SexPicker from './sex-picker'

import { getIntakeDailyApi, getUserInfo } from '@/apis/index'
import { useHomeStore, useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import { Button } from '@rneui/themed'
import HealthTarget from './health-target'

interface IProps {
    children?: any
}

const DialogContent: FC<IProps> = ({ children }) => {
    const { userInfo } = useLoginRegisterStore.getState()
    const { cancel } = children
    const [sex, setSex] = useState(() => userInfo.sex)
    const [birth, setBirth] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [habit, setHabit] = useState('')
    const [target, setTarget] = useState('')
    //收集信息就可以了
    const getDailyIntake = async () => {
        const param = {
            sex: String(sex),
            birth: birth,
            height: String(height),
            weight: String(weight),
            userid: userInfo.id as number,
            exercise: Number(habit),
            target: String(target),
            gym: 0,
        }
        try {
            const res = await getIntakeDailyApi(param)
            //更新用户的信息
            if (res.code === 1) {
                useHomeStore.getState().setDailyIntake(res.data)
                //重新获取用户信息
                getUserInfo(userInfo.id as number)
                    .then((res) => {
                        useLoginRegisterStore
                            .getState()
                            .setUserInfo(res.data.user)
                        ToastAndroid.showWithGravity(
                            '更新成功',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        )
                        cancel()
                    })
                    .catch((error) => {
                        console.log('获取用户信息失败', error)
                        ToastAndroid.showWithGravity(
                            '获取用户信息失败',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        )
                    })
            } else {
                //填写
                Alert.alert('所有的项目都要填写')
            }
        } catch (e) {
            console.log('获取每日饮食', e)
        }
    }

    return (
        <View>
            <SexPicker
                sex={sex as any}
                setSex={setSex}
                height={40}
                fontSize={14}
            ></SexPicker>
            <DatePicker
                birth={birth}
                setBirth={setBirth}
                height={40}
                fontSize={14}
            ></DatePicker>
            <HighPicker
                title={'身高'}
                modelTitle={'修改身高'}
                inputContent={'填写身高'}
                content={height}
                setValue={setHeight}
                height={40}
                fontSize={14}
            ></HighPicker>
            <HighPicker
                title={'体重'}
                modelTitle={'修改体重'}
                inputContent={'填写体重'}
                content={weight}
                setValue={setWeight}
                height={40}
                fontSize={14}
            ></HighPicker>
            <HabitPicker
                habit={Number(habit)}
                setHabit={setHabit}
                height={40}
                fontSize={14}
            ></HabitPicker>
            <HealthTarget
                target={Number(target)}
                setTarget={setTarget}
                height={40}
                fontSize={14}
            ></HealthTarget>
            <Button
                title={'确定'}
                buttonStyle={{
                    backgroundColor: theme.colors.deep01Primary,
                    marginTop: 20,
                }}
                onPress={() => getDailyIntake()}
            ></Button>
        </View>
    )
}
export default memo(DialogContent)
