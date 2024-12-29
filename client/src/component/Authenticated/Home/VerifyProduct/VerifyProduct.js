import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Dropdown from "../../../../common/components/Dropdown/Dropdown";
import handleAxiosError from "../../../../common/utils/ErrorHandler";

const verifyProductUrl = '/api/product/verify/';

const VerifyProduct = () => {
    const [productId, setProductId] = useState("");
    const [businesses, setBusinesses] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState({
        id: "",
        name: "Select Company"
    });

    useEffect(()=>{
        axios.get('/api/business/all')
       .then(response=>{setBusinesses(response.data.businesses)})
       .catch(handleAxiosError)
    },[])

    const onChangeHandler = (e) => {
        setProductId(e.target.value);
    }

    const onVerifyProduct = () => {
        if (selectedBusiness.id.trim().length===0) {
            toast.error("Please select a company");
            return;
        }
        axios.get(verifyProductUrl+productId+`/${selectedBusiness.id}`)
        .then(response=>toast.success(response.data.message))
        .catch(handleAxiosError)
    }
    return (
        <>
            <div className="border text-center" style={{padding: "20px", borderRadius: "10px", backgroundColor: "white", width: "70%"}}>
                <h3>Product Verification</h3>
                <hr />
                <Dropdown elements={businesses} selected={selectedBusiness} setSelect={setSelectedBusiness} />
                <input type="text" onChange={onChangeHandler} name="productId" value={productId} placeholder="Insert Product ID" className="form-control mt-3"  />
                <button className="btn btn-primary w-100 mt-2" onClick={onVerifyProduct}>Verify Product</button>
            </div>
        </>
    )
}

export default VerifyProduct;