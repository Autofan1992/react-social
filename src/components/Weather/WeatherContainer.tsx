import { connect, ConnectedProps } from 'react-redux'
import Weather from './Weather'
import { getWeatherData } from '../../redux/reducers/weather-reducer'
import Preloader from '../common/preloader/Preloader'
import styles from './Weather.module.scss'
import { getIsFetching, getWeatherInfo } from '../../redux/selectors/weather-selectors'
import ReduxWeatherForm from './WeatherForm'
import { AppStateType } from '../../redux/redux-store'
import { FC } from 'react'

type PropsType = {
    city: string
}

const WeatherContainer: FC<PropsFromRedux> = ({ getWeatherData, weatherData, fetchingStatus }) => {

    const requestWeatherData = ({ city }: PropsType) => {
        getWeatherData(city)
    }

    return (
        <div className={styles.weatherWrapper}>
            <ReduxWeatherForm
                onSubmit={requestWeatherData}
            />
            {fetchingStatus
                ? <Preloader/>
                : weatherData && <Weather
                weatherData={weatherData}
            />
            }
        </div>
    )
}

const mapState = (state: AppStateType) => {
    return {
        fetchingStatus: getIsFetching(state),
        weatherData: getWeatherInfo(state)
    }
}

const mapDispatch = {
    getWeatherData
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(WeatherContainer)