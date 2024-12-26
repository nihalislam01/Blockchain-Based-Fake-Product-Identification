import FormInput from "../../common/components/FormInput/FormInput";
import axios from "axios";
import toast from "react-hot-toast";
import handleAxiosError from "../../common/utils/ErrorHandler";

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
        id: "numberInput",
        name: "contactPhone",
        type: "text",
        label: "Organization's Phone",
        category: "input"
    },
    {
        id: "websiteInput",
        name: "website",
        type: "text",
        label: "Website",
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

const updateUrl = "/api/business/update";

function UpdateForm({businessInfo, setBusinessInfo, address, setAdress, close}) {

    const onChangeHandler = e => {
        if (e.target.name in businessInfo || e.target.name === "contactPhone" || e.target.name === "website") {
          setBusinessInfo({ ...businessInfo, [e.target.name]: e.target.value });
        }
        if (e.target.name in address) {
          setAdress({ ...address, [e.target.name]: e.target.value });
        }
      };

      const onFormSubmit = e => {
        e.preventDefault();
  
        businessInfo.address = address;
        axios.patch(updateUrl,{...businessInfo})
        .then(response=>{
            setBusinessInfo(response.data.business);
            toast.success(response.data.message);
            close();
        })
        .catch(handleAxiosError);
    };

    return (
        <>
            <div className="d-flex flex-column w-50">
                {formInputs.slice(0, 5).map((input, index) => (
                    <FormInput onChange={onChangeHandler} value={index < 4 ? businessInfo[input.name] : address.country} {...input} />
                ))}
                <div className="row">
                    {formInputs.slice(5, 9).map(input => (
                        <div key={input.id} className="col-6">
                            <FormInput onChange={onChangeHandler} value={address[input.name]} {...input} />
                        </div>
                    ))}
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-primary w-100" onClick={onFormSubmit}>Save</button>
                    <button className="btn btn-secondary w-100" onClick={close}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default UpdateForm;