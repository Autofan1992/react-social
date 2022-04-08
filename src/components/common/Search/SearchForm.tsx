import React, { FC } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { minLength, requiredField } from '../../../redux/utilities/validators/validators'
import { createField, ReduxInput } from '../FormControls/FormControls'
import { SearchRequestType } from '../../../types/types'
import { Col, Row } from 'antd'

const minLength3 = minLength(3)

const Search: FC<InjectedFormProps<SearchRequestType, PropsType> & PropsType> = (
    {
        handleSubmit,
        error,
        placeholder = 'Type in search request'
    }) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<InputNames>(placeholder, 'text', [requiredField, minLength3], ReduxInput, {
                    type: 'search',
                    onInput: handleSubmit
                })}
            </div>
            <Row style={{
                margin: '20px 0 50px'
            }}>
                <Col>
                    <span>Search within your friends</span>
                </Col>
                <Col xs={1}>
                    {createField<InputNames>('', 'friend', [], ReduxInput, { type: 'checkbox' })}
                </Col>
            </Row>
            {error &&
                <div className="alert alert-danger mt-3" role="alert">
                    {error}
                </div>
            }
        </form>
    )
}

const SearchReduxForm = reduxForm<SearchRequestType, PropsType>({ form: 'searchForm' })(Search)

export default SearchReduxForm

type PropsType = {
    placeholder: string
}

type InputNames = keyof SearchRequestType