import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfileForm from './ProfileForm/ProfileForm'
import { useState } from 'react'
import { ProfileType } from '../../types/types'
import Preloader from '../common/preloader/Preloader'
import { PropsType } from './ProfileContainer'

const Profile = ({ saveProfile, saveProfileResult, isAuth, ...props }: PropsType) => {
    const [editMode, setEditMode] = useState(false)

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const handleProfileUpdate = (formData: ProfileType) => {
        saveProfile(formData)
        saveProfileResult && toggleEditMode()
    }

    if (!isAuth) return <Preloader/>

    return (
        <>
            {editMode ?
                <ProfileForm {...props} initialValues={props.profile} onSubmit={handleProfileUpdate}/> :
                <ProfileInfo {...props} setEditMode={toggleEditMode}/>}
        </>
    )
}

export default Profile
