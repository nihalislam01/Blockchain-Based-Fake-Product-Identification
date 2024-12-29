import "./Plan.scss";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import CommonHelmet from "../../../../common/components/Head/CommonHelmet";
import axios from "axios";
import handleAxiosError from "../../../../common/utils/ErrorHandler";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getPlanUrl = "/api/stripe/get";

function Plan() {

    const [planSelected, setPlanSelected] = useState("");
    const [payments, setPayments] = useState([]);

    useEffect(()=>{
        axios.get(getPlanUrl)
        .then(response=>{
            setPayments(response.data.payment);
            setPlanSelected(response.data.payment[0]._id);
        })
        .catch(handleAxiosError)
    },[])

    const selectPlan = (planId) => {
        setPlanSelected(planId);
    }

    return (
        <>
            <CommonHelmet title="Hexis - Plan"/>
            <div className="plan-container">
                {payments.map(payment=>(
                    <div className={`plan-box ${planSelected===payment._id? "selectedPlan" : ""}`} onClick={()=>selectPlan(payment._id)}>
                        <div className="select-indicator"></div>
                        <h2>{payment.name}</h2>
                        <p>{payment.quote}</p>
                        <div className="price">{payment.price}/{payment.session}</div>
                        <div className="plan-info-container">
                            {payment.description.map((desc, index)=>(
                                <div className="d-flex align-items-center gap-3"><FontAwesomeIcon icon={faCircle} size="xs" /><p className="m-0" key={index}>{desc}</p></div>
                            ))}
                        </div>
                        <Link to={`/business-form/${payment._id}`}>
                            <button className="btn btn-primary mt-2" style={{borderRadius: "30px"}}>Select Plan</button>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Plan;