import axios from "axios";
import "./CancelPlan.scss";
import CommonHelmet from "../../../../common/components/Head/CommonHelmet";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import handleAxiosError from "../../../../common/utils/ErrorHandler";

const cancelMembershipUrl = "/api/business/cancel";
const getBusinessDataUrl = "/api/business/get";

const CancelPlan = () => {

    const [password, setPassword] = useState("");
    const [businessData, setBusinessData] = useState({});
    const [address, setAddress] = useState({});

    useEffect(()=>{
      axios.get(getBusinessDataUrl)
      .then(response => {
        setBusinessData(response.data.businessData);
        setAddress(response.data.businessData.address);
      })
      .catch(handleAxiosError)
    },[])

  const onChangeHandler = e => {
      setPassword(e.target.value);
  };

  const onFormSubmit = e => {

      e.preventDefault();
      let hasError = password.trim().length === 0;

      if (hasError) {
          toast.error("Please fill in the field");
          return;
      }

      axios.post(cancelMembershipUrl,{password})
      .then(response=>{
        toast.success(response.data.message);
        window.location.href = '/home';
      })
      .catch(handleAxiosError)
  }

  return (
    <>
        <CommonHelmet title="Hexis - Cancel Membership"/>
        <div className="cancel-plan-container">
          <div className="cancel-form-container">

            <h2>Business Info</h2>
            <hr />
            <h4>{businessData.organizationName}</h4>
            <h6>{businessData.contactEmail}</h6>
            <p>{address.street}, {address.city}, {address.state}, {address.zipCode}, {address.country}</p>
            <hr />
            <p>After cancelling membership you will not have acccess to you business account. However, your previous business data will be restored again after purchasing a subscription plan.</p>
            <hr />
            <input className="form-control" onChange={onChangeHandler} value={password} type="password" placeholder="Please enter your password" name="password" id="passwordInput" />
            <button type="submit" className={`btn btn-primary mt-2 w-100`} onClick={onFormSubmit}>Cancel Membership</button>
          </div>
        </div>
    </>
  );
};

export default CancelPlan;