import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { BudgetType } from '../../types/types'
import { Input } from '../common/FormControls/FormControls'
import { maxLength, minLength, requiredField } from '../../redux/utilities/validators/validators'
import { Button, Modal } from 'antd'
import { FC } from 'react'

const maxLength500 = maxLength(500)
const minLength2 = minLength(2)

type PropsType = {
    isModalVisible: boolean
    handleCancel: () => void
}

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
                    <Field
                        placeholder="Add budget title"
                        name={'name'}
                        component={Input}
                        validate={[requiredField, minLength2, maxLength500]}
                    />
                    <Field
                        placeholder="Max budget"
                        parse={(value: number) => +value}
                        name={'max'}
                        min={0}
                        step={1}
                        type={'number'}
                        component={Input}
                        validate={requiredField}
                    />
                </div>
                <Button type="primary" htmlType="submit">Add budget</Button>
            </form>
        </Modal>
    )
}

const BudgetReduxForm = reduxForm<BudgetType, PropsType>({ form: 'budgetForm' })(AddBudgetForm)

export default BudgetReduxForm