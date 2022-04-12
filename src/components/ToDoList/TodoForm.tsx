import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, ReduxInput } from '../common/FormControls/FormControls'
import { minLength, requiredField } from '../../redux/utilities/validators/validators'
import { FC } from 'react'
import { TodoType } from '../../types/types'
import { Button, Col, Row } from 'antd'

const minLength2 = minLength(2)

const TodoForm: FC<InjectedFormProps<TodoType>> = ({ handleSubmit, submitting }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Row>
                <Col md={20}>
                    {createField('Type in some task', 'text', [requiredField, minLength2], ReduxInput)}
                </Col>
                <Col md={4}>
                    <Button
                        htmlType="submit"
                        disabled={submitting}
                        type="primary"
                    >Add todo
                    </Button>
                </Col>
            </Row>
        </form>
    )
}
const TodoReduxForm = reduxForm<TodoType>({ form: 'todoForm' })(TodoForm)

export default TodoReduxForm