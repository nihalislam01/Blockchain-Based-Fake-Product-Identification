import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import FormInput from "../../common/components/FormInput/FormInput";
import CommonHelmet from "../../common/components/Head/CommonHelmet";
import handleAxiosError from "../../common/utils/ErrorHandler";
import "./Home.scss";

const pageTitle = "Hexis - Home";
const verifyProductUrl = '/api/product/verify/';
function Home() {
    const [productId, setProductId] = useState("");

    const onChangeHandler = (e) => {
        setProductId(e.target.value);
    }

    const onVerifyProduct = () => {
            axios.get(verifyProductUrl+productId)
            .then(response=>toast.success(response.data.message))
            .catch(handleAxiosError)
        }

    return (
        <>
            <CommonHelmet title={pageTitle} />
            <div className="container">
                <h2>Home</h2>
                <hr />
                <div className="d-flex justify-content-center w-100">
                    <div className="verify-products-container">
                        <h3>Product Verification</h3>
                        <hr />
                        <FormInput type="text" onChange={onChangeHandler} name="productId" value={productId} placeholder="Insert Product ID" category="input"  />
                        <button className="btn btn-primary mt-2" onClick={onVerifyProduct}>Verify Product</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;