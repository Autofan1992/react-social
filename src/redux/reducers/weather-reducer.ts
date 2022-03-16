import { weatherAPI, WeatherResultCodes } from '../../api/api'
import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { WeatherDataType } from '../../types/types'
import { AppStateType } from '../redux-store'

const SET_WEATHER_DATA = 'WEATHER/SET_WEATHER_DATA'
const TOGGLE_IS_FETCHING = 'WEATHER/TOGGLE_IS_FETCHING'

const initialState = {
    weatherInfo: null as WeatherDataType | null,
    isFetching: false as boolean
}

export type InitialStateType = typeof initialState

const weatherReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_WEATHER_DATA:
            return {
                ...state,
                weatherInfo: action.payload,
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        default:
            return state
    }
}

type ActionTypes =
    setWeatherDataActionType |
    toggleFetchingActionType

type setWeatherDataActionType = {
    type: typeof SET_WEATHER_DATA
    payload: WeatherDataType
}
export const setWeatherData = (payload: WeatherDataType): setWeatherDataActionType => ({
    type: SET_WEATHER_DATA,
    payload
})

type toggleFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    payload: boolean
}
export const toggleFetching = (payload: boolean): toggleFetchingActionType => ({ type: TOGGLE_IS_FETCHING, payload })

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

export const getWeatherData = (cityName: string): ThunkType => async dispatch => {
    dispatch(toggleFetching(true))

    const data = await weatherAPI.getWeatherData(cityName)

    try {
        if (data.cod === WeatherResultCodes.Success) {
            dispatch(setWeatherData(data))
        } else {
            dispatch(stopSubmit('weatherForm', { city: data.message }))
        }
    } catch (e) {
        window.alert(e)
    } finally {
        dispatch(toggleFetching(false))
    }
}

export default weatherReducer