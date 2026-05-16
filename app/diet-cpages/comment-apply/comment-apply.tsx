import { doLike as doLikeApi, getCommentApi, getCommentByIdApi, PostDoLikeApi } from "@/apis"
import { FoodCommentSingleData } from "@/apis/types"
import AutoText from "@/common/components/AutoText"
import CommentSingle from '@/components/comment-single'
import { useLoginRegisterStore } from "@/store"
import theme from "@/styles/theme/color"
import { Stack, useLocalSearchParams } from "expo-router"
import { FC, memo, ReactNode, useEffect, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

interface IProps {
    children?: ReactNode
}

const CommentsComply: FC<IProps> = () => {
    const [commentListAll, setCommentListAll] = useState(
        {} as FoodCommentSingleData,
    )

    useEffect(() => {
        console.log(commentListAll, "11111alll", commentListAll.children)
    }, [commentListAll])
    const { id, type, logCommentId } = useLocalSearchParams()
    const userInfo = useLoginRegisterStore((state) => state.userInfo)
    //根据这个id来获取评论
    const getCommentById = () => {
        Number(type) === 1 ? getCommentApi(
            {
                userId: Number(userInfo.id),
                logId: Number(logCommentId),
                logCommentId: Number(id)
            }
        ).then((res) => {
            console.log("res", res.data, res)
            setCommentListAll(res.data?.[0] as any)
        }) : getCommentByIdApi(
            Number(id),
            Number(userInfo.id)
        ).then((res) => {
            setCommentListAll(res.data)
        })
    }
    //根据id来获取这条评论
    useEffect(() => {
        getCommentById()
    }, [])

    //#region 点赞
    const doLike = async (commentId: number) => {
        console.log("111111", type, commentId)
        Number(type) === 1 ? await doLikeApi(userInfo.id as number, commentId) : await PostDoLikeApi(userInfo.id as number, commentId)
        //重新获取评论
        getCommentById()
    }

    //#endregion

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,           // 开启标题栏
                    title: '评论详情',            // 标题文字
                    headerStyle: { backgroundColor: theme.colors.deep01Primary },
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                }}
            />
            {/*主要的回复*/}
            {commentListAll.children ? (
                <View style={styles.comment}>
                    <CommentSingle data={commentListAll} doLike={doLike} commentId={Number(id)} width={40} />
                    {/*    别人的回复*/}
                    <View style={styles.marginTop10}>
                        <AutoText fontSize={5.5}>
                            共{commentListAll.children?.length}条回复
                        </AutoText>
                        {commentListAll.children?.length !== 0
                            ? commentListAll.children.map((item, index) => {
                                return (
                                    <View style={styles.marginTop10} key={index}>
                                        <CommentSingle
                                            commentId={item.id}
                                            width={30}
                                            data={item}
                                            doLike={doLike}
                                        ></CommentSingle>
                                    </View>
                                )
                            })
                            : null}
                    </View>
                </View>
            ) : null}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        flex: 1
    },
    comment: {
        marginTop: 15,
    },
    marginTop10: {
        marginTop: 10
    }

})

export default memo(CommentsComply)
