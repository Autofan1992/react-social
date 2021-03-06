import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, ReduxInput } from '../common/FormControls/FormControls'
import { requiredField } from '../../redux/utilities/validators/validators'
import { ProfileType } from '../../types/types'
import { FC } from 'react'

type PropsType = {
    captcha: string | null
}

type InputNamesKeys = Extract<keyof ProfileType, string>

const LoginForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, error, captcha }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="inputBlocks my-3">
                <div className="input-block">
                    {createField<InputNamesKeys>('Email', 'email', [requiredField], ReduxInput, { type: 'email' })}
                </div>
                <div className="input-block my-3">
                    {createField<InputNamesKeys>('Password', 'password', [requiredField], ReduxInput, { type: 'password' })}
                </div>
                <div className="input-block form-check">
                    <label className="form-check-label">
                        {createField<InputNamesKeys>(undefined, 'rememberMe', [], ReduxInput, { type: 'checkbox' })}
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
                        {createField<InputNamesKeys>('Type symbols shown on image', 'captcha', [requiredField], ReduxInput)}
                    </div>
                }
            </div>
            <button className="btn btn-primary px-5">Войти</button>
        </form>
    )
}

const LoginReduxForm = reduxForm<ProfileType, PropsType>({ form: 'loginForm' })(LoginForm)
export default LoginReduxForm