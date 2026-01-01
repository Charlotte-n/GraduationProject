const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: '个人资料',
        path: '/mine-cpage/profile',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: '我的收藏',
        path: '/mine-cpage/collect',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: '摄入管理',
        path: '/mine-cpage/intake',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29234',
        title: '身体数据',
        path: '/mine-cpage/body',
    },
    // {
    //     id: '58694a0f-3da1-471f-bd96-145571e29235',
    //     title: '小工具',
    //     path:'tool'
    // },
]

//个人资料

const BodyData = [
    '久坐不动',
    '轻度活动',
    '中度活动',
    '重度活动',
    '非常重度活动',
]

const BodyTargetData = [
    {
        key: '0',
        target: '减脂',
    },
    {
        key: '1',
        target: '温和减脂',
    },
    {
        key: '2',
        target: '保持体型',
    },
    {
        key: '3',
        target: '温和增肌',
    },
    {
        key: '4',
        target: '增肌',
    },
]
const targetData = ['减脂', '温和减脂', '保持体型', '温和增肌', '增肌']

export { BodyData, BodyTargetData, DATA, targetData }
