import { useEffect, useState } from "react";
import handleAxiosError from "../../../common/utils/ErrorHandler";
import axios from "axios";
import FormatDate from "../../../common/utils/FormatDate";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const deleteHistoryUrl = "/api/product/delete-verification/";

function History () {
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(()=>{
        axios.get("/api/product/history")
       .then(response=>{
            const updatedHistory = response.data.history.map(item => ({
                ...item,
                status: item.status ? "Verified" : "Not Verified",
                color: item.status ? "#28A745":"#DC3545",
                companyName: item.businessId.organizationName,
                date: FormatDate(item.createdAt),
            }));
            
            setHistory(updatedHistory);
            setFilteredHistory(updatedHistory);
       })
       .catch(handleAxiosError)
    },[])

    const onSearch = e => {
        setSearch(e.target.value);
        setFilteredHistory(history.filter(item =>{
            return item.productId.toLowerCase().includes(e.target.value.toLowerCase()) || item.companyName.toLowerCase().includes(e.target.value.toLowerCase()) || item.date.toLowerCase().includes(e.target.value.toLowerCase()) || item.status.toLowerCase().includes(e.target.value.toLowerCase());
        }))
    }
    const deleteVerification = (id) => {
        axios.delete(deleteHistoryUrl+id)
        .then(response=>toast.success(response.data.message))
        .catch(handleAxiosError)
    }
    return (
        <>
            <h3 className="mb-4">Verification History</h3>
            <div className="d-flex align-items-center gap-2 w-100">
                <input tyle="text" className="form-control" onChange={onSearch} name="search" value={search} style={{fontFamily: 'Arial, FontAwesome'}} placeholder="&#xf002; Search in history" />
                <Link to="/home"><button className="verify-button">Verify new product</button></Link>
            </div>
            {filteredHistory.length <= 0 && <h6 className="text-center">No verification history available</h6>}
            {filteredHistory.map(item => (
                <>
                <hr />
                <div style={{padding: "10px 20px"}}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                            <h4 className="m-0">{item.companyName}</h4>
                            <div className="border" style={{fontSize: "10px",padding: "2px 8px", borderRadius: "25px", color: `${item.color}`}}>{item.status}</div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <p className="m-0">{item.date}</p>
                            <i className="fa-solid fa-ban" style={{cursor: "pointer"}} onClick={() => deleteVerification(item._id)}></i>
                        </div>
                    </div>
                    <p style={{fontSize: "12px"}}>Product ID: {item.productId}</p>
                </div>
                </>
            ))}
        </>
    )
}

export default History;