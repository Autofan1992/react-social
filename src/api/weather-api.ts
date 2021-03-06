import { weatherInstance, WeatherResultCodes } from './api'

type WeatherDataResponse = {
    cod: WeatherResultCodes
    message: string
}

export const weatherAPI = {
    getWeatherData: (cityName: string) => weatherInstance
        .get<WeatherDataResponse>(`weather?q=${cityName}&appid=b979e8592b62a595eec4ec0cf4ac691f&units=metric&lang=ru`)
        .then(res => res.data)
        .catch(e => e.response)
}