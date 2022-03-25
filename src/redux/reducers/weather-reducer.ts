import { WeatherResultCodes } from '../../api/api'
import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { WeatherDataType } from '../../types/types'
import { AppStateType, InferActionTypes } from '../redux-store'
import { weatherAPI } from '../../api/weather-api'

const SET_WEATHER_DATA = 'WEATHER/SET_WEATHER_DATA'
const TOGGLE_IS_FETCHING = 'WEATHER/TOGGLE_IS_FETCHING'

const initialState = {
    weatherInfo: null as WeatherDataType | null,
    isFetching: false as boolean
}

type InitialStateType = typeof initialState
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>
type ActionTypes = InferActionTypes<typeof actions>

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

export const actions = {
    setWeatherData: (payload: WeatherDataType) => ({
        type: SET_WEATHER_DATA,
        payload
    } as const),
    toggleFetching: (payload: boolean) => ({ type: TOGGLE_IS_FETCHING, payload } as const)
}

export const getWeatherData = (cityName: string): ThunkType => async dispatch => {
    dispatch(actions.toggleFetching(true))

    const data = await weatherAPI.getWeatherData(cityName)
    try {
        if (data.cod === WeatherResultCodes.Success) {
            dispatch(actions.setWeatherData(data))
        } else {
            dispatch(stopSubmit('weatherForm', { city: data.message }))
        }
    } catch (e) {
        window.alert(e)
    } finally {
        dispatch(actions.toggleFetching(false))
    }
}

export default weatherReducer