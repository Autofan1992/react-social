import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { AppStateType } from '../../redux/redux-store'
import {
    getExpenses,
    getBudgets, getCurrentBudget, getExpensesById, getUncategorizedExpenses,
} from '../../redux/selectors/budgets-selectors'
import {
    addBudget,
    addExpense,
    deleteBudget,
    deleteExpense,
    requestBudgets, requestExpenses, setCurrentBudget, UNCATEGORIZED_BUDGET_ID,
} from '../../redux/reducers/budgets-reducer'
import { connect, ConnectedProps } from 'react-redux'
import BudgetForm from './BudgetForm'
import { BudgetType, ExpenseType } from '../../types/types'
import { FC, useEffect } from 'react'
import { useToggle } from '../../hooks/useToggle'
import ExpenseForm from './ExpenseForm'
import ViewExpensesModal from './ViewExpensesModal'
import CardContainer from './CardContainer'
import './Budgets.module.scss'

const { Title } = Typography

const BudgetsContainer: FC<PropsFromRedux> = (
    {
        budgets,
        expenses,
        addBudget,
        deleteBudget,
        requestBudgets,
        requestExpenses,
        addExpense,
        deleteExpense,
        setCurrentBudget,
        currentBudget,
        uncategorizedExpenses
    }) => {

    useEffect(() => {
        requestBudgets()
        requestExpenses()
    }, [requestBudgets, requestExpenses])

    const [isBudgetModalVisible, setBudgetModalVisible] = useToggle(false)
    const [isAddExpensesModalVisible, setAddExpensesModalVisible] = useToggle(false)
    const [isViewExpensesModalVisible, setViewExpensesModalVisible] = useToggle(false)

    const onAddExpenseModalShow = (id: string, name: string) => {
        setCurrentBudget(id, name)
        setAddExpensesModalVisible()
    }

    const onViewExpensesModalShow = (id: string, name: string) => {
        setCurrentBudget(id, name)
        setViewExpensesModalVisible()
    }

    const handleBudgetSubmit = ({ name, max }: BudgetType) => {
        addBudget(name, max)
        setBudgetModalVisible()
    }

    const handleBudgetDelete = (id: string) => {
        deleteBudget(id)
        setViewExpensesModalVisible()
    }

    const handleExpenseSubmit = ({ description, amount, budgetId }: ExpenseType) => {
        const id = budgetId ?? currentBudget.id
        addExpense(description, amount, id)
        setAddExpensesModalVisible()
    }

    const handleExpenseDelete = (id: string) => {
        id === UNCATEGORIZED_BUDGET_ID && setViewExpensesModalVisible()
        deleteExpense(id)
        setViewExpensesModalVisible()
    }

    const getCurrentBudgetExpenses = (id: string) => {
        return getExpensesById(expenses, id)
    }

    const totalBudget = budgets.reduce((acc, amount) => acc + amount.max, 0)
    const totalExpenses = expenses.reduce((acc, amount) => acc + amount.amount, 0)

    return (
        <>
            <Row>
                <Col lg={12}>
                    <Card>
                        <Space size="middle" align="baseline">
                            <Title>Budgets</Title>
                            <Button type="primary" onClick={setBudgetModalVisible}>Add budget</Button>
                            <Button onClick={() => onAddExpenseModalShow(UNCATEGORIZED_BUDGET_ID, '')}>Add
                                Expense</Button>
                        </Space>
                        <CardContainer
                            uncategorizedExpenses={uncategorizedExpenses}
                            totalExpenses={totalExpenses} totalBudget={totalBudget}
                            getCurrentBudgetExpenses={getCurrentBudgetExpenses}
                            showAddExpensesModal={onAddExpenseModalShow}
                            showViewExpensesModal={onViewExpensesModalShow}
                            budgets={budgets}
                        />
                    </Card>
                </Col>
            </Row>
            <BudgetForm
                isModalVisible={isBudgetModalVisible} handleCancel={setBudgetModalVisible}
                onSubmit={handleBudgetSubmit}/>
            <ExpenseForm
                budgets={budgets}
                budgetExpense={currentBudget}
                isModalVisible={isAddExpensesModalVisible}
                handleCancel={setAddExpensesModalVisible}
                onSubmit={handleExpenseSubmit} getCurrentBudgetExpenses={getCurrentBudgetExpenses}
                setCurrentBudget={setCurrentBudget}/>
            <ViewExpensesModal
                deleteBudget={handleBudgetDelete}
                deleteExpense={handleExpenseDelete}
                budgetExpense={currentBudget}
                getCurrentBudgetExpenses={getCurrentBudgetExpenses} isModalVisible={isViewExpensesModalVisible}
                handleCancel={setViewExpensesModalVisible} setCurrentBudget={setCurrentBudget}/>
        </>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        currentBudget: getCurrentBudget(state),
        expenses: getExpenses(state),
        uncategorizedExpenses: getUncategorizedExpenses(state),
        budgets: getBudgets(state),
    }
}

const mapDispatchToProps = {
    addBudget,
    deleteBudget,
    addExpense,
    deleteExpense,
    requestBudgets,
    requestExpenses,
    setCurrentBudget
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(BudgetsContainer)


