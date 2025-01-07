import { useState } from "react";
import Form from "../../../../common/components/Form/Form";
import toast from "react-hot-toast";
import axios from "axios";
import handleAxiosError from "../../../../common/utils/ErrorHandler";

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

const uploadProductUrl = '/api/product/upload-single';

const UploadSingle = ({onDragAndDropClick, buttonName, closeAction}) => {

    const [productValues, setProductValues] = useState({
        productId: "",
        name: "",
        description: "",
        price: ""
    });

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
            closeAction();
        }).catch(handleAxiosError);
    }

    return <Form headline="Product Upload" button={{click: onDragAndDropClick, name: buttonName}} formValues={productValues} setFormValues={setProductValues} onFormSubmit={onFormSubmit} formInputs={productInputs} />
}

export default UploadSingle;