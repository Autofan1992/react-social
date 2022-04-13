import styles from './ProfileForm.module.scss'
import profileThumbnailBig from '../../../images/profile-thumbnail-big.jpg'
import { createField, ReduxInput, ReduxTextarea } from '../../common/FormControls/FormControls'
import { requiredField } from '../../../redux/utilities/validators/validators'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { ProfileType } from '../../../types/types'
import { FC } from 'react'
import { Button } from 'antd'
import { PropsType } from '../ProfileContainer'

const ProfileForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = (
    {
        profile,
        handleSubmit,
        toggleEditMode,
        isFetching,
        error,
        anyTouched
    }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.profileInfo}>
                <div className={styles.thumbImg}>
                    <img src={profileThumbnailBig} alt="thumbnail"/>
                </div>
                <Button type="primary" size="large" disabled={isFetching} onClick={toggleEditMode}>Back to
                    profile</Button>
                <div className={styles.authorInfo}>
                    <div className={styles.topInfo}>
                        <div className={styles.infoBlock}>
                            <div className={styles.fieldBlock}>
                                <p>
                                    <span className="fw-bold">Full name</span>
                                </p>
                                {createField<InputNames>('Type your full name', 'fullName', [requiredField], ReduxInput)}
                            </div>
                            <div className={styles.fieldBlock}>
                                <p><b>About me</b></p>
                                {createField<InputNames>('Write about yourself', 'aboutMe', [], ReduxTextarea)}
                            </div>
                        </div>
                        <div className={styles.infoBlock}>
                            <div className={styles.fieldBlock} style={{ display: 'flex' }}>
                                <p style={{ marginRight: '.5rem' }}>
                                    <span className="fw-bold">Looking for a job</span>
                                </p>
                                {createField<InputNames>(undefined, 'lookingForAJob', [], ReduxInput, { type: 'checkbox' })}
                            </div>
                            <div className={styles.fieldBlock}>
                                <p>
                                    <span className="fw-bold">My skills</span>
                                </p>
                                {createField<InputNames>('Type your skills', 'lookingForAJobDescription', [], ReduxTextarea)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.contacts}>
                        <p><b>My socials</b></p>
                        <div className="row">
                            {Object.entries(profile.contacts).map(([title]) => (
                                <div className="col-auto mb-2" key={title}>
                                    <p className="mb-1">{title}</p>
                                    {createField(undefined, `contacts.${title}`, [], ReduxInput, { type: 'url' })}
                                </div>
                            ))}
                        </div>
                    </div>
                    {error && <p className="red">{error}</p>}
                    <Button htmlType="submit" type="primary" size="large" disabled={!anyTouched || isFetching}>Save
                        profile</Button>
                </div>
            </div>
        </form>
    )
}

const ReduxProfileForm = reduxForm<ProfileType, PropsType>({ form: 'editProfile' })(ProfileForm)

type InputNames = keyof ProfileType

export default ReduxProfileForm