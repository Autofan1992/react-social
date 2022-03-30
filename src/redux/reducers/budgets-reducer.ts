import { BudgetType, CurrentBudgetType, ExpenseType } from '../../types/types'
import { v4 as uuidV4 } from 'uuid'
import { FormAction, reset } from 'redux-form'
import { BaseThunkType, InferActionTypes } from '../redux-store'

export const UNCATEGORIZED_BUDGET_ID = 'uncategorized'

const initialState = {
    currentBudget: {
        id: UNCATEGORIZED_BUDGET_ID
    } as CurrentBudgetType,
    budgets: [] as Array<BudgetType>,
    expenses: [] as Array<ExpenseType>
}

const budgetsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'BUDGET/SET_CURRENT_BUDGET':
            return {
                ...state,
                currentBudget: {
                    id: action.payload.id,
                    name: action.payload.name
                }
            }
        case 'BUDGET/ADD_BUDGET':
            if (state.budgets.find(budget => budget.name === action.payload.name)) {
                return state
            }
            return {
                ...state,
                budgets: [
                    ...state.budgets,
                    {
                        id: uuidV4(),
                        name: action.payload.name,
                        max: action.payload.max
                    }
                ]
            }
        case 'BUDGET/ADD_BUDGETS_ARRAY':
            return {
                ...state,
                budgets: [
                    ...state.budgets,
                    ...action.payload
                ]
            }
        case 'BUDGET/ADD_EXPENSES_ARRAY':
            return {
                ...state,
                expenses: [
                    ...state.expenses,
                    ...action.payload
                ]
            }
        case 'BUDGET/DELETE_BUDGET':
            return {
                ...state,
                budgets: state.budgets.filter(budget => budget.id !== action.payload.id)
            }
        case 'BUDGET/ADD_EXPENSE':
            return {
                ...state,
                expenses: [
                    ...state.expenses,
                    {
                        id: uuidV4(),
                        description: action.payload.description,
                        amount: action.payload.amount,
                        budgetId: action.payload.budgetId
                    }
                ]
            }
        case 'BUDGET/DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(expense => {
                    if (expense.id === action.payload.id) return null
                    if (expense.budgetId !== action.payload.id) return expense
                    return expense.budgetId = UNCATEGORIZED_BUDGET_ID
                })
            }
        default:
            return state
    }
}

export const actions = {
    setCurrentBudget: (id: string, name: string) => ({
        type: 'BUDGET/SET_CURRENT_BUDGET',
        payload: {
            id,
            name
        }
    } as const),
    addBudget: (name: string, max: number) => ({
        type: 'BUDGET/ADD_BUDGET',
        payload: {
            name,
            max
        }
    } as const),
    addBudgetsArray: (budgets: Array<BudgetType>) => ({
        type: 'BUDGET/ADD_BUDGETS_ARRAY',
        payload: budgets
    } as const),
    addExpensesArray: (expenses: Array<ExpenseType>) => ({
        type: 'BUDGET/ADD_EXPENSES_ARRAY',
        payload: expenses
    } as const),
    deleteBudget: (id: string) => ({
        type: 'BUDGET/DELETE_BUDGET',
        payload: {
            id
        }
    } as const),
    addExpense: (description: string, amount: number, budgetId: string) => ({
        type: 'BUDGET/ADD_EXPENSE',
        payload: {
            description,
            amount,
            budgetId
        }
    } as const),
    deleteExpense: (id: string) => ({
        type: 'BUDGET/DELETE_EXPENSE',
        payload: {
            id
        }
    } as const)
}

export const requestBudgets = (): ThunkType => async dispatch => {
    const jsonValue = localStorage.getItem('budgets')
    if (jsonValue != null) {
        const data = JSON.parse(jsonValue)
        dispatch(actions.addBudgetsArray(data))
    }
}

export const requestExpenses = (): ThunkType => async dispatch => {
    const jsonValue = localStorage.getItem('expenses')
    if (jsonValue != null) {
        const data = JSON.parse(jsonValue)
        dispatch(actions.addExpensesArray(data))
    }
}

export const addExpense = (description: string, amount: number, budgetId = UNCATEGORIZED_BUDGET_ID): ThunkType => async (dispatch, getState) => {
    dispatch(actions.addExpense(description, amount, budgetId))
    dispatch(reset('expensesForm'))
    const expenses = getState().budgetsPage.expenses
    localStorage.setItem('expenses', JSON.stringify(expenses))
}

export const deleteExpense = (id: string): ThunkType => async (dispatch, getState) => {
    dispatch(actions.deleteExpense(id))
    const expenses = getState().budgetsPage.expenses
    localStorage.setItem('expenses', JSON.stringify(expenses))
}

export const deleteBudget = (id: string): ThunkType => async (dispatch, getState) => {
    dispatch(actions.deleteBudget(id))
    dispatch(actions.deleteExpense(id))
    const budgets = getState().budgetsPage.budgets
    localStorage.setItem('budgets', JSON.stringify(budgets))
}

export const addBudget = (name: string, max: number): ThunkType => async (dispatch, getState) => {
    dispatch(actions.addBudget(name, max))
    dispatch(reset('budgetForm'))
    const budgets = getState().budgetsPage.budgets
    localStorage.setItem('budgets', JSON.stringify(budgets))
}

type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes | FormAction>

export default budgetsReducer