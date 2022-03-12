import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Input } from '../common/FormControls/FormControls'
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
                    <Field
                        className="form-control"
                        placeholder="Введите название города"
                        component={Input}
                        validate={[requiredField, minLength2]}
                        name="city"
                    />
                </div>
                <div className="col">
                    <button className="btn btn-primary">Поиск</button>
                </div>
                {error}
            </div>
        </form>
    )
}

const ReduxWeatherForm = reduxForm<PropsType>({ form: 'weatherForm' })(WeatherForm)

export default ReduxWeatherForm