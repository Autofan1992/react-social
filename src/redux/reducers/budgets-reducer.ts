import { BudgetType, CurrentBudgetType, ExpenseType } from '../../types/types'
import { v4 as uuidV4 } from 'uuid'
import { FormAction, reset } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from '../redux-store'

export const UNCATEGORIZED_BUDGET_ID = 'uncategorized'
const ADD_BUDGET = 'BUDGET/ADD_BUDGET'
const SET_CURRENT_BUDGET = 'BUDGET/SET_CURRENT_BUDGET'
const ADD_BUDGETS_ARRAY = 'BUDGET/ADD_BUDGETS_ARRAY'
const ADD_EXPENSES_ARRAY = 'BUDGET/ADD_EXPENSES_ARRAY'
const DELETE_BUDGET = 'BUDGET/DELETE_BUDGET'
const ADD_EXPENSE = 'BUDGET/ADD_EXPENSE'
const DELETE_EXPENSE = 'BUDGET/DELETE_EXPENSE'

const initialState = {
    currentBudget: {
        id: UNCATEGORIZED_BUDGET_ID
    } as CurrentBudgetType,
    budgets: [] as Array<BudgetType>,
    expenses: [] as Array<ExpenseType>
}

export type initialStateType = typeof initialState

const budgetsReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case SET_CURRENT_BUDGET:
            return {
                ...state,
                currentBudget: {
                    id: action.payload.id,
                    name: action.payload.name
                }
            }
        case ADD_BUDGET:
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
        case ADD_BUDGETS_ARRAY:
            return {
                ...state,
                budgets: [
                    ...state.budgets,
                    ...action.payload
                ]
            }
        case ADD_EXPENSES_ARRAY:
            return {
                ...state,
                expenses: [
                    ...state.expenses,
                    ...action.payload
                ]
            }
        case DELETE_BUDGET:
            return {
                ...state,
                budgets: state.budgets.filter(budget => budget.id !== action.payload.id)
            }
        case ADD_EXPENSE:
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
        case DELETE_EXPENSE:
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

type ActionTypes =
    AddCurrentBudgetActionType
    | AddBudgetActionType
    | AddBudgetsArrayActionType
    | AddExpensesArrayActionType
    | DeleteBudgetActionType
    | AddExpenseActionType
    | DeleteExpenseActionType

type AddCurrentBudgetActionType = {
    type: typeof SET_CURRENT_BUDGET
    payload: {
        id: string
        name: string
    }
}

export const setCurrentBudget = (id: string, name: string): AddCurrentBudgetActionType => ({
    type: SET_CURRENT_BUDGET,
    payload: {
        id,
        name
    }
})

type AddBudgetActionType = {
    type: typeof ADD_BUDGET
    payload: {
        name: string
        max: number
    }
}

const addBudgetAction = (name: string, max: number): AddBudgetActionType => ({
    type: ADD_BUDGET,
    payload: {
        name,
        max
    }
})

type AddBudgetsArrayActionType = {
    type: typeof ADD_BUDGETS_ARRAY
    payload: Array<BudgetType>
}

const addBudgetsArrayAction = (budgets: Array<BudgetType>): AddBudgetsArrayActionType => ({
    type: ADD_BUDGETS_ARRAY,
    payload: budgets
})

type AddExpensesArrayActionType = {
    type: typeof ADD_EXPENSES_ARRAY
    payload: Array<ExpenseType>
}

const addExpensesArrayAction = (expenses: Array<ExpenseType>): AddExpensesArrayActionType => ({
    type: ADD_EXPENSES_ARRAY,
    payload: expenses
})

type DeleteBudgetActionType = {
    type: typeof DELETE_BUDGET
    payload: {
        id: string
    }
}

const deleteBudgetAction = (id: string): DeleteBudgetActionType => ({
    type: DELETE_BUDGET,
    payload: {
        id
    }
})

type AddExpenseActionType = {
    type: typeof ADD_EXPENSE
    payload: {
        description: string
        amount: number
        budgetId: string
    }
}

const addExpenseAction = (description: string, amount: number, budgetId: string): AddExpenseActionType => ({
    type: ADD_EXPENSE,
    payload: {
        description,
        amount,
        budgetId
    }
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | FormAction>

export const requestBudgets = (): ThunkType => async dispatch => {
    const jsonValue = localStorage.getItem('budgets')
    if (jsonValue != null) {
        const data = JSON.parse(jsonValue)
        dispatch(addBudgetsArrayAction(data))
    }
}

export const requestExpenses = (): ThunkType => async dispatch => {
    const jsonValue = localStorage.getItem('expenses')
    if (jsonValue != null) {
        const data = JSON.parse(jsonValue)
        dispatch(addExpensesArrayAction(data))
    }
}

export const addExpense = (description: string, amount: number, budgetId = UNCATEGORIZED_BUDGET_ID): ThunkType => async (dispatch, getState) => {
    dispatch(addExpenseAction(description, amount, budgetId))
    dispatch(reset('expensesForm'))
    const expenses = getState().budgetsPage.expenses
    localStorage.setItem('expenses', JSON.stringify(expenses))
}

type DeleteExpenseActionType = {
    type: typeof DELETE_EXPENSE
    payload: {
        id: string
    }
}

const deleteExpenseAction = (id: string): DeleteExpenseActionType => ({
    type: DELETE_EXPENSE,
    payload: {
        id
    }
})

export const deleteExpense = (id: string): ThunkType => async (dispatch, getState) => {
    dispatch(deleteExpenseAction(id))
    const expenses = getState().budgetsPage.expenses
    localStorage.setItem('expenses', JSON.stringify(expenses))
}

export const deleteBudget = (id: string): ThunkType => async (dispatch, getState) => {
    dispatch(deleteBudgetAction(id))
    await dispatch(deleteExpenseAction(id))
    const budgets = getState().budgetsPage.budgets
    localStorage.setItem('budgets', JSON.stringify(budgets))
}

export const addBudget = (name: string, max: number): ThunkType => async (dispatch, getState) => {
    dispatch(addBudgetAction(name, max))
    dispatch(reset('budgetForm'))
    const budgets = getState().budgetsPage.budgets
    localStorage.setItem('budgets', JSON.stringify(budgets))
}

export default budgetsReducer