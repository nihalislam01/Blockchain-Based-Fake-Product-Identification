import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Table from "../../../../common/components/Table/Table";
import FormInput from "../../../../common/components/FormInput/FormInput";
import CommonHelmet from "../../../../common/components/Head/CommonHelmet";
import Form from "../../../../common/components/Form/Form";
import Popup from "../../../../common/components/Popup/Popup";

import handleAxiosError from "../../../../common/utils/ErrorHandler";

const getPaymentsUrl = "/api/stripe/getAll";
const createPaymentUrl = "/api/stripe/create";
const updateStatusUrl = "/api/stripe/updateStatus/";
const updatePaymentUrl = "/api/stripe/update/";

const pageTitle = "Hexis - Payment Manager";

const paymentInputs = [
    {
        id: "nameInput",
        name: "name",
        type: "text",
        placeholder: "Plan Name (e.g. Basic, Premium)",
        label: "Name",
        category: "input",
    },
    {
        id: "sessionInput",
        name: "session",
        type: "text",
        placeholder: "Sessiob (e.g. Month, Year)",
        label: "Session",
        category: "input",
    },
    {
        id: "quoteInput",
        name: "quote",
        type: "text",
        placeholder: "Plan text",
        label: "Plan Text",
        category: "input",
    },
    {
        id: "priceInput",
        name: "price",
        type: "text",
        placeholder: "Enter the amount with currency (e.g. 19.99 USD)",
        label: "Price",
        category: "input",
    },
    {
        id: "descriptionInput",
        name: "description",
        type: "text",
        placeholder: "Describe Key Points separated by commas (e.g. \",\")",
        label: "Descriptions",
        category: "textarea",
    },
    {
        id: "priceIdInput",
        name: "priceId",
        type: "text",
        label: "Price ID",
        category: "input",
        placeholder: "Stripe Price ID",
    }
]

const activeInput =     {
    name: "active",
    placeholder: "Active",
    options: [{name:"Active", value:true}, {name:"Inactive", value:false}],
    category: "select"
  }

function PaymentManager() {

    const [showPopup, setShowPopup] = useState(false);
    const [payments, setPayments] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [paymentValues, setPaymentValues] = useState({
        name: "",
        session: "",
        quote: "",
        price: "",
        description: "",
        priceId: ""
    });

    useEffect(()=>{
        axios.get(getPaymentsUrl)
        .then((response)=>setPayments(response.data.payment))
        .catch(handleAxiosError);
    },[])
    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const onFormSubmit = e => {
        e.preventDefault();
        console.log(paymentValues);
        let hasError = !Object.values(paymentValues).every(value => value.trim().length !== 0);

        if (hasError) {
            toast.error("Please fill up all the fields");
            return;
        }
        if (isUpdate) {
            axios.patch(updatePaymentUrl + paymentValues._id, {
                ...paymentValues
            }).then((response) => {
                toast.success(response.data.message);
                closePopup();
            }).catch(handleAxiosError);
        } else {
            axios.post(createPaymentUrl, {
                ...paymentValues
            }).then((response) => {
                toast.success(response.data.message);
                closePopup();
            }).catch(handleAxiosError);
        }
    };

    const onChangeHandler = (e, id) => {
        axios.patch(updateStatusUrl+id, {active: e.target.value})
        .then((response)=>toast.success(response.data.message))
        .catch(handleAxiosError)
    };

    const showUpdatePopup = (id) => {
        setPaymentValues(payments.find(payment => payment._id === id));
        setShowPopup(true);
        setIsUpdate(true);
    }

    return (
        <>  
            <CommonHelmet title={pageTitle} />
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Payment Manager</h2>
                    <p className="m-0" style={{ cursor: "pointer", color: "#293241", fontWeight: "bold" }} onClick={openPopup}>Create Payment Plan</p>
                </div>
                <hr />
                <div className="table-container">
                    <Table keys={["name","session", "quote", "price", "priceId"]} rows={payments} onRowClick={showUpdatePopup}
                    renderActions={(row) => (<FormInput noMargin={true} onChange={(event) => onChangeHandler(event, row._id)} value={row.active} {...activeInput}/>)}/>
                </div>
            </div>
            {showPopup && (
                <Popup showPopup={showPopup} setShowPopup={setShowPopup}>
                    <Form headline="New Subscription Plan" formValues={paymentValues} setFormValues={setPaymentValues} onFormSubmit={onFormSubmit} formInputs={paymentInputs} />
                </Popup>
            )}
        </>
    )
}

export default PaymentManager;