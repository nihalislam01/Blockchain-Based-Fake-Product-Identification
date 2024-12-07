import "./Plan.scss";
import { useState } from "react";
import {Link} from "react-router-dom";
import CommonHelmet from "../../common/components/Head/CommonHelmet";

function Plan() {

    const [planSelected, setPlanSelected] = useState("1");

    const selectPlan = (planId) => {
        setPlanSelected(planId);
    }

    return (
        <>
            <CommonHelmet title="Hexis - Plan"/>
            <div class="plan-container">
                <div class={`plan-box ${planSelected === "0" ? "selectedPlan" : ""}`} onClick={()=>selectPlan("0")}>
                    <div class="select-indicator"></div>
                    <h2>Monthly Plan</h2>
                    <p>Perfect for short-term usage</p>
                    <div class="price">$19.99/month</div>
                    <div className="plan-info-container">
                        <ul>
                            <li>Access to blockchain verification</li>
                            <li>Register unlimited products</li>
                            <li>24/7 support</li>
                            <li>Analytics and insights</li>
                        </ul>
                    </div>
                    <Link to={`/business-form/0`}>
                        <button className="btn btn-primary mt-2" style={{borderRadius: "30px"}}>Select Plan</button>
                    </Link>
                </div>

                <div class={`plan-box ${planSelected === "1" ? "selectedPlan" : ""}`} onClick={()=>selectPlan("1")}>
                    <div class="select-indicator"></div>
                    <h2>Yearly Plan</h2>
                    <p>Best value for long-term users</p>
                    <div class="price">$199.99/year</div>
                    <div className="plan-info-container">
                        <ul>
                            <li>Access to blockchain verification</li>
                            <li>Register unlimited products</li>
                            <li>Priority 24/7 support</li>
                            <li>Analytics and insights</li>
                            <li>Exciting discount</li>
                        </ul>
                    </div>
                    <Link to={`/business-form/1`}>
                        <button className="btn btn-primary mt-2" style={{borderRadius: "30px"}}>Select Plan</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Plan;