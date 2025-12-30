import { Dialog, Icon } from '@rneui/themed'
import type { FC, ReactNode } from 'react'
import React, { memo, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface IProps {
    children?: ReactNode
    sex: number
    setSex: (value: any) => void
    height?: number
    fontSize?: number
}

const SexPicker: FC<IProps> = ({ sex, setSex, height, fontSize }) => {
    const [isShow, setIsShow] = useState(false)
    //进行联动
    const selected = useRef(String(sex))
    return (
        <TouchableOpacity
            onPress={() => setIsShow(true)}
            style={[styles.container, { height: height ? height : 59 }]}
        >
            <Text
                style={{
                    fontSize: fontSize ? fontSize : 15,
                    fontWeight: '300',
                    flex: 1,
                }}
            >
                性别
            </Text>
            <View style={styles.content}>
                <Text
                    style={{
                        fontSize: fontSize ? fontSize : 15,
                        fontWeight: '300',
                    }}
                >
                    {selected.current
                        ? selected.current === '0'
                            ? '男'
                            : '女'
                        : sex
                          ? String(sex) === '0'
                              ? '男'
                              : '女'
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
                <Dialog.Title title={'修改性别'}></Dialog.Title>
                <TouchableOpacity
                    onPress={() => {
                        setIsShow(false)
                        selected.current = '0'
                        setSex(selected.current)
                    }}
                >
                    <View>
                        <Text
                            style={{
                                height: 40,
                                fontSize: 18,
                            }}
                        >
                            男
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setIsShow(false)
                        selected.current = '1'
                        setSex(selected.current)
                    }}
                >
                    <Text
                        style={{
                            height: 40,
                            fontSize: 18,
                        }}
                    >
                        女
                    </Text>
                </TouchableOpacity>
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
})

export default memo(SexPicker)
