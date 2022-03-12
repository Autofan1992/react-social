import { Card } from 'antd'
import { currencyFormatter } from '../../redux/utilities/currencyFormatter'
import { FC } from 'react'

type PropsType = {
    totalExpenses: number
    totalBudget: number
}

const TotalBudgetCard: FC<PropsType> = ({ totalExpenses, totalBudget }) => {
    return (
        <div className="site-card-border-less-wrapper">
            <Card title="Total Expenses" bordered={false}>
                <p>{currencyFormatter.format(totalExpenses)} / {currencyFormatter.format(totalBudget)}</p>
            </Card>
        </div>
    )
}

export default TotalBudgetCard