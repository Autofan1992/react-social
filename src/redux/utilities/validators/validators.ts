export type FieldValidatorType = (value: string) => string | undefined

export const requiredField: FieldValidatorType = value => {
    return value ? undefined : 'This field is required'
}

export const maxLength = (length: number): FieldValidatorType => value => {
    if(!value?.length) return undefined
    return (length < value?.length ) ? `Max length is ${length} symbols` : undefined
}

export const minLength = (length: number): FieldValidatorType => value => {
    if(!value?.length) return undefined
    return (length > value?.length) ? `Min length is ${length} symbols` : undefined
}