import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfileForm from './ProfileForm/ProfileForm'
import { useState } from 'react'
import { ProfileType } from '../../types/types'
import Preloader from '../common/preloader/Preloader'

type PropsType = {
    saveProfile: (formData: ProfileType) => void
    saveProfileResult: boolean
    profile: ProfileType
    userId: number | null
    isOwner: boolean
    isAuth: boolean
    status: string
    updateUserStatus: (status: string) => void
    statusChangeResult: boolean
    updateUserAvatar: (avatar: File) => void
    isFetchingAvatar: boolean
    setEditMode: () => void
    error: string
}

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