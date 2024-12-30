import styles from "./Signup.module.scss";
import FormInput from "../../../common/components/FormInput/FormInput";
import {useState} from "react";
import CommonHelmet from "../../../common/components/Head/CommonHelmet";
import { toast } from "react-hot-toast";
import axios from "axios";
import handleAxiosError from "../../../common/utils/ErrorHandler";
import { serverLocation } from "../../../const/Constants";
import Message from "../../../common/components/Message/Message";

const registerUrl = "/api/user/register";
const oAuthUrl = `${serverLocation}/api/user/auth/google`;

const userInputs = [
    {
        id: "nameInput",
        name: "name",
        type: "text",
        placeholder: "Name",
    },
    {
        id: "emailInput",
        name: "email",
        type: "email",
        placeholder: "Email",
    },
    {
        id: "passwordInput",
        name: "password",
        type: "password",
        placeholder: "Password"
    },
    {
        id: "confirmInput",
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm Password"
    },
];

const pageTitle = "Hexis - Signup Page";

function Signup() {

    const [emailSent, setEmailSent] = useState(false);

    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
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
            toast.error("Please fill up all the fields");
            return;
        }

        let isPassword = formValues.password.trim() === formValues.confirmPassword.trim();

        if (!isPassword) {
            toast.error("Passwords do not match");
            return;
        }

        toast.promise(
            axios.post(registerUrl,{
                ...formValues
            }),
            {
                loading: "Processing...",
                success: () => {
                    setEmailSent(true);
                    return "Registration successful.";
                },
                error: (err) => {
                    handleAxiosError(err);
                },
            }
        );

    }

    if (emailSent) {
        return (<Message headline={"Email Sent"} message={"Thank you for signing in. Please check your email to complete verification."} />
        );
    }

    const handleGoogleLogin = () => {
        window.location.href = oAuthUrl;
    };

    return (
        <>
            <CommonHelmet title={pageTitle}/>
            <div className={`${styles.loginContainer}`}>
                <div className="d-flex flex-column justify-content-center w-50">

                    <div style={{marginTop: "45px"}}>
                        <div className={`mb-4`}>
                            <h4>Sign Up</h4>
                        </div>

                        <hr />

                        <div className={`d-flex flex-column`}>

                            {userInputs.map(e => (
                                <FormInput key={e.id} onChange={onChangeHandler} {...e}/>
                            ))}

                            <button type="submit" className={`${styles.btnLogin} mt-2`} onClick={onFormSubmit}>Sign Up</button>
                        </div>
                        <button className={`${styles.google} mt-2`} onClick={handleGoogleLogin}>
                            <i className="fa-brands fa-google mx-2"></i>
                            Sign Up with google
                        </button>
                    </div>
                </div>
                <div className={`d-flex flex-column justify-content-center text-center w-50`}>
                    <h1>Hexis</h1>
                    <h6>Blockchain Based Fake Product Identification</h6>
                </div>
            </div>
        </>
    );
}

export default Signup;