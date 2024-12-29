import axios from "axios";
import "./BusinessForm.scss";
import CommonHelmet from "../../../../common/components/Head/CommonHelmet";
import FormInput from "../../../../common/components/FormInput/FormInput";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { toast } from "react-hot-toast";
import handleAxiosError from "../../../../common/utils/ErrorHandler";

const formInputs = [
    {
      id: "nameInput",
      name: "organizationName",
      type: "text",
      label: "Organization's Name",
      category: "input"
    },
    {
      id: "emailInput",
      name: "contactEmail",
      type: "email",
      label: "Organization's Email",
      category: "input"
    },
    {
      id: "countryInput",
      name: "country",
      label: "Country",
      placeholder: "Select a country",
      options: [{name:"Bangladesh", value:"Bangladesh"}, 
        {name:"United States", value:"United States"}, 
        {name:"Canada", value:"Canada"}, 
        {name:"United Kingdom", value:"United Kingdom"}, 
        {name:"Australia", value:"Australia"}],
      category: "select"
    },
    {
      id: "streetInput",
      name: "street",
      type: "text",
      label: "Street",
      category: "input"
    },
    {
      id: "cityInput",
      name: "city",
      label: "City",
      placeholder: "Select a city",
      options: [{name:"Badda", value:"Badda"}, 
        {name: "Gulshan",value: "Gulshan"}, 
        {name: "Banani", value: "Banani"}, 
        {name: "Bashundhara",value: "Bashundhara"}, 
        {name:"Rampura", value: "Rampura"}],
      category: "select"
    },
    {
      id: "zipInput",
      name: "zipCode",
      type: "text",
      label: "Zip Code",
      category: "input"
    },
    {
      id: "stateInput",
      name: "state",
      label: "State",
      placeholder: "Select a sate",
      options: [{name: "Dhaka", value: "Dhaka"}, 
        {name: "Rangpur", value: "Rangpur"}, 
        {name: "Chittagong", value: "Chittagong"}, 
        {name: "Sylhet", value: "Sylhet"}, 
        {name: "Barishal", value:"Barishal"}],
      category: "select"
    },
];
const createAccountUrl = "/api/business/create/";
const getBusinessInfoUrl = "/api/business/get";

const BusinessForm = () => {

  const {id} = useParams();

  const [businessInfo, setBusinessInfo] = useState({
    organizationName: "",
    contactEmail: "",
  });
  const [address, setAdress] = useState({
    country: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  useEffect(()=>{
    axios.get(getBusinessInfoUrl).then((response)=>{
      if (response.data.success) {
        setBusinessInfo({organizationName: response.data.businessData.organizationName, contactEmail: response.data.businessData.contactEmail});
        setAdress(response.data.businessData.address);
      }
    }).catch(handleAxiosError)
  },[])

  const onChangeHandler = e => {
    if (e.target.name in businessInfo) {
      setBusinessInfo({ ...businessInfo, [e.target.name]: e.target.value });
    }
    if (e.target.name in address) {
      setAdress({ ...address, [e.target.name]: e.target.value });
    }
  };

  const onFormSubmit = e => {
      e.preventDefault();
      let hasError = !Object.values(businessInfo).every(value => value.trim().length !== 0) && !Object.values(address).every(value => value.trim().length !== 0);

      if (hasError) {
          toast.error("Please fill in all the fields");
          return;
      }

      businessInfo.address = address;
      axios.post(createAccountUrl+id,{...businessInfo})
      .then(response=>window.location.href = response.data.url)
      .catch(handleAxiosError)
  }

  return (
    <>
        <CommonHelmet title="Hexis - Business Form"/>
        <div className="business-container">
          <div className="form-container">

            <h2>Business Info</h2>
            <hr />
            {formInputs.slice(0, 3).map((input, index) => (
              <div key={input.id} className="row mb-3">
                <div className="col">
                  <FormInput onChange={onChangeHandler} value={index < 2 ? businessInfo[input.name] : address.country} {...input} />
                </div>
              </div>
            ))}
            <div className="row">
              {formInputs.slice(3, 7).map(input => (
                <div key={input.id} className="col-6">
                  <FormInput onChange={onChangeHandler} value={address[input.name]} {...input} />
                </div>
              ))}
            </div>
            <button type="submit" className={`btn btn-primary mt-2 w-100`} onClick={onFormSubmit}>Next</button>
            </div>
        </div>
    </>
  );
};

export default BusinessForm;
