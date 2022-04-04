export type FieldValidatorType = (value: string) => string | undefined

export const requiredField: FieldValidatorType = value => {
    return value ? undefined : 'Это поле обьязательно для заполнения'
}

export const maxLength = (length: number): FieldValidatorType => value => {
    return (value.length > length) ? `Макс. длинна сотсавляет ${length} символов` : undefined
}

export const minLength = (length: number): FieldValidatorType => value => {
    return (value.length < length) ? `Мин. длинна сотсавляет ${length} символов` : undefined
}