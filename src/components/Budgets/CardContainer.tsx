import { Button, Card, Col, Row } from 'antd'
import { currencyFormatter } from '../../redux/utilities/currencyFormatter'
import { BudgetType, ExpenseType } from '../../types/types'
import BudgetCard from './BudgetCard'
import { UNCATEGORIZED_BUDGET_ID } from '../../redux/reducers/budgets-reducer'

type PropsType = {
    totalExpenses: number
    totalBudget: number
    budgets: Array<BudgetType>
    uncategorizedExpenses: Array<ExpenseType>
    getCurrentBudgetExpenses: (id: string) => Array<ExpenseType>
    showViewExpensesModal: (id: string, name: string) => any
    showAddExpensesModal: (id: string, name: string) => any
}

const CardContainer = (
    {
        totalExpenses,
        totalBudget,
        budgets,
        uncategorizedExpenses,
        showAddExpensesModal,
        showViewExpensesModal,
        getCurrentBudgetExpenses
    }: PropsType) => {

    const totalUncategorizedExpenses = uncategorizedExpenses.reduce((acc, amount) => acc + amount.amount, 0)

    return (
        <>
            <Row>
                {budgets.map(budget => {
                        const amount = getCurrentBudgetExpenses(budget.id).reduce((acc, expense) => acc + expense.amount, 0)
                        const expensesPercent = Math.round((amount / budget.max) * 100)

                        return <Col md={12} key={budget.id}>
                            <BudgetCard
                                name={budget.name} id={budget.id} max={budget.max}
                                expensesPercent={expensesPercent} amount={amount}
                                showViewExpensesModal={showViewExpensesModal}
                                showAddExpensesModal={showAddExpensesModal}/>
                        </Col>
                    }
                )}
            </Row>
            {uncategorizedExpenses.length > 0 &&
                <Card type="inner" title="Uncategorized Expenses" style={{ marginTop: 15 }}>
                    <p>{currencyFormatter.format(totalUncategorizedExpenses)}</p>
                    <Button onClick={() => showViewExpensesModal(UNCATEGORIZED_BUDGET_ID, '')}>View Expenses</Button>
                </Card>
            }
            {totalExpenses > 0 &&
                <Card type="inner" title="Total Expenses" style={{ marginTop: 15 }}>
                    <p>{currencyFormatter.format(totalExpenses)} {totalBudget > 0 && `/ ${currencyFormatter.format(totalBudget)}`}</p>
                </Card>
            }
        </>
    )
}

export default CardContainer