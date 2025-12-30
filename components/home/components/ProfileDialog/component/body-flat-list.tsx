import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from '@rneui/themed'

interface IProps {
    children?: ReactNode
    getId: (id: string) => void
}

const BodyFlatList: FC<IProps> = ({ getId }) => {
    //基本数据
    const Data = [
        {
            id: '0',
            left: '性别',
            right: '女', //动态地更改（后端返回的数据）
        },
        {
            id: '1',
            left: '出生日期',
            right: '2004-05-04',
        },
        {
            id: '2',
            left: '身高',
            right: 155,
        },
        {
            id: '3',
            left: '体重',
            right: '女',
        },
        {
            id: '4',
            left: '体重管理目标',
            right: '减脂',
        },
        {
            id: '5',
            left: '运动习惯',
            right: '久坐不动',
        },
    ]
    const Item = ({ left, right, id }: any) => {
        return (
            <TouchableOpacity
                className="flex-row items-center pt-[20] pb-[20] border-b border-[#F1F3F4]"
                onPress={() => getId(id)}
            >
                <Text className="flex-1" style={{ fontSize: 15 }}>
                    {left}
                </Text>
                <Text className="mr-[10]">{right}</Text>
                <Icon
                    name={'right'}
                    type={'antdesign'}
                    size={12}
                    color={'#888888'}
                ></Icon>
            </TouchableOpacity>
        )
    }
    return (
        <View>
            <FlatList
                data={Data}
                renderItem={(item) => (
                    <Item
                        left={item.item.left}
                        right={item.item.right}
                        id={item.item.id}
                    ></Item>
                )}
                keyExtractor={(item) => item.left}
                scrollEnabled={false}
            ></FlatList>
        </View>
    )
}

export default memo(BodyFlatList)
