import { FC } from 'react'
import { Button } from 'antd'

const ToDo: FC<PropsType> = (
    {
        id,
        handleComplete,
        completeToggle,
        handleDelete,
        text
    }) => {

    const labelStyle = {
        width: '100%',
        background: '#fff',
        padding: '15px'
    }

    return (
        <label
            className="ant-list-item"
            style={labelStyle}
        >
            <div className="ant-space-align-center">
                <input
                    className="ant-checkbox"
                    type="checkbox"
                    name="toDo" id={`${id}`}
                    onChange={handleComplete}
                    checked={completeToggle}
                />
                {text}
            </div>
            <Button
                danger
                size={'middle'}
                onClick={handleDelete}
                id={`${id}`}>&times;
            </Button>
        </label>
    )
}

export default ToDo

type PropsType = {
    handleComplete: () => void
    id: number
    text: string
    completeToggle: boolean
    handleDelete: () => void
}