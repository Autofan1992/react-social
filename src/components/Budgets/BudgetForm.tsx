import { InjectedFormProps, reduxForm } from 'redux-form'
import { BudgetType } from '../../types/types'
import { createField, ReduxInput } from '../common/FormControls/FormControls'
import { maxLength, minLength, requiredField } from '../../redux/utilities/validators/validators'
import { Button, Modal } from 'antd'
import { FC } from 'react'

const maxLength500 = maxLength(500)
const minLength2 = minLength(2)

const AddBudgetForm: FC<InjectedFormProps<BudgetType, PropsType> & PropsType> = (
    {
        handleSubmit,
        isModalVisible,
        handleCancel
    }) => {

    return (
        <Modal footer={null} title="Basic Modal" visible={isModalVisible} onCancel={handleCancel}>
            <form onSubmit={handleSubmit}>
                <div className="input-block">
                    {createField<InputNames>('Type in budget title', 'name', [requiredField, minLength2, maxLength500], ReduxInput)}
                    {createField<InputNames>('Max budget', 'max', [requiredField], ReduxInput,
                        {
                            type: 'number',
                            min: 0,
                            step: 1,
                            parse: (value: number) => +value
                        })}
                </div>
                <Button type="primary" htmlType="submit">Add budget</Button>
            </form>
        </Modal>
    )
}

const BudgetReduxForm = reduxForm<BudgetType, PropsType>({ form: 'budgetForm' })(AddBudgetForm)

export default BudgetReduxForm

type PropsType = {
    isModalVisible: boolean
    handleCancel: () => void
}

type InputNames = keyof BudgetType
