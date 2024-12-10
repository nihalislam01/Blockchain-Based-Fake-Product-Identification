import axios from "axios";
import "./BusinessForm.scss";
import CommonHelmet from "../../common/components/Head/CommonHelmet";
import FormInput from "../../common/components/FormInput/FormInput";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { toast } from "react-hot-toast";
import SelectInput from "../../common/components/SelectInput/SelectInput";
import handleAxiosError from "../../common/utils/ErrorHandler";

const formInputs = [
    {
      id: "nameInput",
      name: "organizationName",
      type: "text",
      label: "Organization's Name",
    },
    {
      id: "emailInput",
      name: "contactEmail",
      type: "email",
      label: "Organization's Email",
    },
    {
      id: "countryInput",
      name: "country",
      label: "Country",
      placeholder: "Select a country",
      options: ["Bangladesh", "United States", "Canada", "United Kingdom", "Australia"]
    },
    {
      id: "streetInput",
      name: "street",
      type: "text",
      label: "Street"
    },
    {
      id: "cityInput",
      name: "city",
      label: "City",
      placeholder: "Select a city",
      options: ["Badda", "Gulshan", "Banani", "Bashundhara", "Rampura"]
    },
    {
      id: "zipInput",
      name: "zipCode",
      type: "text",
      label: "Zip Code"
    },
    {
      id: "stateInput",
      name: "state",
      label: "State",
      placeholder: "Select a sate",
      options: ["Dhaka", "Rangpur", "Chittagong", "Sylhet", "Barishal"]
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

  const onInfoChangeHandler = e => {
      setBusinessInfo({...businessInfo, [e.target.name]: e.target.value});
  };

  const onAddressChangeHandler = e => {
    setAdress({...address, [e.target.name]: e.target.value});
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
            {formInputs.slice(0,2).map(e => (
                <FormInput key={e.id} onChange={onInfoChangeHandler} value={businessInfo[e.name]} {...e}/>
            ))}
            <SelectInput onChange={onAddressChangeHandler} value={address.country} {...formInputs[2]} />
            <div className="row">
              <div className="col">
                <FormInput onChange={onAddressChangeHandler} value={address.street} {...formInputs[3]} />
              </div>
              <div className="col">
                <SelectInput onChange={onAddressChangeHandler} value={address.city} {...formInputs[4]} />
              </div>
              <div className="w-100"></div>
              <div className="col">
                <FormInput onChange={onAddressChangeHandler} value={address.zipCode} {...formInputs[5]} />
              </div>
              <div className="col">
                <SelectInput onChange={onAddressChangeHandler} value={address.state} {...formInputs[6]} />
              </div>
            </div>

            <button type="submit" className={`btn btn-primary mt-2 w-100`} onClick={onFormSubmit}>Next</button>
            </div>
        </div>
    </>
  );
};

export default BusinessForm;
