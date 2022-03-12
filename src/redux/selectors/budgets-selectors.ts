import { AppStateType } from '../redux-store'
import { createSelector } from 'reselect'
import { ExpenseType } from '../../types/types'
import { UNCATEGORIZED_BUDGET_ID } from '../reducers/budgets-reducer'

export const getBudgets = (state: AppStateType) => state.budgetsPage.budgets
export const getCurrentBudget = (state: AppStateType) => state.budgetsPage.currentBudget
export const getExpenses = (state: AppStateType) => state.budgetsPage.expenses

export const getExpensesById = createSelector(
    [
        expenses => expenses,
        (expenses: Array<ExpenseType>, budgetId: string) => budgetId
    ], (expenses, budgetId) => expenses.filter(expense => expense.budgetId === budgetId)
)

export const getUncategorizedExpenses = createSelector(
    [
        (state: AppStateType) => state.budgetsPage.expenses,
    ], (expenses: Array<ExpenseType>) => expenses
        .filter(expense => expense.budgetId === UNCATEGORIZED_BUDGET_ID)
)