import { getGroupListApi } from '@/apis';
import { GroupInfoType, GroupQueryParams } from '@/apis/types';
import Container from '@/common/components/container';
import { useLoginRegisterStore } from '@/store';
import theme from '@/styles/theme/color';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GroupsManage() {

    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    const [myGroups, setMyGroups] = useState<GroupInfoType[]>([])
    const [groups, setGroups] = useState<GroupInfoType[]>([])
    const router = useRouter()

    // 获取小组
    const getGroupList = (groupParams: GroupQueryParams) => {
        getGroupListApi(groupParams).then(res => {
            if (res.data) {
                console.log(res.data)
                if (groupParams.ownerId) {
                    setMyGroups(res.data)
                }

                if (groupParams.userid) {
                    // 和自己的groups去重
                    const joinedGroups = res.data.filter(item => item.isInner && item.ownerId !== userInfo.id)
                    setGroups(joinedGroups)
                }
            }
        }).catch(error => {
            console.log("error", error)

        })
    }

    const handleClick = (id: number) => {
        router.navigate(`/more-cpages/group/c-pages/group-detail?id=${id}`)
    }

    useEffect(() => {
        getGroupList({
            ownerId: userInfo.id
        })
        getGroupList({
            userid: userInfo.id
        })
    }, [])
    return (
        <Container>
            <ScrollView style={styles.container}>
                {/* 我的小组 */}
                <View>
                    <Text>我的小组</Text>
                    <View style={styles.group}>
                        {
                            myGroups?.map(item => {
                                return <TouchableOpacity style={styles.groupItem} key={item.id} onPress={() => handleClick(item.id)}>
                                    <Image source={item.avatar} style={{
                                        width: 50,
                                        height: 50
                                    }} />
                                    <View>
                                        <Text>
                                            {item.groupName}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            })
                        }
                    </View>

                </View>

                {/*  我加入的小组*/}
                <View>
                    <Text>我加入的小组</Text>
                    <View style={styles.group}>
                        {
                            groups?.map(item => {
                                return <TouchableOpacity style={styles.groupItem} key={item.id} onPress={() => handleClick(item.id)}>
                                    <Image source={item.avatar} style={{
                                        width: 50,
                                        height: 50
                                    }} />
                                    <View>
                                        <Text>
                                            {item.groupName}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            })
                        }
                    </View>
                </View>

            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },
    group: {
        marginBottom: 20
    },
    groupItem: {
        padding: 5,
        borderColor: theme.colors.deep01Primary,
        borderWidth: 0.5,
        borderRadius: 10,
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20

    }
});