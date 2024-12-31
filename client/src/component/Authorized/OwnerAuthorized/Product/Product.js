import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import CommonHelmet from "../../../../common/components/Head/CommonHelmet";
import handleAxiosError from "../../../../common/utils/ErrorHandler";
import './Product.scss';
import Table from "../../../../common/components/Table/Table";
import toast from "react-hot-toast";
import DragAndDrop from "../../../../common/components/DragAndDrop/DragAndDrop";
import Form from "../../../../common/components/Form/Form";
import Popup from "../../../../common/components/Popup/Popup";
import Papa from 'papaparse';

const pageTitle = "Hexis - Product";
const uploadProductUrl = '/api/product/upload-single';
const uploadBulkProductUrl = '/api/product/upload-bulk';

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
    const [files, setFiles] = useState([]);
    const [productValues, setProductValues] = useState({
        productId: "",
        name: "",
        description: "",
        price: ""
    });

    useEffect(()=>{
        const getProducts = async () => {
            await axios.get('/api/product/get')
            .then(response =>setProducts(response.data.products))
            .catch(handleAxiosError)
        }
        getProducts();
    },[])

    const onDrop = useCallback((acceptedFiles) => {

        acceptedFiles.forEach((file) => {

            if (file.type !== "text/csv") {
                toast.error(`Invalid file type: ${file.type}. Please upload only CSV files.`);
                return;
            }
            setFiles((prevFiles) => [
                ...prevFiles,
                { file, progress: 0, isUploading: true },
            ]);
            const simulateUpload = (file) => {
                const interval = setInterval(() => {
                    setFiles((prevFiles) =>
                        prevFiles.map((f) => {
                            if (f.file === file) {
                                if (f.progress >= 100) {
                                    clearInterval(interval);
                                    return { ...f, progress: 100, isUploading: false };
                                }
                                return { ...f, progress: f.progress + 10 };
                            }
                            return f;
                        })
                    );
                }, 300);
            };

            simulateUpload(file);
        });

    }, []);

    const onUpload = async () => {
        if (files.length === 0) {
            toast.error("No files to upload.");
            return;
        }
    
        const validHeaders = ["productid", "name", "price", "description"];
    
        for (const fileObj of files) {
            const file = fileObj.file;
    
            const csvContent = await new Promise((resolve, reject) => {
                Papa.parse(file, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => resolve(results),
                    error: (error) => reject(error),
                });
            });
    
            const { data, errors } = csvContent;
    
            if (errors.length > 0) {
                toast.error(`Error parsing ${file.name}: ${errors[0].message}`);
                continue;
            }
    
            const headers = Object.keys(data[0]).map((header) => header.toLowerCase());
            const missingHeaders = validHeaders.filter((h) => !headers.includes(h));
            if (missingHeaders.length > 0) {
                toast.error(`File ${file.name} is missing required headers: ${missingHeaders.join(", ")}`);
                continue;
            }
            const formattedData = data.map((row) => {
                const normalizedRow = {};
                Object.keys(row).forEach((key) => {
                    normalizedRow[key.toLowerCase()] = row[key];
                });
                return {
                    productId: normalizedRow.productid,
                    name: normalizedRow.name,
                    price: normalizedRow.price,
                    description: normalizedRow.description,
                };
            });
            await axios.post(uploadBulkProductUrl, {products: formattedData})
            .then(response=>toast.success(response.data.message))
            .catch(handleAxiosError);
        }
    };

    const removeFile = (file) => {
        setFiles((prevFiles) => prevFiles.filter((f) => f.file !== file));
    };

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

    const onDragAndDropClick = () => {
        setShowSingleUploadPopup(false);
        setShowBulkUploadPopup(true);
    }

    return (
        <>
            <CommonHelmet title={pageTitle} />
            <div className="container">
                <div className="d-flex justify-content-between align-items-center gap-4">
                    <h2>Product</h2>
                    <p className="m-0" style={{ cursor: "pointer", color: "#293241", fontWeight: "bold" }} onClick={openCreateSingleProduct}>Create Product</p>
                </div>
                <hr />
                <div className="table-container">
                    <Table keys={["productId", "name", "description", "price"]} rows={products} />
                </div>

                {showSingleUploadPopup && !showBulkUploadPopup &&
                    <Popup showPopup={showSingleUploadPopup} setShowPopup={setShowSingleUploadPopup}>
                        <Form headline="Product Upload" button={{click: onDragAndDropClick, name: "Upload CSV"}} formValues={productValues} setFormValues={setProductValues} onFormSubmit={onFormSubmit} formInputs={productInputs} />
                    </Popup>
                }
                {showBulkUploadPopup && !showSingleUploadPopup &&
                    <Popup showPopup={showBulkUploadPopup} setShowPopup={setShowBulkUploadPopup}>
                        <DragAndDrop onDrop={onDrop} removeFile={removeFile} files={files} onUpload={onUpload} />
                    </Popup>
                }
            </div>
        </>
    );
}

export default Product;
