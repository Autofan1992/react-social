import styles from './FormControls.module.scss'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import { FieldValidatorType } from '../../../redux/utilities/validators/validators'
import { FC } from 'react'

type FormControlsPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: FC<FormControlsPropsType> = ({ meta, children }) => {
    const hasError = meta.touched && meta.error

    return (
        <>
            {children}
            {hasError &&
                <span className={styles.errorLabel} style={{ padding: '5px' }}>{meta.error}</span>
            }
        </>
    )
}

export const Textarea: FC<WrappedFieldProps> = ({ input, ...props }) => {
    return (
        <FormControl {...props}>
            <textarea {...input} {...props} />
        </FormControl>
    )
}

export const Input: FC<WrappedFieldProps> = ({ input, ...props }) => {
    return (
        <FormControl {...props}>
            <input {...input} {...props} />
        </FormControl>
    )
}

export const CheckBox: FC<WrappedFieldProps> = ({ input, ...props }) => {
    return (
        <FormControl {...props}>
            <input {...input} {...props} type="checkbox" checked={input.value}/>
        </FormControl>
    )
}

export const createField = (placeholder: string, name: string, validators: Array<FieldValidatorType>, component: string | FC, props = {}, text = '') => (
    <div>
        <Field name={name} validate={validators} component={component} {...props} />
        {text}
    </div>
)