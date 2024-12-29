import { useEffect, useState } from "react";
import Message from "../../../common/components/Message/Message";
import axios from "axios";
import handleAxiosError from "../../../common/utils/ErrorHandler";
function Status() {
    const [data, setData] = useState({});
    useEffect(()=>{
        axios.get("/api/business/status")
        .then(response=>setData({headline: response.data.headline, message: response.data.message}))
        .catch(handleAxiosError)
    },[])
    return (
        <>
        <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{minHeight: "90vh"}}>
            <Message headline={data.headline} message={data.message} />
        </div>
        </>
    )
}

export default Status;