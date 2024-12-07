import axios from "axios";
import "./BusinessForm.scss";
import CommonHelmet from "../../common/components/Head/CommonHelmet";
import FormInput from "../../common/components/FormInput/FormInput";
import { useState } from "react";
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

const BusinessForm = () => {

  const {id} = useParams();

  const [formValues, setFormValues] = useState({
    organizationName: "",
    country: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    contactEmail: "",
  });

  const onChangeHandler = e => {
      setFormValues({...formValues, [e.target.name]: e.target.value});
  };

  const onFormSubmit = e => {
      e.preventDefault();
      let hasError = !Object.values(formValues).every(value => value.trim().length !== 0);

      if (hasError) {
          toast.error("Please fill in all the fields");
          return;
      }

      axios.post(createAccountUrl+id,{...formValues})
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
                <FormInput key={e.id} onChange={onChangeHandler} {...e}/>
            ))}
            <SelectInput onChange={onChangeHandler} {...formInputs[2]} />
            <div className="row">
              <div className="col">
                <FormInput onChange={onChangeHandler} {...formInputs[3]} />
              </div>
              <div className="col">
                <SelectInput onChange={onChangeHandler} {...formInputs[4]} />
              </div>
              <div className="w-100"></div>
              <div className="col">
                <FormInput onChange={onChangeHandler} {...formInputs[5]} />
              </div>
              <div className="col">
                <SelectInput onChange={onChangeHandler} {...formInputs[6]} />
              </div>
            </div>

            <button type="submit" className={`btn btn-primary mt-2 w-100`} onClick={onFormSubmit}>Next</button>
            </div>
        </div>
    </>
  );
};

export default BusinessForm;
