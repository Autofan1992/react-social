import styles from './ProfileForm.module.scss'
import profileThumbnailBig from '../../../images/profile-thumbnail-big.jpg'
import { CheckBox, createField, Input, Textarea } from '../../common/FormControls/FormControls'
import { requiredField } from '../../../redux/utilities/validators/validators'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { ProfileType } from '../../../types/types'
import { FC } from 'react'

type PropsType = {
    profile: ProfileType
    error: string
}

type InputNames = keyof ProfileType

const ProfileForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ profile, handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.profileInfo}>
                <div className={styles.thumbImg}>
                    <img src={profileThumbnailBig} alt="thumbnail"/>
                </div>
                <div className={styles.authorInfo}>
                    <div className={styles.topInfo}>
                        <div className={styles.infoBlock}>
                            <div className={styles.fieldBlock}>
                                <p>
                                    <span className="fw-bold">Full name</span>
                                </p>
                                {createField<InputNames>('Type your full name', 'fullName', [requiredField], Input, profile.fullName)}
                            </div>
                            <div className={styles.fieldBlock}>
                                <p><b>About me</b></p>
                                {createField<InputNames>('Write about yourself', 'aboutMe', [], Textarea, profile.aboutMe)}
                            </div>
                        </div>
                        <div className={styles.infoBlock}>
                            <div className={styles.fieldBlock} style={{ display: 'flex' }}>
                                <p style={{ marginRight: '.5rem' }}>
                                    <span className="fw-bold">Looking for a job</span>
                                </p>
                                {createField<InputNames>('', 'lookingForAJob', [], CheckBox, { type: 'checkbox' })}
                            </div>
                            <div className={styles.fieldBlock}>
                                <p>
                                    <span className="fw-bold">My skills</span>
                                </p>
                                {createField<InputNames>('Type your skills', 'lookingForAJobDescription', [], Textarea, profile.lookingForAJobDescription)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.contacts}>
                        <p><b>My socials</b></p>
                        <div className="row">
                            {Object.entries(profile.contacts).map(([title]) => (
                                <div className="col-auto mb-2" key={title}>
                                    <p className="mb-1">{title}</p>
                                    <Field
                                        name={'contacts.' + title}
                                        type={'url'}
                                        component={Input}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {error && <p className="red">{error}</p>}
                    <button className="btn btn-secondary">Save profile</button>
                </div>
            </div>
        </form>
    )
}

const ReduxProfileForm = reduxForm<ProfileType, PropsType>({ form: 'editProfile' })(ProfileForm)

export default ReduxProfileForm