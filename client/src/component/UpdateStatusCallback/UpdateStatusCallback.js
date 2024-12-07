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
        <Message headline={"Payment Success"} message={"You have become a owner. Start registering your products now."} />
        </>
    )
}

export default UpdateStatusCallback;