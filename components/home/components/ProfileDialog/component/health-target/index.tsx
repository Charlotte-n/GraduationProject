import { targetData } from '@/constants/body'
import { useLoginRegisterStore } from '@/store'
import { Dialog, Icon } from '@rneui/themed'
import type { FC, ReactNode } from 'react'
import React, { memo, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import WheelPicker from 'react-native-wheely'

interface IProps {
    children?: ReactNode
    target: number
    setTarget: any
    height?: number
    fontSize?: number
}

const HealthTarget: FC<IProps> = ({ height, fontSize, target, setTarget }) => {
    const [isShow, setIsShow] = useState(false)
    const { userInfo } = useLoginRegisterStore.getState()
    //进行联动
    const selected = useRef(userInfo.target)
    return (
        <TouchableOpacity
            style={[styles.container, { height: height ? height : 59 }]}
            onPress={() => setIsShow(true)}
        >
            <Text
                style={{
                    fontSize: fontSize ? fontSize : 15,
                    fontWeight: '300',
                    flex: 1,
                }}
            >
                健康目标
            </Text>
            <View style={styles.content}>
                <Text style={{ fontSize: 15, fontWeight: '300' }}>
                    {selected.current != null &&
                    (selected.current as number) >= 0
                        ? targetData[Number(selected.current)]
                        : target
                          ? targetData[Number(selected.current)]
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
                    <Dialog.Title title={'健康目标'}></Dialog.Title>
                    <TouchableOpacity
                        onPress={() => {
                            if (!selected.current) {
                                setTarget(0)
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
                    options={targetData}
                    onChange={(index: number) => {
                        selected.current = index
                        setTarget(selected.current)
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

export default memo(HealthTarget)
