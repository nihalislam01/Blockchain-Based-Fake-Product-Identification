import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Dropdown from "../../../../common/components/Dropdown/Dropdown";
import handleAxiosError from "../../../../common/utils/ErrorHandler";
import { Html5Qrcode } from 'html5-qrcode';
import { useAlert } from "../../../../common/utils/AletContext";

const verifyProductUrl = '/api/product/verify/';

const VerifyProduct = () => {

    const setAlert = useAlert();

    const qrCodeRegionId = 'qr-code-region';
    const html5QrCodeRef = useRef(null);
    const [scanning, setScanning] = useState(false);
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
        .then(response=>{
            if (response.data.success) {
                setAlert({show: true, message: `${response.data.message}`, type: "success", head: "Valid"})
            } else {
                setAlert({show: true, message: `${response.data.message}`, type: "danger", head: "Invalid"})
            }
        })
        .catch(handleAxiosError)
    }

    const startScanning = async () => {
        if (scanning) return;
    
        const html5QrCode = new Html5Qrcode(qrCodeRegionId);
        html5QrCodeRef.current = html5QrCode;
        setScanning(true);
    
        try {
          await html5QrCode.start(
            { facingMode: 'environment' },
            {
                fps: 10,
                qrbox: { width: 400, height: 400 },
            },
            (decodedText) => {
                setProductId(decodedText);
                toast.success(`Product id ${decodedText} collected`);
                stopScanning();
            },
          );
        } catch (err) {
          handleAxiosError(err);
        }
      };

      const stopScanning = async () => {
        if (html5QrCodeRef.current) {
          await html5QrCodeRef.current.stop();
          html5QrCodeRef.current.clear();
        }
        setScanning(false);
      };
    return (
        <>
            <div className="border text-center" style={{padding: "20px", borderRadius: "10px", backgroundColor: "white", width: "70%"}}>
                <h3>Product Verification</h3>
                <hr />
                <div id={qrCodeRegionId} style={{ width: '100%', height: 'auto', position: "fixed", display: scanning ? "" : "none" }} />
                {!scanning && <><Dropdown elements={businesses} selected={selectedBusiness} setSelect={setSelectedBusiness} />
                <input type="text" onChange={onChangeHandler} name="productId" value={productId} placeholder="Insert Product ID" className="form-control mt-3"  />
                <button className="btn btn-primary w-100 mt-2" onClick={onVerifyProduct}>Verify Product</button>
                <button className="btn btn-secondary w-100 mt-2" onClick={startScanning}>
                    <i class="fa-solid fa-qrcode mx-2"></i>
                    Scan QR Code
                </button></>}
                {scanning && 
                    <button className="btn btn-secondary w-100 mt-2" onClick={stopScanning}>
                        Stop scanning
                    </button>
                }
            </div>
        </>
    )
}

export default VerifyProduct;