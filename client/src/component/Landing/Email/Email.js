import styles from "./Email.module.scss";
import {useNavigate} from "react-router-dom";
import FormInput from "../../../common/components/FormInput/FormInput";
import {useState} from "react";
import CommonHelmet from "../../../common/components/Head/CommonHelmet";
import axios from "axios";
import handleAxiosError from "../../../common/utils/ErrorHandler";
import {toast} from "react-hot-toast";
import Message from "../../../common/components/Message/Message";

const forgotPasswordUrl = `api/user/password/forgot`;

const userInputs = [
    {
        id: "emailInput",
        name: "email",
        type: "email",
        placeholder: "Please enter your email",
    }
];

const pageTitle = "Hexis - Forgot Password";

function Email() {

    const navigate = useNavigate();

    const [emailSent, setEmailSent] = useState(false);
    const [formValues, setFormValues] = useState({
        email: ""
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

        toast.promise(
            axios.post(forgotPasswordUrl, { ...formValues }),
            {
                loading: "Processing...",
                success: () => {
                    setEmailSent(true);
                    return "Email sent successfully. Check your inbox!";
                },
                error: (err) => {
                    handleAxiosError(err);
                },
            }
        );
               
        
    }

    if (emailSent) {
        return (<Message headline={"Email Sent"} message={"Please check your email to complete verification."} />);
    }

    const navigateTo = () => {
        navigate("/");
    }

    return (
        <>
            <CommonHelmet title={pageTitle}/>
            <div className={`d-flex flex-column justify-content-center ${styles.emailContainer}`}>

                <div style={{marginTop: "45px"}}>
                    <div className={`mb-4`}>
                        <h4>Verify Email</h4>
                    </div>

                    <hr />

                    <div className={`d-flex flex-column`}>

                        {userInputs.map(e => (
                            <FormInput key={e.id} onChange={onChangeHandler} {...e}/>
                        ))}

                        <button type="submit" className={`${styles.btnEmail} mt-2`} onClick={onFormSubmit}>Send Email</button>
                    </div>
                </div>
                <button className="btn btn-link mt-2" onClick={navigateTo}>Already Verified? Sign In</button>
            </div>
        </>
    );
}

export default Email;