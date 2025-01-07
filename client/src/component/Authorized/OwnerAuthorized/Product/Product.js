import axios from "axios";
import React, { useEffect, useState } from "react";
import CommonHelmet from "../../../../common/components/Head/CommonHelmet";
import handleAxiosError from "../../../../common/utils/ErrorHandler";
import './Product.scss';
import Table from "../../../../common/components/Table/Table";
import Popup from "../../../../common/components/Popup/Popup";
import UploadProduct from "./UploadProduct";

const pageTitle = "Hexis - Product";

function Product() {
    const [showPopup, setShowPopup] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const getProducts = async () => {
            await axios.get('/api/product/get')
            .then(response =>setProducts(response.data.products))
            .catch(handleAxiosError)
        }
        getProducts();
    },[])

    const openPopup = () => {
        setShowPopup(true);
    }

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <CommonHelmet title={pageTitle} />
            <div className="container">
                <div className="d-flex justify-content-between align-items-center gap-4">
                    <h2>Product</h2>
                    <p className="m-0" style={{ cursor: "pointer", color: "#293241", fontWeight: "bold" }} onClick={openPopup}>Create Product</p>
                </div>
                <hr />
                <div className="table-container">
                    <Table keys={["productId", "name", "description", "price"]} rows={products} />
                </div>

                {showPopup && <Popup showPopup={showPopup} setShowPopup={setShowPopup}>
                    <UploadProduct close={closePopup} />
                </Popup>}
            </div>
        </>
    );
}

export default Product;
