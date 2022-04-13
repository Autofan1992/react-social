import React, { FC } from 'react'
import { Alert, Modal } from 'antd'

const RequestResultModal: FC<PropsType> = ({ requestResult, successText, errorText, visible }) => {
    return (
       <Modal visible={visible} closable={false} footer={null} bodyStyle={{padding: '0'}}>
            {requestResult
                ? <Alert message={successText} type="success"/>
                : <Alert message={errorText} type="error"/>
            }
        </Modal>
    )
}


export default RequestResultModal

type PropsType = {
    requestResult: boolean
    successText: string
    errorText: string
    visible: boolean
}