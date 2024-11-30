import styles from "./Email.module.scss";
import {Link, Navigate, useNavigate} from "react-router-dom";
import FormInput from "../../../common/components/FormInput/FormInput";
import {useEffect, useState} from "react";
import CommonHelmet from "../../../common/components/Head/CommonHelmet";
import {serverLocation} from "../../../const/Constants";

const authUrl = `${serverLocation}/authenticate`;
const checkUrl = `${serverLocation}/check`;

const userInputs = [
    {
        id: "usernameInput",
        name: "username",
        type: "text",
        placeholder: "Please enter your email",
    }
];

const pageTitle = "BFPI - Verify Email";

function Email() {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        username: ""
    });

    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // if (token) {
        //     axios.get(checkUrl, {
        //         headers: {
        //             'content-type': 'application/json',
        //             'Authorization': 'Bearer ' + token,
        //         }
        //     })
        //         .then((response) => {
        //             if (response.data.status) {
        //                 setAuthenticated(true);
        //             }
        //         }).catch((error) => {
        //             localStorage.removeItem("token");
        //         });
        // }
    }, []);

    const onChangeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    };

    const onFormSubmit = e => {
        e.preventDefault();
        let hasError = !Object.values(formValues).every(value => value.trim().length !== 0);

        if (hasError) {
            return;
        }

        // axios.post(authUrl, {
        //     ...formValues
        // }).then((response) => {
        //     localStorage.setItem("token", response.data.messages.token.token);
        //     setAuthenticated(true);
        // }).catch((error) => {
        //     console.log(error.response.data.messages.errors);
        //     setError(true);
        //     setErrorMsg(error.response.data.messages.errors);
        // });
    }

    if (isAuthenticated) {
        return <Navigate to={"/"}/>;
    }

    const navigateTo = () => {
        navigate("/");
    }

    return (
        <>
            <CommonHelmet title={pageTitle}/>

            <div className={`d-flex justify-content-center align-items-center min-vh-100`}>
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
            </div>
        </>
    );
}

export default Email;