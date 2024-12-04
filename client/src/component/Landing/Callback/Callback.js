import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import handleAxiosError from "../../../common/utils/ErrorHandler";

const callbackUrl = "/api/user/verify-email";
function Callback() {

    const navigate = useNavigate();

    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    useEffect(()=>{
        axios.get(callbackUrl + `?token=${token}`)
        .then(response=>{
            toast.success(response.data.message);
            navigate("/profile");
        })
        .catch(handleAxiosError)
    },[token])

    return (
        <>
        <div className="d-flex justify-content-center align-items-center w-100 min-vh-100">
            <h1>Verifying...</h1>
        </div>
        </>
    )
}

export default Callback;