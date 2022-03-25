import { Button, Card, Progress, Space, Typography } from 'antd'
import { currencyFormatter } from '../../redux/utilities/currencyFormatter'

const { Paragraph } = Typography

type PropsType = {
    name: string
    id: string
    max: number
    expensesPercent: number
    amount: number
    showViewExpensesModal: (id: string, name: string) => any
    showAddExpensesModal: (id: string, name: string) => any
}

const BudgetCard = (
    {
        name,
        expensesPercent,
        amount,
        id,
        max,
        showAddExpensesModal,
        showViewExpensesModal,
    }: PropsType) => {

    let fillColor = 'blue'
    if (expensesPercent > 50) fillColor = 'orange'
    if (expensesPercent > 90) fillColor = 'red'

    return (
        <Card type="inner" title={name} style={{ marginTop: 15 }}>
            <Progress percent={expensesPercent} strokeColor={fillColor} showInfo={expensesPercent < 100}/>
            <Paragraph>{currencyFormatter.format(amount)} / {currencyFormatter.format(max)}</Paragraph>
            <Space>
                <Button type="primary" onClick={() => showAddExpensesModal(id, name)}>Add Expense</Button>
                <Button onClick={() => showViewExpensesModal(id, name)}>View Expenses</Button>
            </Space>
        </Card>
    )
}

export default BudgetCard