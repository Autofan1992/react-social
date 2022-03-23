import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, Input } from '../common/FormControls/FormControls'
import { minLength, requiredField } from '../../redux/utilities/validators/validators'
import { FC } from 'react'

const minLength2 = minLength(2)

type PropsType = {
    handleSubmit: () => void
    error: string
    city: string
}

const WeatherForm: FC<InjectedFormProps<PropsType>> = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    {createField('Type city name', 'city', [requiredField, minLength2], Input)}
                </div>
                <div className="col">
                    <button className="btn btn-primary">Search</button>
                </div>
                {error}
            </div>
        </form>
    )
}

const ReduxWeatherForm = reduxForm<PropsType>({ form: 'weatherForm' })(WeatherForm)

export default ReduxWeatherForm