import AutoText from '@/common/components/AutoText'
import { BodyData, targetData } from '@/constants/body'
import { useLoginRegisterStore } from '@/store'
import theme from '@/styles/theme/color'
import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface IProps {
    children?: ReactNode
}

const DrawerContent: FC<IProps> = () => {
    const { profile } = useLoginRegisterStore.getState()

    const birth = profile.birth
        ? profile.birth[0] +
          '-' +
          '0' +
          profile.birth[1] +
          '-' +
          profile.birth[2]
        : ''
    const profileData = [
        {
            id: '0',
            title: '性别',
            content: profile.sex === 0 ? '男' : '女',
        },
        {
            id: '1',
            title: '身高',
            content: profile.height ? profile.height + 'cm' : '无',
        },
        {
            id: '2',
            title: '体重',
            content: profile.weight ? profile.weight + 'kg' : '无',
        },
        {
            id: '3',
            title: '出生日期',
            content: profile.birth ? birth : '无',
        },
        {
            id: '4',
            title: '运动习惯',
            content: BodyData[Number(profile.exercise)],
        },
        {
            id: '5',
            title: '健康目标',
            content: targetData[Number(profile.target)],
        },
    ]
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {profile.avatar ? (
                    <Image
                        source={{ uri: profile.avatar }}
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
                        width: 120,
                    }}
                    numberOfLines={1}
                >
                    {profile.username}
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
