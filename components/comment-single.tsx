import { FoodCommentChildren, FoodCommentSingleData } from "@/apis/types"
import AutoText from "@/common/components/AutoText"
import { FC, memo, useState } from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"

interface IProps {
    children?: any
    data: FoodCommentSingleData | FoodCommentChildren
    width: number
    doLike: any
    commentId: number
}

const CommentSingle: FC<IProps> = ({ data, width, doLike, commentId }) => {
    //点赞
    const [isShowZan, setIsShowZan] = useState(false)
    const showZan = () => {
        setIsShowZan(!isShowZan)
    }

    return (
        <View style={styles.container}>
            {data.avatar ? (
                <Image
                    style={[
                        styles.avatar,
                        {
                            width: width,
                            height: width,
                        }
                    ]}
                    source={{ uri: data.avatar }}
                />
            ) : (
                <Image
                    style={[
                        styles.avatar,
                        {
                            width: width,
                            height: width,
                        }
                    ]}
                    source={require('./../assets/images/bg_login_header.png')}
                />
            )}

            <View style={styles.contentContainer}>
                <AutoText
                    numberOfLines={1}
                    fontSize={5.5}
                    style={styles.username}
                >
                    {data.username}
                </AutoText>
                <TouchableOpacity>
                    <AutoText fontSize={4.8} style={styles.content}>
                        {data.content}
                    </AutoText>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => {
                    doLike(commentId)
                }}
                style={styles.likeContainer}
            >
                {data.isLike || data.like ? (
                    <Image
                        style={styles.likeIcon}
                        source={require('./../assets/icon/zan2.png')}
                    />
                ) : (
                    <Image
                        style={styles.likeIcon}
                        source={require('./../assets/icon/zan1.png')}
                    />
                )}
                <AutoText style={styles.likeNum}>
                    {data.likeNum || data.likes}
                </AutoText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    avatar: {
        borderRadius: 100,
    },
    contentContainer: {
        marginLeft: 10,
        flex: 1,
    },
    username: {
        color: '#cccccc',
        marginBottom: 10,
    },
    content: {
        // fontSize 已在 AutoText 中设置，这里不需要重复
    },
    likeContainer: {
        flexDirection: 'row',
    },
    likeIcon: {
        width: 20,
        height: 20,
        marginTop: 30,
    },
    likeNum: {
        marginTop: 30,
        marginHorizontal: 10,
    }
})

export default memo(CommentSingle)
