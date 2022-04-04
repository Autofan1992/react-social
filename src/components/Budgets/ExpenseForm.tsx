import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { BudgetType, CurrentBudgetType, ExpenseType } from '../../types/types'
import { createField, Input } from '../common/FormControls/FormControls'
import { maxLength, minLength, requiredField } from '../../redux/utilities/validators/validators'
import { Button, Modal } from 'antd'
import { UNCATEGORIZED_BUDGET_ID } from '../../redux/reducers/budgets-reducer'
import { FC } from 'react'

const maxLength500 = maxLength(500)
const minLength2 = minLength(2)

const AddExpenseForm: FC<InjectedFormProps<ExpenseType, PropsType> & PropsType> = (
    {
        budgets,
        handleSubmit,
        isModalVisible,
        handleCancel,
        budgetExpense
    }) => {

    const modalTitle = budgetExpense.id === UNCATEGORIZED_BUDGET_ID ? 'Add new expense' : `Add expense to ${budgetExpense.name}  budget`
    const budgetName = budgetExpense.id !== UNCATEGORIZED_BUDGET_ID ? budgetExpense.name : UNCATEGORIZED_BUDGET_ID

    return (
        <Modal footer={null} title={modalTitle} visible={isModalVisible}
               onCancel={handleCancel}>
            <form onSubmit={handleSubmit}>
                <div className="input-block">
                    {createField<InputNames>('Type in expense description', 'description', [requiredField, minLength2, maxLength500], Input)}
                    {createField<InputNames>('Expense amount', 'amount', [requiredField], Input,
                        {
                            type: 'number',
                            min: 0,
                            step: 1
                        }, (value) => +value)}

                    <Field name="budgetId" component="select">
                        <option
                            value={budgetName}>{budgetName}</option>
                        {budgets.map((budget) =>
                            <option key={budget.id} value={budget.id}>{budget.name}</option>
                        )}
                    </Field>
                </div>
                <Button type="primary" htmlType="submit">Add expense</Button>
            </form>
        </Modal>
    )
}

const ExpenseReduxForm = reduxForm<ExpenseType, PropsType>({ form: 'expensesForm' })(AddExpenseForm)

export default ExpenseReduxForm

type PropsType = {
    isModalVisible: boolean
    budgets: Array<BudgetType>
    budgetExpense: CurrentBudgetType
    setCurrentBudget: (id: string, name: string) => void
    getCurrentBudgetExpenses: (id: string) => Array<ExpenseType>
    handleCancel: () => void
}

type InputNames = keyof ExpenseType