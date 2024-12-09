import axios from "axios";
import { useEffect } from "react";
import Message from "../../common/components/Message/Message";
import handleAxiosError from "../../common/utils/ErrorHandler";

const updateStatusUrl = "/api/business/updateStatus";
function UpdateStatusCallback() {
    useEffect(()=>{
        axios.get(updateStatusUrl).catch(handleAxiosError)
    },[])
    return (
        <>
        <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{minHeight: "90vh"}}>
            <Message headline={"Payment Success"} message={"You have become a owner. Start registering your products now."} />
        </div>
        </>
    )
}

export default UpdateStatusCallback;