import { useEffect, useRef, useState } from "react";
import './Product.scss';
import FormInput from "../../common/components/FormInput/FormInput";
import { toast } from "react-hot-toast";
import axios from "axios";
import handleAxiosError from "../../common/utils/ErrorHandler";

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
]
function SingleProductForm({showPopup, closePopup}){

    const [productValues, setProductValues] = useState({
        productId: "",
        name: "",
        description: "",
        price: ""
    });

    const popupRef = useRef(null);

    useEffect(() => {
        
        const handleOutsideClick = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                closePopup();
            }
        };

        if (showPopup) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [closePopup, showPopup]);

    const onChangeHandler = e => {
        setProductValues({...productValues, [e.target.name]: e.target.value});
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
        <div className="popup-overlay">
            <div className="popup-content" ref={popupRef} >
                <button className="close-btn" onClick={closePopup}>&times;</button>
                <h3>Create Product</h3>
                <div className="form-box">
                    {productInputs.map((e)=>(
                        <FormInput key={e.id} onChange={onChangeHandler} value={productInputs[e.name]} noMargin={true} {...e} />
                    ))}
                    <button type="submit" className="btn btn-primary" onClick={onFormSubmit}>Submit</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default SingleProductForm;