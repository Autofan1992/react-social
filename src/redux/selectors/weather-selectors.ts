import { AppStateType } from '../redux-store'

export const getWeatherInfo = (state: AppStateType) => state.weatherPage.weatherInfo
export const getIsFetching = (state: AppStateType) => state.weatherPage.isFetching