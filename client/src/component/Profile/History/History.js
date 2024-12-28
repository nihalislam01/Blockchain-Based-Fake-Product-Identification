import { useEffect, useState } from "react";
import handleAxiosError from "../../../common/utils/ErrorHandler";
import axios from "axios";
import FormatDate from "../../../common/utils/FormatDate";

function History () {
    const [history, setHistory] = useState([]);

    useEffect(()=>{
        axios.get("/api/product/history")
       .then(response=>{
            const updatedHistory = response.data.history.map(item => ({
                ...item,
                status: item.status ? "Product Registered" : "Product Not Registered",
                companyName: item.businessId.organizationName,
                date: FormatDate(item.createdAt),
            }));
            
            setHistory(updatedHistory);
       })
       .catch(handleAxiosError)
    },[])
    return (
        <div className="shadow" style={{backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "65%", height: "80vh",overflow: "auto"}}>
            {history.length <= 0 && <h6 className="text-center">No verification history available</h6>}
            {history.map((item,index) => (
                <div style={{backgroundColor: index%2===0? "#e5e5e5" : "white", borderRadius: "10px", padding: "10px 20px", marginBottom: "5px"}}>
                    <div className="d-flex justify-content-between">
                        <p className="m-0">{item.companyName}</p>
                        <p className="m-0">{item.productId}</p>
                        <p className="m-0">{item.date}</p>
                        <p className="m-0">{item.status}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default History;