import axios from "axios";
import React, { useEffect, useState } from "react";
import CommonHelmet from "../../common/components/Head/CommonHelmet";
import handleAxiosError from "../../common/utils/ErrorHandler";
import './Product.scss';
import SingleProductForm from "./SingleProductForm";

const pageTitle = "Hexis - Product";

function Product() {
    const [showPopup, setShowPopup] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        axios.get('/api/product/get')
        .then(response =>setProducts(response.data.products))
        .catch(handleAxiosError)
    },[])

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
                <div className="product-container">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.productId}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>Edit</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showPopup && (
                    <SingleProductForm showPopup={showPopup} closePopup={closePopup} />
                )}
            </div>
        </>
    );
}

export default Product;
