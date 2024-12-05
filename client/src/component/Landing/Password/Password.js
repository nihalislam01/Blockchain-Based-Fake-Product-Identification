import {useNavigate} from "react-router-dom";
import FormInput from "../../../common/components/FormInput/FormInput";
import {useState} from "react";
import CommonHelmet from "../../../common/components/Head/CommonHelmet";
import axios from "axios";
import handleAxiosError from "../../../common/utils/ErrorHandler";
import {toast} from "react-hot-toast";

const resetPasswordUrl = `api/user/password/reset`;

const userInputs = [
    {
        id: "passwordInput",
        name: "password",
        type: "password",
        placeholder: "Enter new password",
    },
    {
        id: "confirmPasswordInput",
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm Password",
    }
];

const pageTitle = "Hexis - Reset Password";

function Password() {

    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    const [formValues, setFormValues] = useState({
        password: "",
        confirmPassword: ""
    });

    const onChangeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    };

    const onFormSubmit = e => {
        e.preventDefault();
        let hasError = !Object.values(formValues).every(value => value.trim().length !== 0);

        if (hasError) {
            toast.error("Please fill out all the fields");
            return;
        }

        axios.put(resetPasswordUrl + "/?token=" +token, {...formValues})
        .then((response) => {
            toast.success("Password reset successful. You can now log in");
            navigate("/");
        }).catch(handleAxiosError);
               
        
    }

    const navigateTo = () => {
        navigate("/");
    }

    return (
        <>
            <CommonHelmet title={pageTitle}/>

            <div className={`d-flex justify-content-center align-items-center min-vh-100`}>
                <div className={`d-flex flex-column justify-content-center form-card`}>

                    <div style={{marginTop: "45px"}}>
                        <div className={`mb-4`}>
                            <h4>Reset Password</h4>
                        </div>

                        <hr />

                        <div className={`d-flex flex-column`}>

                            {userInputs.map(e => (
                                <FormInput key={e.id} onChange={onChangeHandler} {...e}/>
                            ))}

                            <button type="submit" className={`btn btn-primary mt-2`} onClick={onFormSubmit}>Reset Password</button>
                        </div>
                    </div>
                    <button className="btn btn-link mt-2" onClick={navigateTo}>Already Verified? Sign In</button>
                </div>
            </div>
        </>
    );
}

export default Password;