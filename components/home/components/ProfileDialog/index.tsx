import { Dialog } from '@rneui/themed'
import React from 'react'
import BodyContent from './component/dialog-content'

const ProfileDialog = ({
    dialogVisible,
    cancel,
}: {
    dialogVisible: boolean
    cancel: () => void
}) => {
    return (
        <Dialog
            isVisible={dialogVisible}
            overlayStyle={{
                marginTop: -100,
            }}
        >
            <Dialog.Title title={'个人信息'}></Dialog.Title>
            {dialogVisible && <BodyContent>{{ cancel }}</BodyContent>}
        </Dialog>
    )
}

export default ProfileDialog
