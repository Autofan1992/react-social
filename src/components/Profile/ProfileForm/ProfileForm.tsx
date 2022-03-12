import styles from './ProfileForm.module.scss'
import profileThumbnailBig from '../../../images/profile-thumbnail-big.jpg'
import { CheckBox, Input, Textarea } from '../../common/FormControls/FormControls'
import { requiredField } from '../../../redux/utilities/validators/validators'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { ProfileType } from '../../../types/types'
import { FC } from 'react'

type PropsType = {
    profile: ProfileType
    error: string
}

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
                                    <span className="fw-bold">Полное Имя:</span>
                                </p>
                                <Field
                                    name={'fullName'}
                                    component={Input}
                                    validate={[requiredField]}
                                    value={profile.fullName}
                                />
                            </div>
                            <div className={styles.fieldBlock}>
                                <p><b>Обо мне</b></p>
                                <Field
                                    name={'aboutMe'}
                                    component={Textarea}
                                    value={profile.aboutMe}
                                />
                            </div>
                        </div>
                        <div className={styles.infoBlock}>
                            <div className={`${styles.fieldBlock} d-flex`}>
                                <p className="me-2">
                                    <span className="fw-bold">В поисках работы:</span>
                                </p>
                                <Field
                                    name={'lookingForAJob'}
                                    component={CheckBox}
                                />
                            </div>
                            <div className={styles.fieldBlock}>
                                <p>
                                    <span className="fw-bold">Мои навыки:</span>
                                </p>
                                <Field
                                    name={'lookingForAJobDescription'}
                                    component={Textarea}
                                    value={profile.lookingForAJobDescription}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.contacts}>
                        <p><b>Я в соцсетях:</b></p>
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
                    <button className="btn btn-secondary">Сохранить</button>
                </div>
            </div>
        </form>
    )
}

const ReduxProfileForm = reduxForm<ProfileType, PropsType>({ form: 'editProfile' })(ProfileForm)

export default ReduxProfileForm