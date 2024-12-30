import styles from "./Login.module.scss";
import {Navigate, useNavigate} from "react-router-dom";
import FormInput from "../../../common/components/FormInput/FormInput";
import {useEffect, useState} from "react";
import CommonHelmet from "../../../common/components/Head/CommonHelmet";
import axios from "axios";
import handleAxiosError from "../../../common/utils/ErrorHandler";
import {useAuth} from "../../../common/utils/AuthContext";
import { toast } from "react-hot-toast";

const userInputs = [
    {
        id: "usernameInput",
        name: "username",
        type: "text",
        placeholder: "Username or email",
    },
    {
        id: "passwordInput",
        name: "password",
        type: "password",
        placeholder: "Password"
    },
];

const pageTitle = "Hexis - Login Page";
const loginUrl = "/api/user/login";
const oAuthUrl = "http://localhost:8080/api/user/auth/google";

function Login() {

    const navigate = useNavigate();
    const {checkAuth} = useAuth();
    const [auth, setAuth] = useState(false);

    useEffect(()=>{
        const checkAuthentication = async () => {
            const isAuthenticated = await checkAuth();
            setAuth(isAuthenticated!=='unauthorized');
        }
        checkAuthentication();
    },[checkAuth, navigate])

    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
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

        axios.post(loginUrl, {
            ...formValues
        }).then((response) => {
            setAuth(response.data.success);
        }).catch(handleAxiosError);
    }

    const navigateTo = () => {
        navigate("/forgot-password");
    }

    const handleGoogleLogin = () => {
        window.location.href = oAuthUrl;
    };
    
    if (auth) {
        return <Navigate to="/home" />
    }

    return (
        <>
            <CommonHelmet title={pageTitle}/>

            <div className={`${styles.loginContainer}`}>
                <div className={`d-flex flex-column justify-content-center text-center w-50`}>
                    <h1>Hexis</h1>
                    <h6>Blockchain Based Fake Product Identification</h6>
                </div>
                <div className="d-flex flex-column justify-content-center w-50">

                    <div style={{marginTop: "45px"}}>
                        <div className={`mb-4`}>
                            <h4>Log In</h4>
                        </div>

                        <hr />

                        <div className={`d-flex flex-column`}>

                            {userInputs.map(e => (
                                <FormInput key={e.id} onChange={onChangeHandler} {...e}/>
                            ))}

                            <button type="submit" className={`${styles.btnLogin} mt-2`} onClick={onFormSubmit}>Sign In</button>
                        </div>
                        <button className={`${styles.google} mt-2`} onClick={handleGoogleLogin}>
                            <i className="fa-brands fa-google mx-2"></i>
                            Sign In with google
                        </button>
                    </div>
                    <button className="btn btn-link mt-2" onClick={navigateTo}>Forgot Password? Click Here</button>
                </div>
            </div>
        </>
    );
}

export default Login;