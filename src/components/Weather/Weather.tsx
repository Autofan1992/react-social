import { WeatherDataType, WeatherType } from '../../types/types'
import { FC } from 'react'

type PropsType = {
    weatherData: WeatherDataType
}

const Weather: FC<PropsType> = ({ weatherData }) => {
    const sunriseDate = new Date(1000 * weatherData.sys.sunrise)
    const sunsetDate = new Date(1000 * weatherData.sys.sunset)

    return <>
        <div className="location mt-3">
            <h1 className="fw-bold">{weatherData.name}, {weatherData.country}</h1>
        </div>
        <div className="temperature">
            <div className="d-flex align-items-center">
                <div className="icon">
                    {weatherData.weather.map((w: WeatherType, i: number) => w.icon &&
                        <img key={i} src={`https://openweathermap.org/img/wn/${w.icon}.png`} alt=""/>)}
                </div>
                <h2 className="mt-2 mb-4">Температура {Math.round(weatherData.main.temp)}, °C</h2>
            </div>
            <p><span className="fw-bold">Ощущается как:</span> {Math.round(weatherData.main.feels_like)} °C</p>
            <p><span className="fw-bold">Описание погоды:</span> {weatherData.weather.map(w => w.description)}</p>
            <p><span className="fw-bold">Скорость ветра:</span> {Math.round(weatherData.wind.speed)} м/с</p>
            <p><span
                className="fw-bold">Время рассвета:</span> {`${sunriseDate.getHours()} : ${sunriseDate.getMinutes()} : ${sunriseDate.getSeconds()}`}
            </p>
            <p><span
                className="fw-bold">Время заката:</span> {`${sunsetDate.getHours()} : ${sunsetDate.getMinutes()} : ${sunsetDate.getSeconds()}`}
            </p>
        </div>
    </>
}

export default Weather