import React, { useState } from "react";
import CommonHelmet from "../../common/components/Head/CommonHelmet";
import './Product.scss';
import SingleProductForm from "./SingleProductForm";

const pageTitle = "Hexis - Product";

function Product() {
    const [showPopup, setShowPopup] = useState(false);

    const openCreateSingleProduct = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <CommonHelmet title={pageTitle} />
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Product</h2>
                    <p className="m-0" style={{ cursor: "pointer", color: "#293241", fontWeight: "bold" }} onClick={openCreateSingleProduct}>
                        Create Product
                    </p>
                </div>
                <hr />

                {showPopup && (
                    <SingleProductForm showPopup={showPopup} closePopup={closePopup} />
                )}
            </div>
        </>
    );
}

export default Product;
