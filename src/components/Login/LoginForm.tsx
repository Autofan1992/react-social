import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, Input } from '../common/FormControls/FormControls'
import { requiredField } from '../../redux/utilities/validators/validators'
import { ProfileType } from '../../types/types'
import { FC } from 'react'

type PropsType = {
    captcha: string | null
}

type LoginFormInputNamesKeys = Extract<keyof ProfileType, string>

const LoginForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, error, captcha }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="inputBlocks my-3">
                <div className="input-block">
                    {createField<LoginFormInputNamesKeys>('Email', 'email', [requiredField], Input, { type: 'email' })}
                </div>
                <div className="input-block my-3">
                    {createField<LoginFormInputNamesKeys>('Password', 'password', [requiredField], Input, { type: 'password' })}
                </div>
                <div className="input-block form-check">
                    <label className="form-check-label">
                        {createField<LoginFormInputNamesKeys>(undefined, 'rememberMe', [], Input, { type: 'checkbox' })}
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
                        {createField<LoginFormInputNamesKeys>('Type symbols shown on image', 'captcha', [requiredField], Input)}
                    </div>
                }
            </div>
            <button className="btn btn-primary px-5">Войти</button>
        </form>
    )
}

const LoginReduxForm = reduxForm<ProfileType, PropsType>({ form: 'loginForm' })(LoginForm)
export default LoginReduxForm