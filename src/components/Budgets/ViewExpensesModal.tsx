import { Button, Col, Divider, Modal, Row, Space, Typography } from 'antd'
import { CurrentBudgetType, ExpenseType } from '../../types/types'
import { UNCATEGORIZED_BUDGET_ID } from '../../redux/reducers/budgets-reducer'
import { currencyFormatter } from '../../redux/utilities/currencyFormatter'
import { FC } from 'react'

const { Title, Paragraph } = Typography

const ViewExpensesModal: FC<PropsType> = (
    {
        budgetExpense,
        isModalVisible,
        handleCancel,
        getCurrentBudgetExpenses,
        deleteExpense,
        deleteBudget
    }) => {

    const expenses = getCurrentBudgetExpenses(budgetExpense.id)
    const cardTitle = budgetExpense.name ? `View expenses for ${budgetExpense.name}` : 'View uncategorized expenses'

    return (
        <Modal footer={null} title={cardTitle} visible={isModalVisible} width={400}
               onCancel={handleCancel}>
            <Space direction="vertical" style={{ width: '100%' }}>
                {expenses.map(expense => {
                    const budgetId = expense.budgetId === UNCATEGORIZED_BUDGET_ID ? expense.id : expense.budgetId
                    return <div key={expense.id}>
                        <Row align="middle">
                            <Col flex={1}>
                                <Space align="baseline" size="middle">
                                    <Title style={{ margin: 0 }} level={3}>{expense.description}</Title>
                                    <Paragraph
                                        style={{ margin: 0 }}>{currencyFormatter.format(expense.amount)}</Paragraph>
                                </Space>
                            </Col>
                            <Col>
                                <Button danger onClick={() => deleteExpense(budgetId)}>&times;</Button>
                            </Col>
                        </Row>
                        <Divider style={{ margin: '15px 0' }}/>
                    </div>
                })}
                {!expenses.find(expense => expense.budgetId === UNCATEGORIZED_BUDGET_ID) &&
                    <div style={{ textAlign: 'center', marginTop: 15 }}>
                        <Button danger onClick={() => deleteBudget(budgetExpense.id)}>Delete
                            Budget</Button>
                    </div>}
            </Space>
        </Modal>
    )
}

export default ViewExpensesModal
type PropsType = {
    deleteExpense: (id: string) => void
    deleteBudget: (id: string) => void
    budgetExpense: CurrentBudgetType
    isModalVisible: boolean
    handleCancel: () => void
    setCurrentBudget: (id: string, name: string) => void
    getCurrentBudgetExpenses: (id: string) => Array<ExpenseType>
}
