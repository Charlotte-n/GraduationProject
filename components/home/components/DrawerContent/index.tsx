import AutoText from '@/common/components/AutoText'
import { BodyData, targetData } from '@/constants/body'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import type { FC, ReactNode } from 'react'
import React, { memo, useMemo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface IProps {
    children?: ReactNode
}

const DrawerContent: FC<IProps> = () => {
    const { userInfo } = useLoginRegisterStore.getState()

    const birth = userInfo.birth
        ? userInfo.birth[0] +
        '-' +
        '0' +
        userInfo.birth[1] +
        '-' +
        userInfo.birth[2]
        : ''
    const profileData = useMemo(() => {
        return [
            {
                id: '0',
                title: '性别',
                content: userInfo.sex === 0 ? '男' : '女',
            },
            {
                id: '1',
                title: '身高',
                content: userInfo.height ? userInfo.height + 'cm' : '无',
            },
            {
                id: '2',
                title: '体重',
                content: userInfo.weight ? userInfo.weight + 'kg' : '无',
            },
            {
                id: '3',
                title: '出生日期',
                content: userInfo.birth ? birth : '无',
            },
            {
                id: '4',
                title: '运动习惯',
                content: BodyData[Number(userInfo.exercise)],
            },
            {
                id: '5',
                title: '健康目标',
                content: targetData[Number(userInfo.target)],
            },
        ]
    }, [userInfo])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {userInfo.avatar ? (
                    <Image
                        source={{ uri: userInfo.avatar }}
                        style={{
                            width: 70,
                            height: 70,
                            borderRadius: 100,
                            marginRight: 15,
                        }}
                    ></Image>
                ) : (
                    <Image
                        source={require('@/assets/images/bg_login_header.png')}
                        style={{
                            width: 70,
                            height: 70,
                            borderRadius: 100,
                            marginRight: 10,
                        }}
                    ></Image>
                )}

                <AutoText
                    fontSize={5}
                    style={{
                        width: 80,
                    }}
                    numberOfLines={1}
                >
                    {userInfo.username}
                </AutoText>
            </View>
            {/*    身体数据*/}
            <View>
                {profileData?.map((item) => {
                    return (
                        <View
                            key={item.id}
                            className="flex-row justify-between pt-[15] pb-[15] border-b"
                            style={styles.profileItem}
                        >
                            <Text>{item.title}</Text>
                            <Text>{item.content}</Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 12,
        paddingTop: 12,
        paddingRight: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileItem: {
        borderColor: theme.colors.secondary,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.secondary,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default memo(DrawerContent)
