import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Input } from '../common/FormControls/FormControls'
import { requiredField } from '../../redux/utilities/validators/validators'
import { ProfileType } from '../../types/types'
import { FC } from 'react'

type PropsType = {
    captcha: string | null
}

const LoginForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, error, captcha }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="inputBlocks my-3">
                <div className="input-block">
                    <Field
                        component={Input}
                        validate={[requiredField]}
                        name={'email'} type={'email'} placeholder="Email"
                    />
                </div>
                <div className="input-block my-3">
                    <Field
                        component={Input}
                        validate={[requiredField]}
                        name={'password'} type={'password'} placeholder="Password"
                    />
                </div>
                <div className="input-block form-check">
                    <label className="form-check-label">
                        <Field
                            className="form-check-input"
                            name={'rememberMe'}
                            component={'input'} type={'checkbox'}
                        />
                        <p className="mb-0">Запомнить меня</p>
                    </label>
                </div>
                {error &&
                    <div className="alert alert-danger mt-3" role="alert">
                        {error}
                    </div>
                }
                {captcha &&
                    <div className="input-block">
                        <div className="my-3"><img src={captcha} alt=""/></div>
                        <Field name={'captcha'} component={'input'} type={'text'} validate={[requiredField]}/>
                    </div>
                }
            </div>
            <button className="btn btn-primary px-5">Войти</button>
        </form>
    )
}

const LoginReduxForm = reduxForm<ProfileType, PropsType>({ form: 'loginForm' })(LoginForm)
export default LoginReduxForm