import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import CommonHelmet from "../../common/components/Head/CommonHelmet";
import handleAxiosError from "../../common/utils/ErrorHandler";
import './Product.scss';
import PopupForm from '../../common/components/PopupForm/PopupForm';
import Table from "../../common/components/Table/Table";
import toast from "react-hot-toast";

const pageTitle = "Hexis - Product";
const uploadProductUrl = '/api/product/upload-single';

const productInputs = [
    {
        id: "productIdInput",
        name: "productId",
        type: "text",
        placeholder: "Enter Product ID",
        label: "Product ID",
        category: "input",
    },
    {
        id: "nameInput",
        name: "name",
        type: "text",
        placeholder: "Enter Product Name",
        label: "Product Name",
        category: "input",
    },
    {
        id: "descriptionInput",
        name: "description",
        type: "text",
        placeholder: "Enter Product Description",
        label: "Product Description",
        category: "textarea",
    },
    {
        id: "priceInput",
        name: "price",
        type: "text",
        placeholder: "Enter Product Price",
        label: "Product Price",
        category: "input",
    }
];
function Product() {
    const [showSingleUploadPopup, setShowSingleUploadPopup] = useState(false);
    const [showBulkUploadPopup, setShowBulkUploadPopup] = useState(false);
    const [products, setProducts] = useState([]);
    const [productValues, setProductValues] = useState({
        productId: "",
        name: "",
        description: "",
        price: ""
    });

    useEffect(()=>{
        axios.get('/api/product/get')
        .then(response =>setProducts(response.data.products))
        .catch(handleAxiosError)
    },[])

    const onDrop = useCallback((acceptedFiles) => {

        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                const fileContent = reader.result;

                console.log(fileContent);
            };
            reader.readAsText(file);
        });
    }, []);

    const openCreateSingleProduct = () => {
        setShowSingleUploadPopup(true);
    };

    const closePopup = () => {
        setShowSingleUploadPopup(false);
        setShowBulkUploadPopup(false);
    };

    const onFormSubmit = e => {
        e.preventDefault();
        let hasError = !Object.values(productValues).every(value => value.trim().length !== 0);

        if (hasError) {
            toast.error("Please fill up all the fields");
            return;
        }

        axios.post(uploadProductUrl, {
            ...productValues
        }).then((response) => {
            toast.success("Product uploaded successfully");
            closePopup();
        }).catch(handleAxiosError);
    }

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
                    <Table keys={["productId", "name", "description", "price"]} rows={products} />
                </div>

                {showSingleUploadPopup && !showBulkUploadPopup &&
                    <PopupForm headline="Product Upload" formValues={productValues} setFormValues={setProductValues} onFormSubmit={onFormSubmit} formInputs={productInputs} showPopup={showSingleUploadPopup} closePopup={closePopup} />
                }
                {showBulkUploadPopup && !showSingleUploadPopup &&
                    <PopupForm onDrop={onDrop} dragandDrop={true} showPopup={showBulkUploadPopup} closePopup={closePopup} />
                }
            </div>
        </>
    );
}

export default Product;
