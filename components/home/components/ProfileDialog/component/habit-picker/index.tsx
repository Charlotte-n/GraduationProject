import { BodyData } from '@/constants/body'
import { useLoginRegisterStore } from '@/store'
import { Dialog, Icon } from '@rneui/themed'
import type { FC, ReactNode } from 'react'
import React, { memo, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import WheelPicker from 'react-native-wheely'
interface IProps {
    children?: ReactNode
    habit: any
    setHabit: any
    height?: number
    fontSize?: number
}

const HabitPicker: FC<IProps> = ({ habit, setHabit, height, fontSize }) => {
    const [isShow, setIsShow] = useState(false)
    const { userInfo } = useLoginRegisterStore.getState()
    //进行联动
    const selected = useRef(userInfo.exercise)
    return (
        <TouchableOpacity
            style={[styles.container, { height: height ? height : 59 }]}
            onPress={() => {
                setIsShow(true)
            }}
        >
            <Text
                style={{
                    fontSize: fontSize ? fontSize : 15,
                    fontWeight: '300',
                    flex: 1,
                }}
            >
                运动习惯
            </Text>
            <View style={styles.content}>
                <Text style={{ fontSize: 15, fontWeight: '300' }}>
                    {selected?.current && selected?.current >= 0
                        ? BodyData[selected.current]
                        : Number(habit) >= 0
                          ? BodyData[selected?.current ?? 0]
                          : ''}
                </Text>
                <Icon
                    type={'antdesign'}
                    name={'caret-down'}
                    size={10}
                    color={'#666666'}
                    style={{
                        marginLeft: 10,
                        marginRight: 15,
                    }}
                ></Icon>
            </View>
            <Dialog isVisible={isShow}>
                <View style={styles.header}>
                    <Dialog.Title title={'运动习惯'}></Dialog.Title>
                    <TouchableOpacity
                        onPress={() => {
                            if (!selected.current) {
                                setHabit(0)
                                selected.current = 0
                            }
                            setIsShow(false)
                        }}
                    >
                        <Icon type="antdesign" name={'close'}></Icon>
                    </TouchableOpacity>
                </View>

                <WheelPicker
                    selectedIndex={Number(selected.current)}
                    options={BodyData}
                    onChange={(index: number) => {
                        selected.current = index
                        setHabit(selected.current)
                    }}
                />
            </Dialog>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: '#F1F3F4',
        alignItems: 'center',
        flexDirection: 'row',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
export default memo(HabitPicker)
