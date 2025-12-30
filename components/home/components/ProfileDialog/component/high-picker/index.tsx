import theme from '@/styles/theme/color'
import { Dialog, Icon } from '@rneui/themed'
import type { FC, ReactNode } from 'react'
import React, { memo, useEffect, useRef, useState } from 'react'
import {
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

interface IProps {
    children?: ReactNode
    title: string
    modelTitle: string
    inputContent: string
    content: string
    setValue: any
    height?: number
    fontSize?: number
}

const HighPicker: FC<IProps> = ({
    title,
    modelTitle,
    inputContent,
    content,
    setValue,
    height,
    fontSize,
}) => {
    const [isShow, setIsShow] = useState(false)
    const [contentValue, setContentValue] = useState('')
    const selected = useRef(content)
    const feedBack = () => {
        switch (title) {
            case '身高':
                return (
                    <Text
                        style={{
                            fontSize: fontSize ? fontSize : 15,
                            fontWeight: '300',
                        }}
                    >
                        {selected.current
                            ? selected.current + 'cm'
                            : content + 'cm'}
                    </Text>
                )
            case '体重':
                return (
                    <Text
                        style={{
                            fontSize: fontSize ? fontSize : 15,
                            fontWeight: '300',
                        }}
                    >
                        {selected.current
                            ? selected.current + 'kg'
                            : content + 'kg'}
                    </Text>
                )
            case '运动习惯':
                return (
                    <Text
                        style={{
                            fontSize: fontSize ? fontSize : 15,
                            fontWeight: '300',
                        }}
                    >
                        {selected.current ? selected.current : content}
                    </Text>
                )
            default:
                return (
                    <Text
                        style={{
                            fontSize: fontSize ? fontSize : 15,
                            fontWeight: '300',
                        }}
                    >
                        {content}
                    </Text>
                )
        }
    }
    const textInput = useRef<any>(null)
    useEffect(() => {
        setTimeout(() => {
            textInput.current?.focus()
        }, 500)
        return () => {
            Keyboard.dismiss()
        }
    }, [isShow])
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
                {title}
            </Text>
            <View style={styles.content}>
                {feedBack()}
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
                <Dialog.Title title={modelTitle} />
                <TextInput
                    ref={textInput}
                    style={{
                        borderColor: '#888888',
                        height: 40,
                    }}
                    placeholder={inputContent}
                    onChangeText={(value) => setContentValue(value)}
                    value={contentValue}
                    className="border pl-[5]"
                    placeholderTextColor={'#6666'}
                ></TextInput>
                <Dialog.Actions>
                    <Dialog.Button
                        title="确定"
                        onPress={() => {
                            setIsShow(false)
                            selected.current = contentValue
                            setValue(selected.current)
                        }}
                        titleStyle={{
                            color: theme.colors.deep01Primary,
                        }}
                    />
                    <Dialog.Button
                        title="取消"
                        onPress={() => setIsShow(false)}
                        titleStyle={{
                            color: theme.colors.deep01Primary,
                        }}
                    />
                </Dialog.Actions>
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

export default memo(HighPicker)
