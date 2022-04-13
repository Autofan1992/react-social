import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfileForm from './ProfileForm/ProfileForm'
import { FC, useState } from 'react'
import Preloader from '../common/Preloader/Preloader'
import { PropsType } from './ProfileContainer'

const Profile: FC<PropsType> = ({ saveProfile, isAuth, ...props }) => {
    const [editMode, setEditMode] = useState(false)

    if (!isAuth) return <Preloader/>

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    return (
        <>
            {editMode ?
                <ProfileForm
                    {...props}
                    toggleEditMode={toggleEditMode}
                    initialValues={props.profile}
                    onSubmit={saveProfile}/> :
                <ProfileInfo
                    {...props}
                    toggleEditMode={toggleEditMode}/>}
        </>
    )
}

export default Profile
