import { faBirthdayCake, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import FormInput from '../../../common/components/FormInput/FormInput';
import handleAxiosError from '../../../common/utils/ErrorHandler';
import './Info.scss';

const updateUserUrl = "/api/user/updateProfile";
const updatePasswordUrl = "/api/user/password/update";

const passwordInputs = [
    {
        id: "oldPasswordInput",
        name: "oldPassword",
        type: "password",
        placeholder: "Old password",
        category: "input"
    },
    {
        id: "newPasswordInput",
        name: "newPassword",
        type: "password",
        placeholder: "New password",
        category: "input"
    },
    {
        id: "confirmPasswordInput",
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm password",
        category: "input"
    },
];

const userInputs = [
    {
        id: "nameInput",
        name: "name",
        type: "text",
        placeholder: "Name",
        category: "input"
    },
    {
        id: "usernameInput",
        name: "username",
        type: "text",
        placeholder: "Username",
        category: "input"
    },
    {
        id: "bioInput",
        name: "bio",
        type: "text",
        placeholder: "Bio (Optional)",
        category: "textarea"
    },
    {
        id: "genderInput",
        name: "gender",
        options: [{name:"Male", value:"Male"}, {name:"Female", value:"Female"}, {name:"Other", value:"Other"}],
        placeholder: "Select Gender",
        category: "select"
    },
    {
        id: "dateOfBirthInput",
        name: "dateOfBirth",
        type: "date",
        category: "input"
    },
];

function Info({user, dob, editableUser, setEditableUser, setUser}) {

    const [isEdit, setIsEdit] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const onUserChangeHandler = (e) => {
        setEditableUser({...editableUser, [e.target.name]: e.target.value});
    }

    const onPasswordChangeHandler = e => {
        setPasswordForm({...passwordForm, [e.target.name]: e.target.value});
    };

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    }

    const togglePassword = () => {
        setIsPassword(!isPassword);
    }

    const saveEdit = () => {
        axios.put(updateUserUrl, {...editableUser})
        .then(response=>{
            toast.success(response.data.message);
            setUser(response.data.user);
        })
        .catch(handleAxiosError)
        setIsEdit(false);
    }

    const savePassword = () => {
        axios.put(updatePasswordUrl, {...passwordForm})
        .then(response=>toast.success(response.data.message))
        .catch(handleAxiosError)
       setIsPassword(false);
    }

    return (
        <>
            {!isEdit && !isPassword && <div className='info-container'>
                <h2 className='m-0'>{user.name}</h2>
                <h4>{user.username}</h4>
                {user.bio!=="" && <p>{user.bio}</p>}
                {user.gender!=="" && <p className='m-0'><FontAwesomeIcon icon={faUser} /> {user.gender}</p>}
                {dob!==null && <p className='m-0'><FontAwesomeIcon icon={faBirthdayCake} /> {dob}</p>}
                <p className='m-0'><FontAwesomeIcon icon={faEnvelope} /> {user.email}</p>
                <div className='d-flex w-100 gap-2'>
                    <button className={`button edit-button`} onClick={toggleEdit} >Edit Profile</button>
                    <button className={`button edit-button`} onClick={togglePassword} >Change Password</button>
                </div>
            </div>}
            {isEdit && !isPassword && <div className='info-container'>
                    {userInputs.map(e => (
                        <FormInput key={e.id} onChange={onUserChangeHandler} value={editableUser[e.name]} {...e}/>
                    ))}
                    <div className="d-flex">
                        <button className={`button save-button`} onClick={saveEdit} >Save</button>
                        <button className={`button cancel-button`} onClick={toggleEdit} >Cancel</button>
                    </div>
                </div>
            }
            {isPassword && !isEdit && <div className='password-container'>
                    {passwordInputs.map(e => (
                        <FormInput key={e.id} onChange={onPasswordChangeHandler} {...e}/>
                    ))}
                    <div className="d-flex">
                        <button className={`button save-button`} onClick={savePassword} >Save</button>
                        <button className={`button cancel-button`} onClick={togglePassword} >Cancel</button>
                    </div>
            </div>}
        </>
    )
}

export default Info;