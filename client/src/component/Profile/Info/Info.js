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
    },
    {
        id: "newPasswordInput",
        name: "newPassword",
        type: "password",
        placeholder: "New password",
    },
    {
        id: "confirmPasswordInput",
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm password",
    },
];

function Info({email, name, setName}) {

    const [isEdit, setIsEdit] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const nameChangeHandler = (e) => {
        setName(e.target.value);
    }

    const onChangeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    };

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    }

    const togglePassword = () => {
        setIsPassword(!isPassword);
    }

    const saveEdit = () => {
        axios.put(updateUserUrl,{name})
        .then(response=>{
            toast.success("Profile Updated");
        })
        .catch(handleAxiosError)
        setIsEdit(false);
    }

    const savePassword = () => {
        axios.put(updatePasswordUrl, {...formValues})
        .then(response=>toast.success("Password Updated"))
        .catch(handleAxiosError)
       setIsPassword(false);
    }

    return (
        <>
            {!isEdit && !isPassword && <div className='info-container'>
                <h2>{name}</h2>
                <h4>{email}</h4>
                <div className='d-flex w-100 gap-2'>
                    <button className={`button edit-button`} onClick={toggleEdit} >Edit Profile</button>
                    <button className={`button edit-button`} onClick={togglePassword} >Change Password</button>
                </div>
            </div>}
            {isEdit && !isPassword && <div className='info-container'>
                    <input type="text" value={name} className="form-control" onChange={nameChangeHandler} />
                    <div className="d-flex">
                        <button className={`button save-button`} onClick={saveEdit} >Save</button>
                        <button className={`button cancel-button`} onClick={toggleEdit} >Cancel</button>
                    </div>
                </div>
            }
            {isPassword && !isEdit && <div className='password-container'>
                    {passwordInputs.map(e => (
                        <FormInput key={e.id} onChange={onChangeHandler} {...e}/>
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