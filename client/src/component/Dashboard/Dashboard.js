import { faEnvelope, faGlobe, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import CommonHelmet from "../../common/components/Head/CommonHelmet";
import axios from "axios";
import handleAxiosError from "../../common/utils/ErrorHandler";
import LineChart from '../../common/components/Chart/LineChart';

const pageTitle = "Hexis - Dashboard";
const getBusinessUrl = "/api/business/get";
const getVerificationUrl = "/api/product/verification-data";
const getTotalUrl = "/api/product/total-products";

function Dashboard() {
    const [businessInfo, setBusinessInfo] = useState({});
    const [validationData, setValidationData] = useState(null);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsage, setTotalUsage] = useState(0);

    useEffect(()=>{
        axios.get(getBusinessUrl)
        .then((response)=>setBusinessInfo(response.data.businessData))
        .catch(handleAxiosError);

        axios.get(getTotalUrl).then(response=>{
            setTotalProducts(response.data.totalProducts);
            setTotalUsage(response.data.totalVerifications);
        })
        axios.get(getVerificationUrl).then(response=>{
            const data = response.data.result;
            const dates = data.map(item => item._id);
            const validData = data.map(item => item.validVerifications);
            const invalidData = data.map(item => item.invalidVerifications);
            setValidationData({labels: dates, datasets: [
                    {
                        label: 'Valid Verifications',
                        data: validData,
                        borderColor: '#293241',
                        backgroundColor: '#293241',
                        fill: true,
                    },
                    {
                        label: 'Invalid Verifications',
                        data: invalidData,
                        borderColor: '#c1121f',
                        backgroundColor: '#c1121f',
                        fill: true,
                    },
                ],
            });
        }).catch(handleAxiosError);
    },[])

    return (
        <>
            <CommonHelmet title={pageTitle} />
            <div className="container">
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <h2>{businessInfo.organizationName}</h2>
                        {businessInfo.contactPhone && <p className="m-0"><FontAwesomeIcon icon={faPhone} style={{marginRight: "5px"}} /> {businessInfo.contactPhone}</p>}
                        <p className="m-0"><FontAwesomeIcon icon={faEnvelope} style={{marginRight: "5px"}} />{businessInfo.contactEmail}</p>
                        {businessInfo.website && <p className="m-0"><FontAwesomeIcon icon={faGlobe} style={{marginRight: "5px"}} />{businessInfo.website}</p>}
                        <p className="m-0"><FontAwesomeIcon icon={faLocationDot} style={{marginRight: "5px"}} /> {businessInfo.address?.street}, {businessInfo.address?.city}, {businessInfo.address?.state} {businessInfo.address?.zipCode}, {businessInfo.address?.country}</p>
                    </div>
                    <div className='d-flex flex-column gap-2'>
                        <div style={{textAlign: "center", color: "#F5F5F5", backgroundColor: "#293241", padding: "2px 10px", borderRadius: "5px"}}>
                            <p className="m-0">Total Products {totalProducts}</p>
                        </div>
                        <div style={{textAlign: "center", color: "#F5F5F5", backgroundColor: "#293241", padding: "2px 10px", borderRadius: "5px"}}>
                            <p className="m-0">Total Usage {totalUsage}</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div style={{width: "100%", height: "65vh"}}>
                    <LineChart chartData={validationData} />
                </div>
            </div>
        </>
    )
}

export default Dashboard;