import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import { FieldValidatorType } from '../../../redux/utilities/validators/validators'
import { FC } from 'react'
import { Input } from 'antd'
import styles from './FormControls.module.scss'

const { TextArea } = Input

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

export const ReduxTextarea: FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
    return (
        <FormControl meta={meta}>
            <TextArea {...input} {...props} />
        </FormControl>
    )
}

export const ReduxInput: FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
    return (
        <FormControl meta={meta}>
            <Input {...input} {...props} />
        </FormControl>
    )
}

export const CheckBox: FC<WrappedFieldProps> = ({ input, ...props }) => {
    return (
        <FormControl {...props}>
            <Input {...input} {...props} checked={input.value}/>
        </FormControl>
    )
}

export const createField = <KeysType extends string>(
    placeholder: string | undefined,
    name: KeysType,
    validators: Array<FieldValidatorType>,
    component: string | FC<WrappedFieldProps>,
    props = {},
    text = '') => (
    <>
        <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props} />
        {text}
    </>
)

type FormControlsPropsType = {
    meta: WrappedFieldMetaProps
}